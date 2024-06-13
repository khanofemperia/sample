"use server";

import { database } from "@/libraries/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { generateId, currentTimestamp } from "@/libraries/utils";
import { revalidatePath } from "next/cache";

type CreateUpsellType = {
  price: string;
  salePrice: string;
  poster: string;
};

type EditUpsell = {
  id: string;
  price?: string;
  salePrice?: string;
  poster?: string;
  visibility?: string;
};

export async function CreateUpsellAction(data: CreateUpsellType) {
  try {
    const documentRef = doc(database, "upsells", generateId());

    const upsell = {
      price: data.price,
      salePrice: data.salePrice,
      poster: data.poster,
      visibility: "DRAFT",
      lastUpdated: currentTimestamp(),
      dateCreated: currentTimestamp(),
    };
p
    await setDoc(documentRef, upsell);
    revalidatePath("/admin/shop/upsells");

    return "Upsell created";
  } catch (error) {
    console.error("Error creating upsell:", error);
    return "Error creating upsell";
  }
}

export async function UpdateUpsellAction(data: EditUpsell) {
  try {
    const docRef = doc(database, "upsells", data.id);
    const docSnap = await getDoc(docRef);
    const currentUpsell = docSnap.data();

    const updatedUpsell = {
      ...currentUpsell,
      ...data,
      lastUpdated: currentTimestamp(),
    };

    await setDoc(docRef, updatedUpsell);
    revalidatePath("/admin/shop/upsells/[id]", "page");

    return "Upsell updated";
  } catch (error) {
    console.error("Error updating upsell:", error);
    return "Error updating upsell";
  }
}
