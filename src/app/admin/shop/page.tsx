import CollectionTable from "@/components/admin/Storefront/CollectionTable";
import { NewCollectionOverlay } from "@/components/admin/Storefront/NewCollection";
import { fetchData } from "@/libraries/utils";

export default async function Storefront() {
  const collections = await fetchData<CollectionType[]>("/api/collections");

  return (
    <>
      <CollectionTable collections={collections} />
      <NewCollectionOverlay />
    </>
  );
}
