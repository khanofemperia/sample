import { NewProductOverlay } from "@/components/admin/NewProduct";
import ProductGrid from "@/components/admin/ProductGrid";
import { fetchData } from "@/libraries/utils";

export default async function Products() {
  const products = await fetchData<ProductType[]>("/api/products", [
    "id",
    "mainImage",
    "name",
    "price",
    "slug",
    "visibility",
  ]);

  return (
    <>
      <ProductGrid products={products} />
      <NewProductOverlay />
    </>
  );
}
