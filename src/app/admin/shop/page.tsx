import CollectionTable from "@/components/admin/Storefront/CollectionTable";
import {
  ChangeIndexIcon,
  ChevronRightIcon,
  EditIcon,
} from "@/icons";
import { fetchData } from "@/libraries/utils";
import Link from "next/link";
import { HiOutlineBan, HiOutlineClock } from "react-icons/hi";
import { IoHourglassOutline } from "react-icons/io5";

export default async function Storefront() {
  const collections = await fetchData<CollectionType[]>("/api/collections");

  return (
    <CollectionTable collections={collections} />
  );
}
