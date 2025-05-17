"use client";
import { Box, CircularProgress } from "@mui/material";

const ActivityLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default ActivityLoader;
