"use client";
import { Box, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Activity } from "@/shared/domain/Activity";
import Avatar from "@/shared/components/Avatar/Avatar";

interface ParticipantsHeaderProps {
  currentParticipants: number;
  maxParticipants: number;
}

const ParticipantsHeader = ({
  currentParticipants,
  maxParticipants,
}: ParticipantsHeaderProps) => (
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
    Participants ({currentParticipants} of {maxParticipants})
  </Typography>
);

interface ParticipantAvatarProps {
  name: string;
  avatarUrl: string;
}

const ParticipantAvatar = ({ name, avatarUrl }: ParticipantAvatarProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 1,
    }}
  >
    <Avatar src={avatarUrl} alt={name} sx={{ width: 60, height: 60 }} />
    <Typography
      variant="body2"
      noWrap
      sx={{ maxWidth: 80, textAlign: "center" }}
    >
      {name}
    </Typography>
  </Box>
);

const EmptySpotAvatar = () => (
  <Box
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
);

interface ParticipantsListProps {
  activity: Activity;
}

const ParticipantsList = ({ activity }: ParticipantsListProps) => {
  const { participants, currentParticipants, maxParticipants } = activity;

  return (
    <Box sx={{ mb: 3 }}>
      <ParticipantsHeader
        currentParticipants={currentParticipants}
        maxParticipants={maxParticipants}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
        {participants.map((participant) => (
          <ParticipantAvatar
            key={participant.id}
            name={participant.name}
            avatarUrl={participant.avatarUrl}
          />
        ))}
        {Array.from({
          length: maxParticipants - currentParticipants,
        }).map((_, index) => (
          <EmptySpotAvatar key={`empty-${index}`} />
        ))}
      </Box>
    </Box>
  );
};

export default ParticipantsList;
