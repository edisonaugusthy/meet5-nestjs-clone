"use client";
import { Box, Typography } from "@mui/material";

interface ActivityDescriptionProps {
  description: string | undefined;
}

const ActivityDescription = ({ description }: ActivityDescriptionProps) => {
  return (
    <Box>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Description
      </Typography>

      <Typography variant="body1" paragraph>
        {description || "No description provided."}
      </Typography>
    </Box>
  );
};

export default ActivityDescription;
