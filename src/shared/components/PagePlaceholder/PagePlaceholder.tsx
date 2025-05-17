"use client";
import { Box, Typography } from "@mui/material";

interface PagePlaceholderProps {
  title: string;
}

export default function PagePlaceholder({ title }: PagePlaceholderProps) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
        p: 4,
      }}
    >
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 3 }}>
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center", mt: 2 }}
      >
        This is a placeholder for the {title} section. The Meet5 web version
        demo currently only has the Activities page fully implemented.
      </Typography>
    </Box>
  );
}
