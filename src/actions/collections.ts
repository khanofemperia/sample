"use server";

import { database } from "@/libraries/firebase";
import {
  setDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { generateId } from "@/libraries/utils";
import { currentTimestamp } from "@/libraries/utils";
import { revalidatePath } from "next/cache";
import { AlertMessageType } from "@/libraries/sharedTypes";

type DataType = {
  image: string;
  title: string;
  slug: string;
  campaignDuration: {
    startDate: string;
    endDate: string;
  };
  visibility: string;
  collectionType: string;
  index: number;
  updatedAt: string;
  createdAt: string;
  products: { id: string; index: number }[];
};

type BannerImagesType = {
  desktopImage: string;
  mobileImage: string;
};

export async function CreateCollectionAction(data: {
  title: string;
  slug: string;
  bannerImages?: BannerImagesType;
  collectionType: string;
  campaignDuration: {
    startDate: string;
    endDate: string;
  };
}) {
  try {
    const documentRef = doc(database, "collections", generateId());
    const currentTime = currentTimestamp();

    const newCollection = {
      title: data.title,
      slug: data.slug,
      collectionType: data.collectionType,
      campaignDuration: data.campaignDuration,
      index: 1,
      products: [],
      visibility: "DRAFT",
      updatedAt: currentTime,
      createdAt: currentTime,
      ...(data.bannerImages && { bannerImages: data.bannerImages }),
    };

    const existingCollections = await getDocs(
      collection(database, "collections")
    );

    type CollectionData = {
      id: string;
      index: number;
    };

    const sortedCollections: CollectionData[] = existingCollections.docs
      .map((doc) => ({ id: doc.id, ...(doc.data() as { index: number }) }))
      .sort((a, b) => a.index - b.index);

    const updatePromises = sortedCollections.map((collection, index) => {
      const collectionRef = doc(database, "collections", collection.id);
      return updateDoc(collectionRef, { index: index + 2 });
    });

    await setDoc(documentRef, newCollection);

    await Promise.all(updatePromises);

    revalidatePath("/admin/shop");

    return {
      type: AlertMessageType.SUCCESS,
      message: "Collection created successfully",
    };
  } catch (error) {
    console.error("Error creating collection:", error);
    return {
      type: AlertMessageType.ERROR,
      message: "Failed to create collection",
    };
  }
}

export async function ChangeCollectionIndexAction(data: {
  id: string;
  index: number;
}) {
  try {
    const { id, index } = data;

    const collectionOneRef = doc(database, "collections", id);
    const collectionOneSnapshot = await getDoc(collectionOneRef);
    const existingCollections = await getDocs(
      collection(database, "collections")
    );

    if (
      !collectionOneSnapshot.exists() ||
      isNaN(index) ||
      index < 1 ||
      index > existingCollections.size
    ) {
      return {
        type: AlertMessageType.ERROR,
        message: !collectionOneSnapshot.exists()
          ? "Collection not found"
          : "Index is invalid or out of range",
      };
    }

    const collectionTwoId = existingCollections.docs.find(
      (collection) => collection.data().index === index
    )?.id;

    if (!collectionTwoId) {
      return {
        type: AlertMessageType.ERROR,
        message: "No collection found to swap index with",
      };
    }

    const collectionOneBeforeUpdate = collectionOneSnapshot.data();
    const collectionTwoRef = doc(database, "collections", collectionTwoId);

    await Promise.all([
      updateDoc(collectionOneRef, { index, updatedAt: currentTimestamp() }),
      updateDoc(collectionTwoRef, {
        index: collectionOneBeforeUpdate.index,
      }),
    ]);

    revalidatePath("/admin/shop");

    return {
      type: AlertMessageType.SUCCESS,
      message: "Collection index updated successfully",
    };
  } catch (error) {
    console.error("Error changing collection index:", error);
    return {
      type: AlertMessageType.ERROR,
      message: "Failed to update collection index",
    };
  }
}

export async function UpdateCollectionAction(data: {
  id: string;
  campaignDuration?: { startDate: string; endDate: string };
  bannerImages?: BannerImagesType;
  title?: string;
  slug?: string;
  visibility?: string;
}) {
  try {
    const collectionRef = doc(database, "collections", data.id);
    const collectionSnapshot = await getDoc(collectionRef);

    if (!collectionSnapshot.exists()) {
      return {
        type: AlertMessageType.ERROR,
        message: "Collection not found",
      };
    }

    const updateData: Record<string, any> = {};

    if (data.campaignDuration) {
      updateData.campaignDuration = data.campaignDuration;
    }

    if (data.bannerImages) {
      updateData.bannerImages = data.bannerImages;
    }

    if (data.title) {
      updateData.title = data.title;
    }

    if (data.slug) {
      updateData.slug = data.slug;
    }

    if (data.visibility) {
      updateData.visibility = data.visibility;
    }

    await updateDoc(collectionRef, {
      ...updateData,
      updatedAt: currentTimestamp(),
    });
    revalidatePath("/admin/shop/collections/[slug]", "page");

    return {
      type: AlertMessageType.SUCCESS,
      message: "Collection updated successfully",
    };
  } catch (error) {
    console.error("Error updating collection:", error);
    return {
      type: AlertMessageType.ERROR,
      message: "Failed to update collection",
    };
  }
}

export async function AddProductAction(data: {
  collectionId: string;
  productId: string;
}) {
  try {
    const { collectionId, productId } = data;
    const productRef = doc(database, "products", productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      return { type: AlertMessageType.ERROR, message: "Product not found" };
    }

    const collectionRef = doc(database, "collections", collectionId);
    const collectionSnapshot = await getDoc(collectionRef);

    if (!collectionSnapshot.exists()) {
      return {
        type: AlertMessageType.ERROR,
        message: "Collection not found",
      };
    }

    const newProduct = {
      index: 1,
      id: productId,
    };

    const collectionData = collectionSnapshot.data();

    const collectionProducts = Array.isArray(collectionData.products)
      ? collectionData.products
      : [];

    const productAlreadyExists = collectionProducts.some(
      (product) => product.id === productId
    );

    if (productAlreadyExists) {
      return {
        type: AlertMessageType.ERROR,
        message: "Product already in the collection",
      };
    }

    collectionProducts.sort((a, b) => a.index - b.index);

    // Update the index for existing products
    const updatedProducts = collectionProducts.map((product, index) => {
      product.index = index + 2;
      return { ...product };
    });

    // Add the new product at the beginning of the array
    updatedProducts.unshift(newProduct);

    await updateDoc(collectionRef, {
      products: updatedProducts,
      updatedAt: currentTimestamp(),
    });

    revalidatePath("/admin/shop/collections/[slug]", "page");

    return {
      type: AlertMessageType.SUCCESS,
      message: "Product added to collection successfully",
    };
  } catch (error) {
    console.error("Error adding product to collection:", error);
    return {
      type: AlertMessageType.ERROR,
      message: "Failed to add product to collection",
    };
  }
}

export async function RemoveProductAction(data: {
  collectionId: string;
  productId: string;
}) {
  try {
    const { collectionId, productId } = data;
    const productRef = doc(database, "products", productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      return { type: AlertMessageType.ERROR, message: "Product not found" };
    }

    const collectionRef = doc(database, "collections", collectionId);
    const collectionSnapshot = await getDoc(collectionRef);

    if (!collectionSnapshot.exists()) {
      return {
        type: AlertMessageType.ERROR,
        message: "Collection not found",
      };
    }

    const collectionData = collectionSnapshot.data() as DataType;

    const updatedProducts = collectionData.products.filter(
      (product) => product.id !== productId
    );

    updatedProducts.forEach((product, index) => {
      product.index = index + 1;
    });

    await updateDoc(collectionRef, {
      products: updatedProducts,
      updatedAt: currentTimestamp(),
    });

    revalidatePath("/admin/shop/collections/[slug]", "page");

    return {
      type: AlertMessageType.SUCCESS,
      message: "Product removed from collection successfully",
    };
  } catch (error) {
    console.error("Error removing product from collection:", error);
    return {
      type: AlertMessageType.ERROR,
      message: "Failed to remove product from collection",
    };
  }
}

export async function ChangeProductIndexAction(data: {
  collectionId: string;
  product: {
    id: string;
    index: number;
  };
}) {
  try {
    const { collectionId, product: productOneChanges } = data;
    const productOneChangesRef = doc(
      database,
      "products",
      productOneChanges.id
    );
    const productOneChangesSnapshot = await getDoc(productOneChangesRef);

    if (!productOneChangesSnapshot.exists()) {
      return { type: AlertMessageType.ERROR, message: "Product not found" };
    }

    const collectionRef = doc(database, "collections", collectionId);
    const collectionSnapshot = await getDoc(collectionRef);

    if (!collectionSnapshot.exists()) {
      return {
        type: AlertMessageType.ERROR,
        message: "Collection not found",
      };
    }

    const collectionData = collectionSnapshot.data() as DataType;

    if (
      isNaN(productOneChanges.index) ||
      productOneChanges.index < 1 ||
      productOneChanges.index > collectionData.products.length
    ) {
      return {
        type: AlertMessageType.ERROR,
        message: "Index is invalid or out of range",
      };
    }

    const productOne = collectionData.products.find(
      (item) => item.id === productOneChanges.id
    );

    const productOneIndexBeforeSwap = productOne?.index;

    const productTwo = collectionData.products.find(
      (item) => item.index === productOneChanges.index
    );

    if (!productTwo) {
      return {
        type: AlertMessageType.ERROR,
        message: "No product found to swap index with",
      };
    }

    if (productOne !== undefined && productOneIndexBeforeSwap !== undefined) {
      productOne.index = productOneChanges.index;
      productTwo.index = productOneIndexBeforeSwap;

      await updateDoc(collectionRef, {
        products: collectionData.products,
        updatedAt: currentTimestamp(),
      });

      revalidatePath("/admin/shop/collections/[slug]", "page");

      return {
        type: AlertMessageType.SUCCESS,
        message: "Product index updated successfully",
      };
    } else {
      return {
        type: AlertMessageType.ERROR,
        message: "Failed to update product index",
      };
    }
  } catch (error) {
    console.error("Error updating product index:", error);
    return {
      type: AlertMessageType.ERROR,
      message: "Failed to update product index",
    };
  }
}
