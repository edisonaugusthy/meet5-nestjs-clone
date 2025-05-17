"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { usePathname, useRouter } from "next/navigation";
import { useThemeToggle } from "@/providers/ThemeProvider";
import Button from "../components/Button/Button";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const { mode, toggleTheme } = useThemeToggle();

  const goBack = () => {
    router.back();
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Toolbar>
        {!isHomePage && isMobile ? (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={goBack}
          >
            <ArrowBackIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                color: "primary.main",
                display: "flex",
                alignItems: "center",
              }}
            >
              Meet5
              {!isMobile && (
                <Box
                  component="span"
                  sx={{ ml: 1, color: "text.primary", fontWeight: 400 }}
                >
                  • Find Activities Near You
                </Box>
              )}
            </Typography>
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}>
          <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 1 }}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>

        {isHomePage && (
          <>
            <IconButton color="inherit" aria-label="help">
              <HelpOutlineIcon />
            </IconButton>

            <IconButton color="inherit" aria-label="filter" sx={{ ml: 1 }}>
              <FilterListIcon />
            </IconButton>
          </>
        )}

        {!isMobile && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ ml: 2, borderRadius: "20px" }}
          >
            Create Activity
          </Button>
        )}

        {isMobile && isHomePage && (
          <IconButton
            color="primary"
            aria-label="add activity"
            sx={{
              position: "fixed",
              bottom: 80,
              right: 20,
              zIndex: 1000,
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
              width: 56,
              height: 56,
            }}
          >
            <AddIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
