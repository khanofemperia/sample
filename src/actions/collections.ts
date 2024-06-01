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

type CreateCollectionType = {
  title: string;
  slug: string;
  collection_type: string;
  campaign_duration: {
    start_date: string;
    end_date: string;
  };
};

export async function CreateCollectionAction(data: CreateCollectionType) {
  try {
    const documentRef = doc(database, "collections", generateId());

    const newCollection = {
      title: data.title,
      slug: data.slug,
      collection_type: data.collection_type,
      campaign_duration: data.campaign_duration,
      index: 1,
      products: null,
      visibility: "DRAFT",
      last_updated: currentTimestamp(),
      date_created: currentTimestamp(),
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
      updateDoc(collectionOneRef, { index, last_updated: currentTimestamp() }),
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
