import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  Button,
  Checkbox,
  ClickAwayListener,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  styled,
  Typography,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

export interface IHomeFilters {
  allFilters: any[];
  selected: any[];
  setSelected?: Dispatch<SetStateAction<any[]>>;
}

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowRightIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    height: "1rem"
  }
}));

export const HomeFilters = (props: IHomeFilters) => {
  const { allFilters, selected } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleFilter = (filt, filter) => {
    if (selected.length === 0) {
      props.setSelected(old => [...old, [filter.category, filt]]);
    } else {
      let bol = false;
      selected.map(sel => {
        if (sel.includes(filt)) {
          bol = true;
        }
      });
      if (bol === false) {
        props.setSelected(old => [...old, [filter.category, filt]]);
      } else {
        props.setSelected(old =>
          old.filter(item => {
            return item[1] !== filt;
          })
        );
      }
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      <Grid sx={{padding: 1}}>
      <Button
        variant="text"
        sx={{ bgcolor: '#e0e0e0', color: 'black', height: '1.5rem' }}
        onClick={handleClick}
        startIcon={<FilterAltIcon color="action" />}
        fullWidth
      >
        Select Filters
      </Button>
      </Grid>
      <Popper className="popper-filter" placement="bottom" id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener
          onClickAway={() => {
            setAnchorEl(null);
          }}
        >
          <Paper elevation={3} sx={{ bgcolor: 'background.paper', width: '310px', overflowY: 'scroll', maxHeight: '350px' }}>
            {allFilters.map((filter, index) => (
              <Accordion
                key={`accordion-${index}`}
                TransitionProps={{
                  unmountOnExit: true
                }}
              >
                <AccordionSummary aria-controls="panel1a-content">
                  <Typography variant="body1" sx={{ fontSize: 12, fontWeight: 900 }}>
                    {filter.category}
                  </Typography>
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
                            <ListItemText
                              disableTypography
                              id={labelId}
                              primary={
                                <Typography variant="body2" sx={{ fontSize: 12 }}>
                                  {filt}
                                </Typography>
                              }
                            />
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
