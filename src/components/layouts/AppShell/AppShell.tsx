"use client";

import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Box } from "@mui/material";

const AppShell = ({ children }: React.PropsWithChildren) => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary.main",
        transition: "0.3s",
      }}
    >
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
};

export default AppShell;
