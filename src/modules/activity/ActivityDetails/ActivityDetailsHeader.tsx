"use client";
import { Box, Typography } from "@mui/material";
import { Activity } from "@/shared/domain/Activity";
import Map from "@/shared/components/Map/Map";
import Button from "@/shared/components/Button/Button";

interface ActivityHeaderProps {
  activity: Activity;
  isMobile: boolean;
}

const ActivityDetailsHeader = ({ activity, isMobile }: ActivityHeaderProps) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Map location={activity.location} />

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        {activity.title}
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Anyone can join
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ flex: isMobile ? 1 : "auto", borderRadius: 8 }}
        >
          Join
        </Button>
      </Box>
    </Box>
  );
};

export default ActivityDetailsHeader;
