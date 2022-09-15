import React from 'react';
import { Box, Checkbox, List, ListItem, ListItemButton, ListItemText, Modal } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { setCompare, updateCompare } from 'app/modules/store/visualizerSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
} as const;

export const ChartCompare = () => {
  
  const { wdFiles, dataset, showCompare, compare } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const handleOnClick = e => {
    dispatch(updateCompare(e.target.innerText.replace('.csv', '')));
  };

  const handleClose = () => {
    dispatch(setCompare(false));
  };

  return (
    <>
      <Modal open={showCompare} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <List dense sx={{ width: '100%' }}>
            {wdFiles.map(
              (file, idx) =>
                file.replace('.csv', '') !== dataset.id && (
                  <ListItem
                    key={`${file}-${idx}`}
                    onClick={handleOnClick}
                    secondaryAction={<Checkbox edge="end" checked={compare.includes(file.replace('.csv', ''))} />}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemText id={`${file}-item-text`} primary={file} />
                    </ListItemButton>
                  </ListItem>
                )
            )}
          </List>
        </Box>
      </Modal>
    </>
  );
};
