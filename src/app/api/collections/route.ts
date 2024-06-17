import { NextResponse, NextRequest } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "@/libraries/firebase";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fieldsQueryParam = searchParams.get("fields");
  const visibilityQueryParam = searchParams.get("visibility")?.toUpperCase();

  const validVisibilityFlags = ["DRAFT", "PUBLISHED", "HIDDEN"];
  const firestoreCollectionRef = collection(database, "collections");

  let firestoreQuery = query(firestoreCollectionRef);

  if (
    visibilityQueryParam &&
    validVisibilityFlags.includes(visibilityQueryParam)
  ) {
    firestoreQuery = query(
      firestoreCollectionRef,
      where("visibility", "==", visibilityQueryParam)
    );
  }

  const snapshot = await getDocs(firestoreQuery);

  if (!fieldsQueryParam) {
    const collections: CollectionType[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<CollectionType, "id">),
    }));

    const sortedCollections = sortCollections(collections);
    return NextResponse.json(sortedCollections);
  }

  const fields = fieldsQueryParam ? fieldsQueryParam.split(",") : [];
  const collections = snapshot.docs.map((doc) => {
    const data = doc.data();
    const selectedFields: Partial<CollectionType> = {};

    fields.forEach((field) => {
      if (data.hasOwnProperty(field)) {
        selectedFields[field as keyof CollectionType] = data[field];
      }
    });

    return {
      id: doc.id,
      ...selectedFields,
      updatedAt: data["updatedAt"],
      index: data["index"],
      visibility: data["visibility"],
    };
  });

  return NextResponse.json(sortCollections(collections));
}

function sortCollections<T extends { index: number }>(collections: T[]): T[] {
  return collections.sort((a, b) => a.index - b.index);
}
