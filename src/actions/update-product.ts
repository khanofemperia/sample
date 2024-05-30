"use server";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "@/libraries/firebase";
import { currentTimestamp, statusCodes } from "@/libraries/utils";
import { revalidatePath } from "next/cache";

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


export default async function UpdateProductAction(data: EditProduct) {
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
