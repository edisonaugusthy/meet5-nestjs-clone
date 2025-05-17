"use client";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Activity } from "@/shared/domain/Activity";
import { formatDate } from "@/shared/utils/formatters";

interface TimeAndLocationProps {
  activity: Activity;
}

const TimeAndLocation = ({ activity }: TimeAndLocationProps) => {
  return (
    <Box>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Time and location
      </Typography>

      <DateTimeInfo dateTime={activity.dateTime} />
      <LocationInfo location={activity.location} />
    </Box>
  );
};

interface DateTimeInfoProps {
  dateTime: string;
}

const DateTimeInfo = ({ dateTime }: DateTimeInfoProps) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
    <CalendarTodayIcon color="primary" />
    <Typography variant="body1">{formatDate(dateTime)}</Typography>
  </Box>
);

interface LocationInfoProps {
  location: {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
  };
}

const LocationInfo = ({ location }: LocationInfoProps) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}>
    <LocationOnIcon color="primary" />
    <Box>
      <Typography variant="body1">{location.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {location.address}, {location.postalCode} {location.city},{" "}
        {location.country}
      </Typography>
    </Box>
  </Box>
);

export default TimeAndLocation;
