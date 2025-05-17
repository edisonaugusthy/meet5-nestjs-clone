"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box } from "@mui/material";
import { Activity } from "@/shared/domain/Activity";
import { getActivityById } from "@/lib/api/activities";
import ActivityDetails from "@/modules/activity/ActivityDetails/ActivityDetails";
import ActivityDetailsSkeleton from "@/modules/activity/ActivityDetails/ActivityDetailsSkeleton";
import ActivityDetailsError from "@/modules/activity/ActivityDetails/ActivityDetailsError";

export default function ActivityDetailPage() {
  const params = useParams();
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
      return <ActivityDetailsSkeleton />;
    }

    if (error || !activity) {
      return <ActivityDetailsError error={error} />;
    }

    return (
      <ActivityDetails activity={activity} loading={loading} error={error} />
    );
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflow: "auto",
      }}
    >
      {renderContent()}
    </Box>
  );
}
