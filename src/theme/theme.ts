import { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customOrange: {
      main: string;
      dark: string;
    };
  }
  interface PaletteOptions {
    customOrange: {
      main: string;
      dark: string;
    };
  }
}

const baseThemeOptions: Partial<ThemeOptions> = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: "8px 22px",
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#E36A4B",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "4px rgba(0, 0, 0, 0.15)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          fontSize: "1rem",
          minWidth: "auto",
          padding: "12px 16px",
          "&.Mui-selected": {
            color: "#FF7F5C",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#FF7F5C",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
};

// Dark theme
export const darkTheme: ThemeOptions = {
  ...baseThemeOptions,
  palette: {
    mode: "dark",
    primary: {
      main: "#FF7F5C",
    },
    secondary: {
      main: "#FFFFFF",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
    customOrange: {
      main: "#FF7F5C",
      dark: "#E36A4B",
    },
  },
};

// Light theme
export const lightTheme: ThemeOptions = {
  ...baseThemeOptions,
  palette: {
    mode: "light",
    primary: {
      main: "#FF7F5C",
    },
    secondary: {
      main: "#121212",
    },
    background: {
      default: "#F5F5F7",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#121212",
      secondary: "#666666",
    },
    customOrange: {
      main: "#FF7F5C",
      dark: "#E36A4B",
    },
  },
};

export default darkTheme;
