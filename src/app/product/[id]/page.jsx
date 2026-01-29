"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ClientProductGrid from "@/components/ProductCardDetails/ClientProductGrid";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

 useEffect(() => {
  fetch(`/api/products?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      setProduct(data);

      return fetch(
        `/api/products/related?category=${data.category}&exclude=${data._id}`
      );
    })
    .then(async (res) => {
  if (!res.ok) return [];
  const text = await res.text();
  return text ? JSON.parse(text) : [];
})
.then(setRelated);

}, [id]);


  if (!product) return null;

  return (
    <>
      {/* MAIN PRODUCT */}
      <Box sx={{ p: 4 }}>
        <Typography variant="h4">{product.name}</Typography>
        <Typography sx={{ mt: 1 }}>₹{product.price}</Typography>
        <Typography sx={{ mt: 1, color: "#666" }}>
          Category: {product.category}
        </Typography>
      </Box>

      {/* RELATED PRODUCTS GRID */}
      <Typography sx={{ px: 4, fontSize: 20, fontWeight: 600 }}>
        Related Products
      </Typography>

     {related.length > 0 ? (
  <ClientProductGrid products={related} />
) : (
  <Typography sx={{ px: 4, color: "#777" }}>
    No related products found.
  </Typography>
)}

    </>
  );
}
