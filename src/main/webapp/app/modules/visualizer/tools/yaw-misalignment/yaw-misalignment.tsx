import React from "react";
import {Box, Divider, Typography} from "@mui/material";



export const YawMisalignment = () => {
  return (
    <Box sx={{pl: 2, pr: 2}}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Yaw Misalignment
        </Typography>
        <Divider orientation="horizontal" flexItem>
        </Divider>
      </Box>
    </Box>
  );
}
