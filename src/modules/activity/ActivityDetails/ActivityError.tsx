"use client";
import { Box, Typography } from "@mui/material";

interface ActivityErrorStateProps {
  error: string | null;
}

const ActivityError = ({ error }: ActivityErrorStateProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
      }}
    >
      <Typography color="error">{error || "Activity not found"}</Typography>
    </Box>
  );
};
export default ActivityError;
