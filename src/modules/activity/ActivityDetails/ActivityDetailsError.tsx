"use client";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface ActivityDetailsErrorProps {
  error: string | null;
}

export default function ActivityDetailsError({
  error,
}: ActivityDetailsErrorProps) {
  const router = useRouter();

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
    >
      <Typography color="error" variant="h6" gutterBottom>
        {error || "Activity not found"}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/")}
        sx={{ mt: 2, borderRadius: 20 }}
      >
        Back to Activities
      </Button>
    </Box>
  );
}
