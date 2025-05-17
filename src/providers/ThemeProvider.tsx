"use client";
import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useMemo,
  useContext,
} from "react";
import { createTheme } from "@mui/material/styles";
import { darkTheme, lightTheme } from "@/theme/theme";

type ThemeContextType = {
  mode: "light" | "dark";
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  toggleTheme: () => {},
});

export const useThemeToggle = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    if (typeof window !== "undefined") {
      localStorage.setItem("themeMode", mode === "light" ? "dark" : "light");
    }
  };

  const theme = useMemo(
    () => createTheme(mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  const themeContextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
    }),
    [mode]
  );

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("themeMode") as
      | "light"
      | "dark"
      | null;
    if (savedTheme) {
      setMode(savedTheme);
    } else if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      setMode("dark");
    }
  }, []);

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
