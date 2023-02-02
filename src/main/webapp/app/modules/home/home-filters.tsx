import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  Button,
  Checkbox,
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
  useAutocomplete,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { useAppSelector, useAppDispatch } from '../store/storeConfig';
import { setAnchorEl, setInputValue, setSearch, setSearchResults, setSelected, setSelectedAcc } from '../store/homeSlice';
import { grey } from '@mui/material/colors';
import SimpleBar from 'simplebar-react';

const AccordionSummary = styled(props => <MuiAccordionSummary expandIcon={<ArrowRightIcon sx={{ fontSize: '0.9rem' }} />} {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      height: '1rem',
    },
  })
);

export const HomeFilters = () => {
  const { anchorEl, selectedAcc, allFilters, selected, search, inputValue, searchResults } = useAppSelector(state => state.home);
  const dispatch = useAppDispatch();

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleClick = event => {
    dispatch(setAnchorEl(anchorEl ? null : event.currentTarget));
  };

  useEffect(() => {
    !open && dispatch(setSelectedAcc(null));
    !open && dispatch(setInputValue(''));
  }, [open]);

  const handleAccordionClick = e => {
    selectedAcc !== e.target.innerText ? dispatch(setSelectedAcc(e.target.innerText)) : dispatch(setSelectedAcc(''));
    selectedAcc !== e.target.innerText && dispatch(setInputValue(''));
    dispatch(setSearch(allFilters.filter(fi => fi.category === e.target.innerText)[0].values));
    dispatch(setSearchResults(allFilters.filter(fi => fi.category === e.target.innerText)[0].values));
  };

  const handleFilter = (filt, filter) => {
    if (selected.length === 0) {
      dispatch(setSelected([...selected, [filter.category, filt]]));
    } else {
      let bol = false;
      selected.map(sel => {
        if (sel.includes(filt)) {
          bol = true;
        }
      });
      if (bol === false) {
        dispatch(setSelected([...selected, [filter.category, filt]]));
      } else {
        dispatch(setSelected(selected.filter(item => item[1] !== filt)));
      }
    }
  };

  const handleInputChange = (val, gopts) => {
    val !== '' ? dispatch(setSearchResults(gopts)) : dispatch(setSearchResults(search));
    val !== null && dispatch(setInputValue(val));
  };

  const { getInputProps, groupedOptions } = useAutocomplete({
    id: 'autocomplete',
    options: search,
    freeSolo: true,
    inputValue,
    onInputChange: (e, val) => handleInputChange(val, groupedOptions),
  });

  return (
    <>
      <Grid sx={{ padding: 1 }}>
        <Button
          variant="text"
          sx={{
            bgcolor: grey[400],
            color: 'black',
            height: '1.5rem',
            ':hover': { bgcolor: 'cadetblue' },
            alignItems: 'center',
            textTransform: 'none',
          }}
          onClick={handleClick}
          startIcon={<FilterAltIcon color="action" />}
          fullWidth
        >
          {!open ? 'Select Filters' : 'Close Filters'}
        </Button>
      </Grid>
      <Popper className="popper-filter" placement="right" id={id} open={open} anchorEl={anchorEl}>
        <Paper elevation={3} sx={{ bgcolor: 'background.paper', width: '310px', overflow: 'hidden', maxHeight: '350px' }}>
          <SimpleBar style={{ maxHeight: '350px' }}>
            {allFilters.map((filter, index) => (
              <Accordion
                key={`accordion-${index}`}
                TransitionProps={{
                  unmountOnExit: true,
                }}
                expanded={selectedAcc === filter.category}
                onChange={handleAccordionClick}
                disableGutters
                sx={{ backgroundColor: grey[400] }}
              >
                <AccordionSummary aria-controls="panel1a-content">
                  <Typography variant="subtitle1" sx={{ fontSize: 12, fontWeight: 900 }}>
                    {filter.category}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, pt: 1, textAlign: 'center', bgcolor: grey[300] }}>
                  {selectedAcc === filter.category && (
                    <input
                      style={{
                        width: '85%',
                        border: '1px solid',
                        borderColor: grey[400],
                        color: grey[700],
                        height: 30,
                        backgroundColor: grey[200],
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Type to search filter"
                      {...getInputProps()}
                    />
                  )}
                  <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: grey[300] }}>
                    {searchResults && searchResults.length !== 0 ? (
                      searchResults.map((filt, idx) => {
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
                      })
                    ) : (
                      <Typography variant="body2" sx={{ fontSize: 12 }}>
                        No results found
                      </Typography>
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </SimpleBar>
        </Paper>
      </Popper>
    </>
  );
};
