"use client";
import { Box, Skeleton, Divider } from "@mui/material";

export default function ActivityDetailsSkeleton() {
  return (
    <Box sx={{ p: 4 }}>
      <Skeleton
        variant="rectangular"
        height={240}
        sx={{ borderRadius: 2, mb: 3 }}
      />

      <Skeleton variant="text" height={40} width="70%" sx={{ mb: 1 }} />
      <Skeleton variant="text" height={24} width="40%" sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Skeleton
          variant="rectangular"
          height={40}
          width={120}
          sx={{ borderRadius: 20 }}
        />
        <Skeleton variant="circular" height={40} width={40} />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Skeleton variant="text" height={32} width="40%" sx={{ mb: 2 }} />

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Skeleton variant="circular" height={24} width={24} />
        <Skeleton variant="text" height={24} width="60%" />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Skeleton variant="circular" height={24} width={24} />
        <Skeleton variant="text" height={24} width="70%" />
      </Box>
    </Box>
  );
}
