import { Box, Typography } from "@mui/material";
import React from "react";

const Header = ({ children }: React.PropsWithChildren) => {
  return (
    <Box className="pl-5 pt-5">
      <Typography
        variant="h5"
        sx={{
          color: "text.primary",
          fontWeight: "bold",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default Header;
