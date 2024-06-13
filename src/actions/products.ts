"use server";

import { database } from "@/libraries/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { generateId, currentTimestamp } from "@/libraries/utils";
import { revalidatePath } from "next/cache";

type CreateProductType = {
  category: string;
  name: string;
  slug: string;
  price: string;
  poster: string;
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
  poster?: string | null;
  images?: string[] | null;
  sizes?: SizeChartType | null;
  colors?: ColorType[] | null;
  visibility?: string;
};

export async function CreateProductAction(data: CreateProductType) {
  try {
    const documentRef = doc(database, "products", generateId());

    const product = {
      category: data.category,
      name: data.name,
      slug: data.slug,
      price: data.price,
      poster: data.poster,
      visibility: "DRAFT",
      description: null,
      images: null,
      colors: null,
      sizes: null,
      updatedAt: currentTimestamp(),
      createdAt: currentTimestamp(),
    };

    await setDoc(documentRef, product);
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
