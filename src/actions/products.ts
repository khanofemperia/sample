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
  status?: string;
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
      last_updated: currentTimestamp(),
      date_created: currentTimestamp(),
    };

    await setDoc(documentRef, product);
    revalidatePath("/admin/products");

    return "Product created";
  } catch (error) {
    console.error("Error creating product:", error);
    return "Failed to create product";
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
      last_updated: currentTimestamp(),
    };

    console.log(data);

    await setDoc(docRef, updatedProduct);
    revalidatePath("/admin/products/[id]", "page");

    return "Product updated";
  } catch (error) {
    console.error("Error updating product:", error);
    return "Failed to update product";
  }
}
