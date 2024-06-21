import { NextResponse, NextRequest } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "@/libraries/firebase";

type PageHeroType = {
  title?: string | null;
  destinationUrl?: string | null;
  visibility: string;
  images: {
    desktopImage?: string | null;
    mobileImage?: string | null;
  };
};

const defaultPageHero: PageHeroType = {
  images: {
    desktopImage: null,
    mobileImage: null,
  },
  title: null,
  destinationUrl: null,
  visibility: "HIDDEN",
};

async function createOrUpdatePageHero() {
  const documentRef = doc(database, "pageHero", "storefrontHero");
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

  const documentRef = doc(database, "pageHero", "storefrontHero");
  const snapshot = await getDoc(documentRef);
  const pageHero = snapshot.data() as PageHeroType;

  return NextResponse.json(pageHero, { status: 200 });
}
