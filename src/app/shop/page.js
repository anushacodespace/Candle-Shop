import { headers } from "next/headers";
import ShopClient from "@/components/collections/ShopClient";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return <ShopClient products={products} />;
}
