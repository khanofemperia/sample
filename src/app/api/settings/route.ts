import { NextResponse, NextRequest } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "@/libraries/firebase";

type SettingType = {
  categorySection: {
    visibility: string;
  };
  [key: string]: any;
};

const defaultSettings: SettingType = {
  categorySection: {
    visibility: "HIDDEN",
  },
};

async function createOrUpdateSettings() {
  const documentRef = doc(database, "settings", "defaultSettings");
  const snapshot = await getDoc(documentRef);

  if (!snapshot.exists()) {
    return await setDoc(documentRef, defaultSettings);
  }

  const currentSettings = snapshot.data() as SettingType;
  let needsUpdate = false;

  for (const key of Object.keys(defaultSettings)) {
    if (!(key in currentSettings)) {
      currentSettings[key] = defaultSettings[key];
      needsUpdate = true;
    }
  }

  for (const key of Object.keys(currentSettings)) {
    if (!(key in defaultSettings)) {
      delete currentSettings[key];
      needsUpdate = true;
    }
  }

  if (needsUpdate) {
    await setDoc(documentRef, currentSettings);
  }
}

export async function GET(_request: NextRequest) {
  await createOrUpdateSettings();

  const documentRef = doc(database, "settings", "defaultSettings");
  const snapshot = await getDoc(documentRef);
  const settings = snapshot.data() as SettingType;

  return NextResponse.json(settings, { status: 200 });
}
