"use client";
import { createContext, useState, useContext } from "react";
import { ThemeProvider, Theme } from "@mui/material/styles";
import { lightTheme, darkTheme } from "@/components/theme/theme";

interface ThemeContextType {
  toggleTheme: () => void;
  theme: Theme;
  mode: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error(
      "useThemeContext must be used within a ThemeProviderWrapper"
    );
  return context;
}
