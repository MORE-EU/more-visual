import React from "react";
import {Box, Divider, Switch, Typography} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import {useAppDispatch, useAppSelector} from "app/modules/store/storeConfig";
import {
  applyYawMisalignmentDetection,
  toggleYawMisalignmentDetection
} from "app/modules/store/visualizerSlice";



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
    <Box sx={{pl: 2, pr: 2}}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Yaw Misalignment
        </Typography>
        <Divider orientation="horizontal" flexItem>
        </Divider>
      </Box>
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
