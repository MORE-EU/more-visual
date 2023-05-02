import React from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { useAppSelector } from 'app/modules/store/storeConfig';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Theme, useTheme } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const Features = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { selectedMeasures, dataset } = useAppSelector(state => state.visualizer);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Grid sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, width: '70%', textAlign: 'center', m: 'auto' }}>
      {selectedMeasures.map(mez => (
        <Grid key={`${mez}-selectedMes-pill`} sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
          <Grid
            sx={{
              width: '20%',
              backgroundColor: grey[300],
              display: 'flex',
              alignItems: 'center',
              borderRadius: 2,
              height: 'auto',
            }}
          >
            <Typography variant="subtitle1" fontSize={20} sx={{ p: 1 }}>
              {`${dataset.header[mez]}`}
            </Typography>
          </Grid>
          <Grid sx={{width: "80%"}}>
            <FormControl sx={{width: "100%"}}>
              {personName.length === 0 ? <InputLabel id="demo-multiple-chip-label">Select Features</InputLabel> : null}
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                displayEmpty
                value={personName}
                onChange={handleChange}
                renderValue={selected => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map(value => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map(name => (
                  <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Features;
