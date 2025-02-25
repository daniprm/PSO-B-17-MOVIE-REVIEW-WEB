import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#ffffff",
      paper: "#0079FF",
    },
    text: {
      primary: "#313131",
      secondary: "#ffffff",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#000000",
      paper: "#024CAA",
    },
    text: {
      primary: "#ffffff",
      secondary: "#fffff",
    },
  },
});
