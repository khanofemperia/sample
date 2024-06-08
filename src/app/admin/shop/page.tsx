import CollectionTable from "@/components/admin/Storefront/CollectionTable";
import { NewCollectionOverlay } from "@/components/admin/Storefront/NewCollection";
import { fetchData } from "@/libraries/utils";

export default async function Storefront() {
  const collections = await fetchData<CollectionType[]>("/api/collections");

  return (
    <>
      <div className="mb-10">
        <h2 className="font-semibold text-lg mb-5">Elements</h2>
        <div className="flex gap-2">
          <div className="w-60 h-20 border rounded-md p-5 font-semibold text-sm bg-white">Page hero</div>
          <div className="w-60 h-20 border rounded-md p-5 font-semibold text-sm bg-white">Categories</div>
          <div className="w-60 h-20 border rounded-md p-5 font-semibold text-sm bg-white">Recommendations</div>
        </div>
      </div>
      <h2 className="font-semibold text-lg mb-5">Collections</h2>
      <CollectionTable collections={collections} />
      <NewCollectionOverlay />
    </>
  );
}
