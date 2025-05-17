"use client";
import { useEffect, useState, useCallback } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Virtuoso } from "react-virtuoso";
import { styled } from "@mui/material/styles";
import ActivityCard from "../ActivityCard/ActivityCard";
import ActivityCardSkeleton from "../ActivityCard/ActivityCardSkeleton";
import ActivityTabs from "./ActivityTabs";
import { Activity } from "@/shared/domain/Activity";
import { TabType } from "@/shared/models/TabType";
import { useActivities } from "@/hooks/useActivities";

const ITEMS_PER_PAGE = 5;

const PageContainer = styled(Box)(() => ({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

const TabSection = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMobile",
})<{ isMobile: boolean }>(({ theme, isMobile }) => ({
  padding: theme.spacing(3, isMobile ? 2 : 4, 2),
}));

const ContentSection = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMobile",
})<{ isMobile: boolean }>(({ theme, isMobile }) => ({
  flex: 1,
  padding: `0 ${theme.spacing(isMobile ? 2 : 4)}`,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

const EmptyStateContainer = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ActivityList = () => {
  const {
    activities: allActivities,
    loading: initialLoading,
    error,
    activeTab,
    fetchActivities,
    setActiveTab,
  } = useActivities();

  const [visibleActivities, setVisibleActivities] = useState<Activity[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  useEffect(() => {
    if (!initialLoading) {
      if (allActivities.length > 0) {
        const initialItems = allActivities.slice(0, ITEMS_PER_PAGE);
        setVisibleActivities(initialItems);
        setHasMore(allActivities.length > ITEMS_PER_PAGE);
      } else {
        setVisibleActivities([]);
        setHasMore(false);
      }
      setPage(1);
    }
  }, [allActivities, initialLoading]);

  const handleTabChange = useCallback(
    (tab: TabType) => {
      setActiveTab(tab);
      fetchActivities(tab);
    },
    [fetchActivities, setActiveTab]
  );

  const simulateNetworkDelay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore || initialLoading) return;
    setLoadingMore(true);
    await simulateNetworkDelay(1000);
    try {
      const nextPage = page + 1;
      const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newItems = allActivities.slice(startIndex, endIndex);
      setVisibleActivities((prev) => [...prev, ...newItems]);
      setPage(nextPage);
      setHasMore(endIndex < allActivities.length);
    } finally {
      setLoadingMore(false);
    }
  }, [allActivities, hasMore, initialLoading, loadingMore, page]);

  const Footer = useCallback(() => {
    return loadingMore ? <ActivityCardSkeleton /> : null;
  }, [loadingMore]);

  const renderContent = () => {
    if (!initialLoading && !loadingMore && visibleActivities.length === 0) {
      return (
        <EmptyStateContainer>
          <Typography color="text.secondary" align="center">
            {error
              ? error
              : "No activities found. Try a different tab or create a new activity."}
          </Typography>
        </EmptyStateContainer>
      );
    }

    if (initialLoading && visibleActivities.length === 0) {
      return (
        <ContentSection isMobile={isMobile}>
          <Box sx={{ paddingBottom: 2 }}>
            {Array.from({ length: 3 }).map((_, index) => (
              <ActivityCardSkeleton key={index} />
            ))}
          </Box>
        </ContentSection>
      );
    }

    return (
      <ContentSection isMobile={isMobile}>
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <Virtuoso
            style={{ height: "100%", width: "100%" }}
            data={visibleActivities}
            endReached={loadMore}
            overscan={3}
            itemContent={(_, activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            )}
            components={{ Footer }}
          />
        </Box>
      </ContentSection>
    );
  };

  return (
    <PageContainer sx={{ pb: isMobile ? 2 : 0 }}>
      <TabSection isMobile={isMobile}>
        <ActivityTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </TabSection>
      {renderContent()}
    </PageContainer>
  );
};

export default ActivityList;
