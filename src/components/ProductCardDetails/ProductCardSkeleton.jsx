"use client";

import { Card, CardContent, Box, Skeleton } from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <Card>
      {/* IMAGE SKELETON */}
      <Skeleton
        variant="rectangular"
        height={180}
        animation="wave"
      />

      <CardContent>
        <Skeleton width="80%" height={22} />
        <Skeleton width="100%" height={18} />
        <Skeleton width="40%" height={22} sx={{ mt: 1 }} />

        {/* BUTTON */}
        <Skeleton
          variant="rectangular"
          height={36}
          sx={{ mt: 1.5, borderRadius: 1 }}
        />
      </CardContent>
    </Card>
  );
}
