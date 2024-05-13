import { NextResponse, NextRequest } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { database } from "@/libraries/firebase";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const documentRef = doc(database, "products", params.id);
  const snapshot = await getDoc(documentRef);

  if (!snapshot.exists()) {
    return NextResponse.json({
      message: "Product not found",
      product: null,
    });
  }

  const data = snapshot.data();
  const query = request.nextUrl.searchParams.get("fields");

  let selectedFields: Partial<ProductType> = {};
  if (query) {
    const fields = query.split(",");
    fields.forEach((field) => {
      if (data.hasOwnProperty(field)) {
        selectedFields[field as keyof ProductType] = data[field];
      }
    });
  } else {
    selectedFields = data as Omit<ProductType, "id">;
  }

  const product = {
    id: snapshot.id,
    ...selectedFields,
  };

  return NextResponse.json({
    message: "Get product",
    product: product,
  });
}
