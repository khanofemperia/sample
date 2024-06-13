"use server";

import { doc, updateDoc } from "firebase/firestore";
import { database } from "@/libraries/firebase";
import { revalidatePath } from "next/cache";

type CategoryType = {
  id: string;
  visibility: string;
};

type DataType = {
  categorySectionVisibility: string;
  categories: CategoryType[];
};

export default async function UpdateCategoriesAction(data: DataType) {
  try {
    const updatePromises = data.categories.map(async ({ id, visibility }) => {
      const documentRef = doc(database, "categories", id);
      await updateDoc(documentRef, { visibility });
    });

    const settingsPromise = updateDoc(
      doc(database, "settings", "defaultSettings"),
      {
        "categorySection.visibility": data.categorySectionVisibility,
      }
    );

    await Promise.all([...updatePromises, settingsPromise]);

    revalidatePath("/admin/shop");

    return "Categories updated";
  } catch (error) {
    console.error("Error updating categories and settings:", error);
    return "Error updating categories and settings";
  }
}