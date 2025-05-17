"use client";

import { Box, Tabs, Tab, Typography, styled } from "@mui/material";
import { useCallback } from "react";
import { TabType } from "@/shared/models/TabType";

interface ActivityTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 500,
  fontSize: "1rem",
  padding: theme.spacing(1.5, 2),
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.75rem",
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const ActivityTabs = ({ activeTab, onTabChange }: ActivityTabsProps) => {
  const handleChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      const tabs: TabType[] = [
        TabType.Invitations,
        TabType.MyActivities,
        TabType.Favorites,
      ];

      onTabChange(tabs[newValue]);
    },
    [onTabChange]
  );

  const getTabValue = () => {
    switch (activeTab) {
      case TabType.Invitations:
        return 0;
      case TabType.MyActivities:
        return 1;
      case TabType.Favorites:
        return 2;
      default:
        return 1;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <PageTitle variant="h4">Meetings for me -{activeTab}</PageTitle>
      <StyledTabs
        value={getTabValue()}
        onChange={handleChange}
        variant="fullWidth"
        aria-label="activity tabs"
      >
        <StyledTab label={TabType.Invitations} />
        <StyledTab label={TabType.MyActivities} />
        <StyledTab label={TabType.Favorites} />
      </StyledTabs>
    </Box>
  );
};

export default ActivityTabs;
