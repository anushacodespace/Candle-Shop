import ShopClient from "@/components/ShopClient";
import AuthGuard from "@/components/AuthGuard";

async function getProducts() {
 const res = await fetch("/api/products", {
  cache: "no-store",
});

  return res.json();
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main style={{ padding: 24 }}>
    <AuthGuard>
      <ShopClient products={products} />
    </AuthGuard>
    </main>
  );
}
