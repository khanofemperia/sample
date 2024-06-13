import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "@/libraries/firebase";

type CollectionProductType = {
  id: string;
  name: string;
  price: string;
  poster: string;
  slug: string;
  visibility: string;
};

type UpdatedProductType = {
  id: string;
  name: string;
  index: number;
  price: string;
  poster: string;
  slug: string;
  visibility: string;
};

type CollectionDataType = {
  image: string;
  title: string;
  slug: string;
  campaignDuration: {
    startDate: string;
    endDate: string;
  };
  visibility: string;
  status: string;
  collectionType: string;
  index: number;
  updatedAt: string;
  createdAt: string;
  products: { id: string; index: number }[] | null;
};

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const docRef = doc(database, "collections", params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return NextResponse.json([]);
  }

  const collection = docSnap.data() as CollectionDataType;

  if (!collection.products) {
    collection.products = [];
  }

  const promises = await Promise.all(
    collection.products.map(async (product) => {
      const productDocRef = doc(database, "products", product.id);
      const productDocSnap = await getDoc(productDocRef);

      if (productDocSnap.exists()) {
        const productData = productDocSnap.data() as CollectionProductType;
        return {
          id: productDocSnap.id,
          index: product.index,
          poster: productData.poster,
          name: productData.name,
          price: productData.price,
          slug: productData.slug,
          visibility: productData.visibility,
        };
      }

      return null;
    })
  );

  const filteredProducts = promises.filter((product) => product !== null) as UpdatedProductType[];
  filteredProducts.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

  const updatedProducts = filteredProducts.map((product, index) => ({
    ...product,
    index: index + 1,
  }));

  const processedProducts = updatedProducts.map((product) => ({
    id: product.id,
    index: product.index,
  }));

  await updateDoc(docRef, { products: processedProducts });

  return NextResponse.json({
    ...collection,
    id: docSnap.id,
    products: updatedProducts,
  });
}
