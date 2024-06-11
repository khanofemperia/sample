import { NextResponse, NextRequest } from "next/server";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { database } from "@/libraries/firebase";
import { generateId } from "@/libraries/utils";

const defaultCategories = [
  { index: 1, name: "Dresses", image: "dresses.png", visibility: "VISIBLE" },
  { index: 2, name: "Tops", image: "tops.png", visibility: "VISIBLE" },
  {
    index: 3,
    name: "Bottoms",
    image: "bottoms.png",
    visibility: "VISIBLE",
  },
  {
    index: 4,
    name: "Outerwear",
    image: "outerwear.png",
    visibility: "VISIBLE",
  },
  { index: 5, name: "Shoes", image: "shoes.png", visibility: "VISIBLE" },
  {
    index: 6,
    name: "Accessories",
    image: "accessories.png",
    visibility: "VISIBLE",
  },
  {
    index: 7,
    name: "Men",
    image: "men.png",
    visibility: "VISIBLE",
  },
  {
    index: 8,
    name: "Catch-All",
    image: "catch-all.png",
    visibility: "VISIBLE",
  },
];

async function createOrUpdateCategories() {
  const snapshot = await getDocs(collection(database, "categories"));

  const existingCategories: CategoryType[] = snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<CategoryType, "id">),
    })
  );

  const categoriesToAddOrUpdate: CategoryType[] = [];

  for (const defaultCategory of defaultCategories) {
    const existingCategory = existingCategories.find(
      (cat) => cat.name === defaultCategory.name
    );

    if (!existingCategory) {
      categoriesToAddOrUpdate.push({ ...defaultCategory, id: generateId() });
    } else {
      const isComplete =
        existingCategory.index === defaultCategory.index &&
        existingCategory.image === defaultCategory.image;

      if (!isComplete) {
        categoriesToAddOrUpdate.push({
          ...existingCategory,
          index: defaultCategory.index,
          image: defaultCategory.image,
        });
      }
    }
  }

  for (const category of categoriesToAddOrUpdate) {
    const documentRef = doc(database, "categories", category.id);
    await setDoc(documentRef, {
      index: category.index,
      name: category.name,
      image: category.image,
      visibility: category.visibility,
    });
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
