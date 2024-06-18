"use server";

import { database } from "@/libraries/firebase";
import {
  setDoc,
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { generateId, currentTimestamp } from "@/libraries/utils";
import { revalidatePath } from "next/cache";

type CreateProductType = {
  category: string;
  name: string;
  slug: string;
  price: string;
  mainImage: string;
};

type ColorType = {
  name: string;
  image: string;
};

type EditProduct = {
  id: string;
  name?: string;
  price?: string;
  slug?: string;
  description?: string;
  mainImage?: string | null;
  images?: string[] | null;
  sizes?: SizeChartType | null;
  colors?: ColorType[] | null;
  visibility?: string;
};

export async function CreateProductAction(data: CreateProductType) {
  try {
    const documentRef = doc(database, "products", generateId());
    const currentTime = currentTimestamp();

    const product = {
      category: data.category,
      name: data.name,
      slug: data.slug,
      price: data.price,
      mainImage: data.mainImage,
      visibility: "DRAFT",
      description: null,
      images: null,
      colors: null,
      sizes: null,
      updatedAt: currentTime,
      createdAt: currentTime,
      index: 1,
    };

    const existingProducts = await getDocs(collection(database, "products"));

    type ProductData = {
      id: string;
      index: number;
    };

    const sortedProducts: ProductData[] = existingProducts.docs
      .map((doc) => ({ id: doc.id, ...(doc.data() as { index: number }) }))
      .sort((a, b) => a.index - b.index);

    const updatePromises = sortedProducts.map((product, index) => {
      const productRef = doc(database, "products", product.id);
      return updateDoc(productRef, { index: index + 2 });
    });

    await setDoc(documentRef, product);

    await Promise.all(updatePromises);

    revalidatePath("/admin/shop/products");

    return "Product created";
  } catch (error) {
    console.error("Error creating product:", error);
    return "Error creating product";
  }
}

export async function UpdateProductAction(data: EditProduct) {
  try {
    const docRef = doc(database, "products", data.id);
    const docSnap = await getDoc(docRef);
    const currentProduct = docSnap.data();

    const updatedProduct = {
      ...currentProduct,
      ...data,
      updatedAt: currentTimestamp(),
    };

    await setDoc(docRef, updatedProduct);
    revalidatePath("/admin/shop/products/[slug]", "page");

    return "Product updated";
  } catch (error) {
    console.error("Error updating product:", error);
    return "Error updating product";
  }
}
