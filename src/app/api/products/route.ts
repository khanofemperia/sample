import { NextResponse, NextRequest } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "@/libraries/firebase";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fieldsQueryParam = searchParams.get("fields");
  const visibilityQueryParam = searchParams.get("visibility")?.toUpperCase();

  const validVisibilityFlags = ["DRAFT", "PUBLISHED", "HIDDEN"];
  const collectionRef = collection(database, "products");

  let firestoreQuery = query(collectionRef);

  if (
    visibilityQueryParam &&
    validVisibilityFlags.includes(visibilityQueryParam)
  ) {
    firestoreQuery = query(
      collectionRef,
      where("visibility", "==", visibilityQueryParam)
    );
  }

  const snapshot = await getDocs(collectionRef);

  if (!fieldsQueryParam) {
    const products: ProductType[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ProductType, "id">),
    }));

    const sortedProducts = sortProducts(products);
    return NextResponse.json(sortedProducts);
  }

  const fields = fieldsQueryParam ? fieldsQueryParam.split(",") : [];
  const products = snapshot.docs.map((doc) => {
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
      visibility: data["visibility"],
    };
  });

  return NextResponse.json(
    sortProducts(products).map(({ updatedAt, ...rest }) => rest)
  );
}

function sortProducts<T extends { updatedAt: string }>(products: T[]): T[] {
  return products.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}
