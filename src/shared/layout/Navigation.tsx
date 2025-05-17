"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import ExploreIcon from "@mui/icons-material/Explore";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ROUTES = [
  { path: "/", label: "Activities", icon: PeopleIcon },
  { path: "/for-me", label: "For me", icon: PersonIcon },
  { path: "/discover", label: "Discover", icon: ExploreIcon },
  { path: "/chats", label: "Chats", icon: ChatIcon },
  { path: "/profile", label: "Profile", icon: AccountCircleIcon },
];

const MobileNavPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "56px",
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  "& .MuiBottomNavigationAction-root": {
    color: theme.palette.text.secondary,
  },
  "& .Mui-selected": {
    color: theme.palette.primary.main,
  },
}));

const NavContainer = styled(Box)({
  height: "100%",
  width: "100%",
  padding: 16,
});

const NavItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  backgroundColor: active ? theme.palette.action.selected : "transparent",
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getActiveIndex = () => {
    if (pathname === "/" || pathname.startsWith("/activities")) return 0;
    const index = ROUTES.findIndex((route) => pathname === route.path);
    return index >= 0 ? index : 0;
  };

  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(getActiveIndex());
  }, [pathname]);

  const handleNavChange = (_: unknown, newValue: number) => {
    setValue(newValue);
    router.push(ROUTES[newValue].path);
  };

  // Mobile navigation
  if (isMobile) {
    return (
      <MobileNavPaper elevation={3}>
        <StyledBottomNavigation
          showLabels
          value={value}
          onChange={handleNavChange}
        >
          {ROUTES.map((route) => (
            <BottomNavigationAction
              key={route.path}
              label={route.label}
              icon={<route.icon />}
            />
          ))}
        </StyledBottomNavigation>
      </MobileNavPaper>
    );
  }

  return (
    <NavContainer>
      {ROUTES.map((route, index) => (
        <NavItem
          key={route.path}
          active={value === index}
          onClick={() => handleNavChange(null, index)}
        >
          <route.icon />
          <Typography fontWeight={value === index ? 600 : 400}>
            {route.label}
          </Typography>
        </NavItem>
      ))}
    </NavContainer>
  );
}
