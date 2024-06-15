import {
  NewUpsellEmptyGridButton,
  NewUpsellOverlay,
} from "@/components/admin/NewUpsell";
import UpsellGrid from "@/components/admin/UpsellGrid";
import { fetchData, formatThousands } from "@/libraries/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Upsells() {
  const upsells = await fetchData<UpsellType[]>("/api/upsells");

  return (
    <>
      <UpsellGrid upsells={upsells} />
      <NewUpsellOverlay />
    </>
  );
}
