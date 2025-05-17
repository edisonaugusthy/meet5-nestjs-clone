"use client";
import { ReactNode } from "react";
import ThemeProvider from "@/providers/ThemeProvider";
import Header from "@/shared/layout/Header";
import Navigation from "@/shared/layout/Navigation";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

const LayoutContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
}));

const HeaderContainer = styled(Box)({
  height: "64px",
  flexShrink: 0,
});

const ContentWrapper = styled(Box)({
  display: "flex",
  flex: 1,
  width: "100%",
  overflow: "hidden",
});

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: "240px",
  flexShrink: 0,
  height: "100%",
  overflowY: "auto",
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const MainContent = styled(Box)({
  flex: 1,
  height: "100%",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
});

const MobileNavContainer = styled(Box)({
  height: "56px",
  flexShrink: 0,
});

export default function ClientLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <ThemeProvider>
      <LayoutContainer>
        <HeaderContainer>
          <Header />
        </HeaderContainer>

        <ContentWrapper>
          {/* Sidebar navigation for desktops */}
          {!isMobile && (
            <SidebarContainer>
              <Navigation />
            </SidebarContainer>
          )}

          {/*  content */}
          <MainContent>{children}</MainContent>
        </ContentWrapper>

        {/* Bottom navigation for mobile/tabs */}
        {isMobile && (
          <MobileNavContainer>
            <Navigation />
          </MobileNavContainer>
        )}
      </LayoutContainer>
    </ThemeProvider>
  );
}
