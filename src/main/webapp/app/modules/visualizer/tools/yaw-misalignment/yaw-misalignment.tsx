import React from "react";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import {useAppDispatch, useAppSelector} from "app/modules/store/storeConfig";
import {
  applyYawMisalignmentDetection,
  toggleYawMisalignmentDetection
} from "app/modules/store/visualizerSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";



export const YawMisalignment = () => {
  const { dataset, from, to,  yawMisalignmentEnabled} = useAppSelector(state => state.visualizer);

  const dispatch = useAppDispatch();

  const handleEnableYaw = () => {
    const action = !yawMisalignmentEnabled;
    dispatch(toggleYawMisalignmentDetection(action));
    if(action)
      dispatch(applyYawMisalignmentDetection({id: dataset.id, from, to}));
  }

  return (
    <Box sx={{height: "fit-content", width: "50%", m: "auto", pt: 5}}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
            p:0,
          }}
        >
          <ManageSearchIcon/>
          <Typography variant="body1" gutterBottom sx={{fontWeight:600}}>
            Detect
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Box sx={{pt: 1}}>Enable</Box>
          <Switch
            checked={yawMisalignmentEnabled}
            onChange={() => handleEnableYaw()}
            inputProps={{'aria-label': 'controlled'}}
          />
        </Box>
      </Box>
    </Box>
  );
}
