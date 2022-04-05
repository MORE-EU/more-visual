import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from '@mui/material';
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

  const handleFilter = (filt, filter) => {
    if(selected.length  === 0){
      props.setSelected(old => [...old, [filter.category,filt]]);
    }else{
    let bol = false;
    selected.map(sel => {
      if(sel.includes(filt)){
        bol = true;
      }
    })
    if (bol === false) {
      props.setSelected(old => [...old, [filter.category,filt]]);
    } else {
      props.setSelected(old => old.filter(item => {return item[1] !== filt}));
    }
    ;
  }
};

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      <Button
        variant="text"
        sx={{ backgroundColor: '#e0e0e0', color: 'black' }}
        onClick={handleClick}
        startIcon={<FilterAltIcon color="action" />}
        fullWidth={true}
      >
        Select Filters
      </Button>
      <Popper className="popper-filter" placement="bottom" id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener
          onClickAway={() => {
            setAnchorEl(null);
          }}
        >
          <Paper elevation={3} sx={{ bgcolor: 'background.paper', width: '310px', overflowY: 'scroll', maxHeight: '350px' }}>
            {allFilters.map((filter, index) => (
              <Accordion key={`accordion-${index}`}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography variant="subtitle2" sx={{fontSize: 12}}>{filter.category}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {filter.values.map((filt, idx) => {
                      const labelId = `checkbox-list-label-${idx}`;
                      return (
                        <ListItem key={`item-${filt}-${idx}`} disablePadding>
                          <ListItemButton onClick={() => handleFilter(filt, filter)} dense>
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={JSON.stringify(selected).includes(JSON.stringify([filter.category, filt]))}
                                tabIndex={-1}
                                disableRipple
                                icon={<RadioButtonUncheckedIcon fontSize="small" />}
                                checkedIcon={<CircleIcon fontSize="small" />}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText disableTypography id={labelId} primary={<Typography variant="body2" sx={{fontSize: 12}}>{filt}</Typography>} />
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
