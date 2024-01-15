import React, { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Grid from '@mui/material/Grid';
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import {SelectChangeEvent}  from "@mui/material/Select";
import Select from "@mui/material/Select";
import LogoutIcon from '@mui/icons-material/Logout';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { Link, useHistory } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/modules/store/storeConfig";
import { updateDatasetChoice, resetFetchData } from "app/modules/store/visualizerSlice";

interface ISelectedDataset {
    schema: string;
    table: string;
}

const defaultSelectedDataset: ISelectedDataset = {
    schema: '',
    table: '',
}

const VisControlDatasetSelection = () => {
    const [selectedDataset, setSelectedDataset] = useState<ISelectedDataset>(defaultSelectedDataset);

    const dispatch = useAppDispatch();
    const { farmMeta, datasetChoice} = useAppSelector(state => state.visualizer);
    const history = useHistory();
    
    useEffect(() => {
        farmMeta && setSelectedDataset(prevDataset =>
            {
                return {...prevDataset,
                    schema: farmMeta.data[datasetChoice].schema,
                    table: farmMeta.data[datasetChoice].id
                }
            });
    },[]);

    useEffect(() => {
        if (selectedDataset.table) {
            const idx = farmMeta.data.findIndex(file => file.schema === selectedDataset.schema && file.id === selectedDataset.table);
            if (datasetChoice !== idx)
                dispatch(updateDatasetChoice(idx));
        }
    },[selectedDataset.table]);

    const schemaSelectChange = (event: SelectChangeEvent) => {
        const {name, value} = event.target;
        setSelectedDataset(prevDataset => (
            {...prevDataset, [name]: value}                                                                                                                                                                                                                                                       
        ));
    }

    const tableChange = (name) => {
        setSelectedDataset(prevDataset => (
            {...prevDataset, table: name}
        ));
    }

    const handleDataset = (dataset) => {
        const idx = farmMeta.data.findIndex(file => file.schema === dataset.schema && file.id === dataset.id);
        if (datasetChoice !== idx) {
            dispatch(updateDatasetChoice(idx));
        }
    };

    return (
        <Grid sx={{width: "100%", height: "100%"}} >
            <Grid sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: 1, }} >
                <Typography variant="h6" gutterBottom>
                    Upload Dataset
                </Typography>
                <Grid item>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="schemaInput">
                            Schema
                        </InputLabel>
                        <Select labelId="schemaInput" id="schemaSelectInput" name="schema" label="schema" value={selectedDataset.schema} onChange={schemaSelectChange}>
                            {farmMeta.data.map(file => file.schema).filter(
                            (schema, idx, curr_schema) => curr_schema.indexOf(schema) === idx).map(schema => 
                            (<MenuItem key={schema} value={schema}>{schema}</MenuItem>)
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" gutterBottom>
                        Tables
                    </Typography>
                    <List disablePadding dense>
                    {farmMeta.data.filter(file => file.schema === selectedDataset.schema && !file.isConfiged).map((file, idx) => (
                        <ListItemButton
                            key={idx}
                            selected={farmMeta.data[datasetChoice].id === file.id && farmMeta.data[datasetChoice].schema === file.schema}
                            onClick={() => {tableChange(file.id)}}
                            divider
                        >
                            <TableChartOutlinedIcon />
                            <ListItemText primary={`${file.id}`} />
                            
                        </ListItemButton>
                    ))}
                    </List>
                </Grid>
            </Grid>
            <Grid>
                {(farmMeta.data.filter( file => file.isConfiged).length > 0) && 
                    <Typography variant="h6" gutterBottom>
                        Configured Datasets
                    </Typography>
                }
                <List disablePadding dense>
                    {farmMeta.data.filter( file => file.isConfiged).map((file, idx) => (
                    <ListItemButton
                        key={idx}
                        selected={farmMeta.data[datasetChoice].id === file.id && farmMeta.data[datasetChoice].schema === file.schema}
                        component={Link}
                        to={`/visualize/${file.schema}/${file.id}`}
                        onClick={() => {
                            handleDataset(file);
                        }}
                        divider
                    >
                        <ListItemText primary={`${file.id}`} />
                    </ListItemButton>
                    ))}
                    <ListItemButton key={'close-connection-list-button-sd'}
                        component={Link}
                        to={`/visualize`}
                        onClick={() => {dispatch(resetFetchData());}}
                    >
                        <ListItemText primary={`close connection`} sx={ {display: { xs: 'none', md: 'block' }}} />
                        <LogoutIcon />
                    </ListItemButton>
                </List>
            </Grid>
        </Grid>
    );
}

export default VisControlDatasetSelection;