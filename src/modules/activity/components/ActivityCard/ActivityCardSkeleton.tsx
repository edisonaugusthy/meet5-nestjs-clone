"use client";

import { Card, CardContent, Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  transition: "transform 0.2s ease-in-out",
}));

const ImageSkeleton = styled(Box)(({ theme }) => ({
  display: "flex",
  borderBottom: `1px solid ${theme.palette.divider}`,
  height: 120,
  backgroundColor: theme.palette.action.hover,
  position: "relative",
}));

const ContentSkeleton = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ActivityCardSkeleton = () => {
  return (
    <StyledCard elevation={1}>
      <ImageSkeleton>
        <Box
          sx={{
            position: "absolute",
            bottom: -20,
            left: 16,
            display: "flex",
            zIndex: 1,
          }}
        >
          {[...Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              variant="circular"
              width={40}
              height={40}
              sx={{
                ml: index > 0 ? -1 : 0,
                border: "2px solid white",
                backgroundColor: "action.hover",
              }}
            />
          ))}
        </Box>
      </ImageSkeleton>

      <ContentSkeleton>
        {/* Title */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Skeleton variant="text" width="80%" height={28} />
          <Skeleton variant="circular" width={24} height={24} />
        </Box>

        {/* Location */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width="60%" height={20} />
        </Box>

        {/* Date */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width="70%" height={20} />
        </Box>

        {/* Participant count */}
        <Skeleton
          variant="rounded"
          width={120}
          height={24}
          sx={{ borderRadius: "16px" }}
        />
      </ContentSkeleton>
    </StyledCard>
  );
};

export default ActivityCardSkeleton;
