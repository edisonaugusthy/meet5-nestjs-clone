"use client";
import { useState, useCallback, useEffect } from "react";
import { Activity } from "@/shared/domain/Activity";
import { TabType } from "@/shared/models/TabType";
import { getActivities, getActivityById } from "@/lib/api/activities";

export function useActivities(initialTab: TabType = TabType.MyActivities) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  const fetchActivities = useCallback(
    async (tab: TabType = activeTab) => {
      setLoading(true);
      setError(null);

      try {
        const data = await getActivities(tab);
        setActivities(data);
        setActiveTab(tab);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch activities. Please try again.";

        setError(errorMessage);
        console.error("Error fetching activities:", err);
      } finally {
        setLoading(false);
      }
    },
    [activeTab]
  );

  const fetchActivityById = useCallback(
    async (id: string): Promise<Activity | null> => {
      setLoading(true);
      setError(null);

      try {
        const data = await getActivityById(id);
        return data;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch activity details. Please try again.";

        setError(errorMessage);
        console.error("Error fetching activity details:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );
  useEffect(() => {
    fetchActivities(activeTab);
  }, []);

  return {
    activities,
    loading,
    error,
    activeTab,
    fetchActivities,
    fetchActivityById,
    setActiveTab,
  };
}
