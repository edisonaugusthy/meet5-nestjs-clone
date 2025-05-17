"use client";
import {
  Card,
  CardContent,
  Typography,
  Box,
  AvatarGroup,
  Chip,
  styled,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";
import { Activity } from "@/shared/domain/Activity";
import {
  formatDate,
  formatLocation,
  formatParticipantCount,
} from "@/shared/utils/formatters";
import Avatar from "@/shared/components/Avatar";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  borderBottom: `1px solid ${theme.palette.divider}`,
  height: 120,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.primary.main
      : theme.palette.action.hover,
  position: "relative",
}));

const InfoContainer = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: theme.spacing(1),
}));

const DetailRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  margin: theme.spacing(0.5, 0),
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

const ParticipantChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "rgba(255, 127, 92, 0.1)",
  color: theme.palette.primary.main,
  fontWeight: 500,
}));

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const {
    id,
    title,
    location,
    dateTime,
    participants,
    currentParticipants,
    maxParticipants,
  } = activity;

  return (
    <Link href={`/activities/${id}`} style={{ textDecoration: "none" }}>
      <StyledCard>
        <ImageContainer>
          <AvatarGroup
            max={4}
            sx={{
              position: "absolute",
              bottom: "-20px",
              left: "16px",
            }}
          >
            {participants.map((participant) => (
              <Avatar
                key={participant.id}
                alt={participant.name}
                src={participant.avatarUrl}
                sx={{ width: 40, height: 40, border: "2px solid white" }}
              />
            ))}
          </AvatarGroup>
        </ImageContainer>

        <InfoContainer>
          <HeaderContainer>
            <Typography
              variant="h6"
              component="h3"
              color="text.primary"
              sx={{
                fontWeight: 600,
                fontSize: "1.1rem",
                pr: 2,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </Typography>
            <ArrowForwardIosIcon fontSize="small" color="disabled" />
          </HeaderContainer>

          <DetailRow>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2" noWrap>
              {formatLocation(location)}
            </Typography>
          </DetailRow>

          <DetailRow>
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="body2">{formatDate(dateTime)}</Typography>
          </DetailRow>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <ParticipantChip
              size="small"
              label={formatParticipantCount(
                currentParticipants,
                maxParticipants
              )}
            />
          </Box>
        </InfoContainer>
      </StyledCard>
    </Link>
  );
};
export default ActivityCard;
