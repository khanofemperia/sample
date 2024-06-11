import { NextResponse, NextRequest } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "@/libraries/firebase";

type PageHeroType = {
  image?: string | null;
  title?: string | null;
  destination_url?: string | null;
  visibility: string;
};

const defaultPageHero: PageHeroType = {
  image: null,
  title: null,
  destination_url: null,
  visibility: "HIDDEN",
};

async function createOrUpdatePageHero() {
  const documentRef = doc(database, "page_hero", "storefront_hero");
  const snapshot = await getDoc(documentRef);

  if (!snapshot.exists()) {
    await setDoc(documentRef, defaultPageHero);
  } else {
    const existingPageHeroData = snapshot.data() as PageHeroType;
    const updatedPageHeroData: PageHeroType = {
      ...defaultPageHero,
      ...existingPageHeroData,
    };

    await setDoc(documentRef, updatedPageHeroData);
  }
}

export async function GET(_request: NextRequest) {
  await createOrUpdatePageHero();

  const documentRef = doc(database, "page_hero", "storefront_hero");
  const snapshot = await getDoc(documentRef);
  const pageHero = snapshot.data() as PageHeroType;

  return NextResponse.json(pageHero, { status: 200 });
}
