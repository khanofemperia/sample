"use server";

import { database } from "@/libraries/firebase";
import { setDoc, doc } from "firebase/firestore";
import { generateId } from "@/libraries/utils";
import { currentTimestamp } from "@/libraries/utils";
import { revalidatePath } from "next/cache";

type CreateProductType = {
  category: string;
  name: string;
  slug: string;
  price: string;
  poster: string;
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
