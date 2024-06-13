import { NextResponse, NextRequest } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/libraries/firebase";

export async function GET(_request: NextRequest) {
  const collectionRef = collection(database, "upsells");
  const snapshot = await getDocs(collectionRef);

  const upsells: UpsellType[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<UpsellType, "id">),
  }));

  const sorted = sortData(upsells);
  return NextResponse.json(sorted);
}

function sortData<T extends { updatedAt: string }>(data: T[]): T[] {
  return data.sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}
