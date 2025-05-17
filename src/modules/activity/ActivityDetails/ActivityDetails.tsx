"use client";
import { Divider, Container, useTheme, useMediaQuery } from "@mui/material";
import { Activity } from "@/shared/domain/Activity";
import ActivityLoader from "./ActivityLoader";
import ActivityError from "./ActivityError";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import TimeAndLocation from "./TimeAndLocation";
import ParticipantsList from "./ParticipantsList";
import ActivityDescription from "./ActivityDescription";

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
    return <ActivityLoader />;
  }

  if (error || !activity) {
    return <ActivityError error={error} />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3, px: isMobile ? 2 : 4 }}>
      <ActivityDetailsHeader activity={activity} isMobile={isMobile} />
      <Divider sx={{ my: 3 }} />
      <TimeAndLocation activity={activity} />
      <Divider sx={{ my: 3 }} />
      <ParticipantsList activity={activity} />
      <Divider sx={{ my: 3 }} />
      <ActivityDescription description={activity.description} />
    </Container>
  );
};

export default ActivityDetails;
