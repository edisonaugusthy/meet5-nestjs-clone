"use client";
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Activity } from "@/shared/domain/Activity";
import { formatDate } from "@/shared/utils/formatters";
import Avatar from "@/shared/components/Avatar";
import Button from "@/shared/components/Button";
import Map from "@/shared/components/Map";

interface ActivityDetailsProps {
  activity: Activity;
  loading: boolean;
  error: string | null;
}

const ActivityDetails = ({
  activity,
  loading,
  error,
}: ActivityDetailsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (loading) {
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
  }

  if (error || !activity) {
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
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3, px: isMobile ? 2 : 4 }}>
      <Box sx={{ mb: 4 }}>
        <Map location={activity.location}></Map>

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

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Time and location
      </Typography>

      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
        <CalendarTodayIcon color="primary" />
        <Typography variant="body1">{formatDate(activity.dateTime)}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}>
        <LocationOnIcon color="primary" />
        <Box>
          <Typography variant="body1">{activity.location.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {activity.location.address}, {activity.location.postalCode}{" "}
            {activity.location.city}, {activity.location.country}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <PeopleAltIcon />
          Participants ({activity.currentParticipants} of{" "}
          {activity.maxParticipants})
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          {activity.participants.map((participant) => (
            <Box
              key={participant.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Avatar
                src={participant.avatarUrl}
                alt={participant.name}
                sx={{ width: 60, height: 60 }}
              />
              <Typography
                variant="body2"
                noWrap
                sx={{ maxWidth: 80, textAlign: "center" }}
              >
                {participant.name}
              </Typography>
            </Box>
          ))}

          {/* Empty spots */}
          {Array.from({
            length: activity.maxParticipants - activity.currentParticipants,
          }).map((_, index) => (
            <Box
              key={`empty-${index}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "action.hover",
                  color: "text.secondary",
                }}
              >
                +
              </Avatar>
              <Typography
                variant="body2"
                color="text.secondary"
                noWrap
                sx={{ maxWidth: 80, textAlign: "center" }}
              >
                Open
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Description
      </Typography>

      <Typography variant="body1" paragraph>
        {activity.description || "No description provided."}
      </Typography>
    </Container>
  );
};

export default ActivityDetails;
