import { NextResponse, NextRequest } from "next/server";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { database } from "@/libraries/firebase";
import { generateId } from "@/libraries/utils";

const defaultCategories = [
  { index: 1, name: "Dresses", image: "dresses.png", visibility: "HIDDEN" },
  { index: 2, name: "Tops", image: "tops.png", visibility: "HIDDEN" },
  { index: 3, name: "Bottoms", image: "bottoms.png", visibility: "HIDDEN" },
  {
    index: 4,
    name: "Outerwear",
    image: "outerwear.png",
    visibility: "HIDDEN",
  },
  { index: 5, name: "Shoes", image: "shoes.png", visibility: "HIDDEN" },
  {
    index: 6,
    name: "Accessories",
    image: "accessories.png",
    visibility: "HIDDEN",
  },
  { index: 7, name: "Men", image: "men.png", visibility: "HIDDEN" },
  {
    index: 8,
    name: "Catch-All",
    image: "catch-all.png",
    visibility: "HIDDEN",
  },
];

async function createOrUpdateCategories() {
  const snapshot = await getDocs(collection(database, "categories"));

  const existingCategories: { [key: string]: CategoryType } =
    snapshot.docs.reduce((acc, doc) => {
      acc[doc.data().name] = {
        id: doc.id,
        ...(doc.data() as Omit<CategoryType, "id">),
      };
      return acc;
    }, {} as { [key: string]: CategoryType });

  for (const defaultCategory of defaultCategories) {
    const existingCategory = existingCategories[defaultCategory.name];

    if (!existingCategory) {
      // Category does not exist, create a new one
      const newCategory = { ...defaultCategory, id: generateId() };
      await setDoc(doc(database, "categories", newCategory.id), newCategory);
    } else {
      // Category exists, update it if necessary
      const isComplete =
        existingCategory.index === defaultCategory.index &&
        existingCategory.image === defaultCategory.image &&
        existingCategory.visibility === defaultCategory.visibility;

      if (!isComplete) {
        await setDoc(doc(database, "categories", existingCategory.id), {
          index: defaultCategory.index,
          name: defaultCategory.name,
          image: defaultCategory.image,
          visibility: defaultCategory.visibility,
        });
      }
    }
  }
}

export async function GET(_request: NextRequest) {
  await createOrUpdateCategories();

  const snapshot = await getDocs(collection(database, "categories"));

  const categories: CategoryType[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<CategoryType, "id">),
  }));

  categories.sort((a, b) => a.index - b.index);

  return NextResponse.json(categories, { status: 200 });
}
