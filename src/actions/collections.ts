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

export async function CreateCollectionAction(data: {
  title: string;
  slug: string;
  image: string;
  collectionType: string;
  campaignDuration: {
    startDate: string;
    endDate: string;
  };
}) {
  try {
    const documentRef = doc(database, "collections", generateId());

    const newCollection = {
      title: data.title,
      slug: data.slug,
      image: data.image,
      collectionType: data.collectionType,
      campaignDuration: data.campaignDuration,
      index: 1,
      products: [],
      visibility: "DRAFT",
      updatedAt: currentTimestamp(),
      createdAt: currentTimestamp(),
    };

    const existingCollections = await getDocs(
      collection(database, "collections")
    );

    for (const collectionDoc of existingCollections.docs) {
      const collectionRef = doc(database, "collections", collectionDoc.id);
      await updateDoc(collectionRef, { index: collectionDoc.data().index + 1 });
    }

    await setDoc(documentRef, newCollection);
    revalidatePath("/admin/shop");

    return "Collection created";
  } catch (error) {
    console.error("Error creating collection:", error);
    return "Failed to create collection";
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
      return !collectionOneSnapshot.exists()
        ? "Collection not found"
        : "Index is invalid or out of range";
    }

    const collectionTwoId = existingCollections.docs.find(
      (collection) => collection.data().index === index
    )?.id;

    if (!collectionTwoId) {
      return "No collection to switch indexes with";
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

    return "Collection index changed";
  } catch (error) {
    console.error("Error changing collection index:", error);
    return "Error, reload and try again";
  }
}

export async function UpdateCollectionAction(data: {
  id: string;
  campaignDuration?: { startDate: string; endDate: string };
  image?: string;
  title?: string;
  slug?: string;
  visibility?: string;
}) {
  try {
    const collectionRef = doc(database, "collections", data.id);
    const collectionSnapshot = await getDoc(collectionRef);

    if (!collectionSnapshot.exists()) {
      return "Collection not found";
    }

    const updateData: Record<string, any> = {};

    if (data.campaignDuration) {
      updateData.campaignDuration = data.campaignDuration;
    }

    if (data.image) {
      updateData.image = data.image;
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

    return "Collection updated";
  } catch (error) {
    console.error("Error updating collection:", error);
    return "Failed to update collection";
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
      return "Product not found";
    }

    const collectionRef = doc(database, "collections", collectionId);
    const collectionSnapshot = await getDoc(collectionRef);

    if (!collectionSnapshot.exists()) {
      return "Collection not found";
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
      return "Product already in the collection";
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

    return "Product added to collection";
  } catch (error) {
    console.error("Error adding product to collection:", error);
    return "Failed to add product to collection";
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
      return "Product not found";
    }

    const collectionRef = doc(database, "collections", collectionId);
    const collectionSnapshot = await getDoc(collectionRef);

    if (!collectionSnapshot.exists()) {
      return "Collection not found";
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

    return "Product removed from collection";
  } catch (error) {
    console.error("Error removing product from collection:", error);
    return "Failed to remove product from collection";
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
      return "Product not found";
    }

    const collectionRef = doc(database, "collections", collectionId);
    const collectionSnapshot = await getDoc(collectionRef);

    if (!collectionSnapshot.exists()) {
      return "Collection not found";
    }

    const collectionData = collectionSnapshot.data() as DataType;

    if (
      isNaN(productOneChanges.index) ||
      productOneChanges.index < 1 ||
      productOneChanges.index > collectionData.products.length
    ) {
      return "Index is invalid or out of range";
    }

    const productOne = collectionData.products.find(
      (item) => item.id === productOneChanges.id
    );

    const productOneIndexBeforeSwap = productOne?.index;

    const productTwo = collectionData.products.find(
      (item) => item.index === productOneChanges.index
    );

    if (!productTwo) {
      return "There's no product to switch indexes with";
    }

    if (productOne !== undefined && productOneIndexBeforeSwap !== undefined) {
      productOne.index = productOneChanges.index;
      productTwo.index = productOneIndexBeforeSwap;

      await updateDoc(collectionRef, {
        products: collectionData.products,
        updatedAt: currentTimestamp(),
      });

      revalidatePath("/admin/shop/collections/[slug]", "page");

      return "Product index changed";
    } else {
      return "Failed to change product index";
    }
  } catch (error) {
    console.error("Error changing product index:", error);
    return "Error changing product index";
  }
}
