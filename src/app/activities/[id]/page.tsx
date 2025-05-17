"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Typography, Button, Divider, Skeleton } from "@mui/material";

import { Activity } from "@/shared/domain/Activity";
import { getActivityById } from "@/lib/api/activities";

import ActivityDetails from "@/modules/activity/ActivityDetails";

export default function ActivityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      if (!params.id) {
        setError("Activity ID is missing");
        setLoading(false);
        return;
      }

      try {
        const data = await getActivityById(params.id as string);
        setActivity(data);
      } catch (err) {
        setError("Failed to fetch activity details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [params.id]);

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ p: 4 }}>
          <Skeleton
            variant="rectangular"
            height={240}
            sx={{ borderRadius: 2, mb: 3 }}
          />

          <Skeleton variant="text" height={40} width="70%" sx={{ mb: 1 }} />
          <Skeleton variant="text" height={24} width="40%" sx={{ mb: 3 }} />

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Skeleton
              variant="rectangular"
              height={40}
              width={120}
              sx={{ borderRadius: 20 }}
            />
            <Skeleton variant="circular" height={40} width={40} />
          </Box>

          <Divider sx={{ my: 3 }} />
          <Skeleton variant="text" height={32} width="40%" sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Skeleton variant="circular" height={24} width={24} />
            <Skeleton variant="text" height={24} width="60%" />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Skeleton variant="circular" height={24} width={24} />
            <Skeleton variant="text" height={24} width="70%" />
          </Box>
        </Box>
      );
    }

    if (error || !activity) {
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

    return (
      <ActivityDetails activity={activity} loading={loading} error={error} />
    );
  };

  // Main render - with scrollable container
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflow: "auto", // Enable scrolling
      }}
    >
      {renderContent()}
    </Box>
  );
}
