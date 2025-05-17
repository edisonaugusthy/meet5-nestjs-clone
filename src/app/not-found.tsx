"use client";
import { Box, Typography, Button, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";

const PageContainer = styled(Box)({
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 32,
});

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  textAlign: "center",
  maxWidth: 500,
}));

const ErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: "6rem",
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));

export default function NotFoundPage() {
  const router = useRouter();

  const handleReturnHome = () => {
    router.push("/");
  };

  return (
    <PageContainer>
      <ContentPaper elevation={1}>
        <ErrorCode variant="h1">404</ErrorCode>

        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you are looking for doesn&rsquo;t exist or has been moved.
        </Typography>

        <ActionButton
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={handleReturnHome}
        >
          Back to Home
        </ActionButton>
      </ContentPaper>
    </PageContainer>
  );
}
