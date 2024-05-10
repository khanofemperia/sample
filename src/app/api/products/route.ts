import { NextResponse, NextRequest } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/libraries/firebase";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("fields");

  const collectionRef = collection(database, "products");
  const snapshot = await getDocs(collectionRef);

  if (!query) {
    const products: ProductType[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ProductType, "id">),
    }));

    const sortedProducts = sortProducts(products);
    return NextResponse.json(sortedProducts);
  }

  const fields = query.split(",");
  const products = snapshot.docs.map((doc) => {
    const productData = doc.data();
    const selectedFields: Partial<ProductType> = {};

    fields.forEach((field) => {
      if (productData.hasOwnProperty(field)) {
        selectedFields[field as keyof ProductType] = productData[field];
      }
    });

    return {
      id: doc.id,
      ...selectedFields,
      last_updated: productData["last_updated"],
    };
  });

  return NextResponse.json(
    sortProducts(products).map(({ last_updated, ...rest }) => rest)
  );
}

function sortProducts<T extends { last_updated: string }>(products: T[]): T[] {
  return products.sort(
    (a, b) =>
      new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
  );
}
