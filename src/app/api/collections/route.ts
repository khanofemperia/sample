import { NextResponse, NextRequest } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/libraries/firebase";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("fields");

  const firestoreCollectionRef = collection(database, "collections");
  const snapshot = await getDocs(firestoreCollectionRef);

  if (!query) {
    const collections: CollectionType[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<CollectionType, "id">),
    }));

    const sortedCollections = sortCollections(collections);
    return NextResponse.json(sortedCollections);
  }

  const fields = query.split(",");
  const collections = snapshot.docs.map((doc) => {
    const data = doc.data();
    const selectedFields: Partial<ProductType> = {};

    fields.forEach((field) => {
      if (data.hasOwnProperty(field)) {
        selectedFields[field as keyof ProductType] = data[field];
      }
    });

    return {
      id: doc.id,
      ...selectedFields,
      updatedAt: data["updatedAt"],
      index: data["index"],
    };
  });

  return NextResponse.json(
    sortCollections(collections)
  );
}

function sortCollections<T extends { index: number }>(collections: T[]): T[] {
  return collections.sort((a, b) => a.index - b.index);
}
