"use server";

import { doc, updateDoc } from "firebase/firestore";
import { database } from "@/libraries/firebase";
import { revalidatePath } from "next/cache";

type PageHeroType = {
  image: string | null;
  title: string | null;
  destination_url: string | null;
  visibility: string;
};

export async function UpdatePageHeroAction(data: PageHeroType) {
  try {
    const { ...updatedPageHeroData } = data;

    const documentRef = doc(database, "page_hero", "storefront_hero");
    await updateDoc(documentRef, updatedPageHeroData);

    revalidatePath("/admin/shop");

    return "Page hero updated";
  } catch (error) {
    console.error("Error updating page hero:", error);
    return "Error updating page hero";
  }
}
