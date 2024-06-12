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
    // If the document doesn't exist, set default settings
    return await setDoc(documentRef, defaultSettings);
  }

  const currentSettings = snapshot.data() as SettingType;
  let needsUpdate = false;

  // Check if any field is missing in current settings and add it
  for (const key of Object.keys(defaultSettings)) {
    if (!(key in currentSettings)) {
      currentSettings[key] = defaultSettings[key];
      needsUpdate = true;
    }
  }

  // Check if there are extra fields in current settings and remove them
  for (const key of Object.keys(currentSettings)) {
    if (!(key in defaultSettings)) {
      delete currentSettings[key];
      needsUpdate = true;
    }
  }

  // Update settings in the database if necessary
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
