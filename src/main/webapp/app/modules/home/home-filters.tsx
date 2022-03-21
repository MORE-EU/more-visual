import React, { Dispatch, SetStateAction, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, ClickAwayListener, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Popper, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';

export interface IHomeFilters {
  allFilters: any[];
  selected: any[];
  setSelected?: Dispatch<SetStateAction<any[]>>;
}

export const HomeFilters = (props: IHomeFilters) => {
  const { allFilters, selected } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleFilter = (filt) => {
    if(!selected.includes(filt)){
        props.setSelected(old => [...old, filt]);
    }else{
        props.setSelected(old => old.filter(item => item !== filt))
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      <Button variant='text' sx={{backgroundColor: '#e0e0e0', color: 'black'}} onClick={handleClick} startIcon={<FilterAltIcon color="action" />} fullWidth={true}>
          Select Filters
      </Button>
      <Popper className='popper-filter'placement='right' id={id} open={open} anchorEl={anchorEl}>
      <ClickAwayListener onClickAway={() => {setAnchorEl(null)}}>
        <Paper elevation={3} sx={{bgcolor: 'background.paper', width: '310px', overflowY: 'scroll', maxHeight: '350px'}}>
            {allFilters.map((filter,index) => (
        <Accordion key={`accordion-${index}`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant='subtitle2'>{filter.category}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {filter.values.map((filt,idx) => {
        const labelId = `checkbox-list-label-${idx}`;

        return (
          <ListItem
            key={`item-${filt}-${idx}`}
            disablePadding
          >
            <ListItemButton onClick={() => handleFilter(filt)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selected.indexOf(filt) !== -1}
                  tabIndex={-1}
                  disableRipple      
                  icon={<RadioButtonUncheckedIcon fontSize="small" />}
                  checkedIcon={<CircleIcon fontSize="small" />}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={filt} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
        </AccordionDetails>
      </Accordion>
            ))}
      </Paper>
      </ClickAwayListener>
      </Popper>
    </>
  );
};
