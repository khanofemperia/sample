import { NextResponse, NextRequest } from "next/server";
import { collection, getDocs, } from "firebase/firestore";
import { database } from "@/libraries/firebase";

export async function GET(_request: NextRequest) {
  const snapshot = await getDocs(collection(database, "categories"));

  const categories: CategoryType[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<CategoryType, "id">),
  }));

  categories.sort((a, b) => a.index - b.index);

  return NextResponse.json(categories, { status: 200 });
}
