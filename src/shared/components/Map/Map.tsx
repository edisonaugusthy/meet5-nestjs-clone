"use client";
import { Box, Paper, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface MapProps {
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  height?: number | string;
}

const Map = ({ location, height = 240 }: MapProps) => {
  return (
    <Paper
      sx={{
        width: "100%",
        height,
        backgroundColor: "action.hover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url(/images/map.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.7,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "50%",
          width: 48,
          height: 48,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LocationOnIcon color="primary" fontSize="large" />
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: 1.5,
          borderRadius: 1,
          zIndex: 10,
        }}
      >
        <Typography variant="subtitle1" color="white">
          {location.name}
        </Typography>
        <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
          {location.coordinates.lat.toFixed(4)},{" "}
          {location.coordinates.lng.toFixed(4)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Map;
