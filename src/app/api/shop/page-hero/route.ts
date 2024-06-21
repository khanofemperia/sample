import { NextResponse, NextRequest } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "@/libraries/firebase";

type PageHeroType = {
  title: string;
  destinationUrl: string;
  visibility: string;
  images: {
    desktopImage: string;
    mobileImage: string;
  };
};

export async function GET(_request: NextRequest) {
  const documentRef = doc(database, "pageHero", "storefrontHero");
  const snapshot = await getDoc(documentRef);
  const pageHero = snapshot.data() as PageHeroType;

  return NextResponse.json(pageHero, { status: 200 });
}
