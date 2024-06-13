import { NextResponse, NextRequest } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { database } from "@/libraries/firebase";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const documentRef = doc(database, "upsells", params.id);
  const snapshot = await getDoc(documentRef);

  if (!snapshot.exists()) {
    return NextResponse.json(null);
  }

  const data = snapshot.data();

  const upsell = {
    id: snapshot.id,
    ...data,
  };

  return NextResponse.json(upsell);
}
