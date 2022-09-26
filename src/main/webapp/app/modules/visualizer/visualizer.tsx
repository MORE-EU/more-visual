import * as React from 'react';
import {useEffect} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import {Redirect, useParams} from 'react-router-dom';
import {ChartContainer} from './chart/chart-container';
import VisControl from "app/modules/visualizer/vis-control";
import Toolkit from "app/modules/visualizer/tools/toolkit";
import HomeIcon from '@mui/icons-material/Home';
import {Breadcrumbs, Divider, Link, Typography} from "@mui/material";
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { getDataset, getWdFiles, setFolder, updateDatasetChoice } from '../store/visualizerSlice';

const mdTheme = createTheme();

export const Visualizer = () => {

  const { wdFiles, dataset, filter, queryResults } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();
  const  params: any = useParams();

  if (params.id === undefined) {
    useEffect(() => {
      dispatch(getWdFiles(params.folder));
    }, [params.folder]);
    return wdFiles.length !== 0 &&
      <div>
        <Redirect to={`${params.folder}/${wdFiles[0].substring(0, wdFiles[0].indexOf("."))}`}/>
      </div>;
  }

  useEffect(() => {
    wdFiles.length === 0 && dispatch(getWdFiles(params.folder));
    dispatch(setFolder(params.folder));
    dispatch(getDataset({folder: params.folder, id: params.id}));
  }, [params.id !== undefined]);

  useEffect(() => {
    wdFiles.length !== 0 && dispatch(updateDatasetChoice(wdFiles.indexOf(params.id + ".csv")));
  }, [wdFiles])

  return dataset !== null && <div>
    <ThemeProvider theme={mdTheme}>
      <Toolbar>
        <Box sx={{
          alignItems: 'center', display: 'flex',
          flexDirection: 'row'
        }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{display: 'flex', alignItems: 'center'}}
              color="inherit"
              href="/"
            >
              <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>
              Home
            </Link>
            <Link
              underline="hover"
              sx={{display: 'flex', alignItems: 'center'}}
              color="inherit"
            >

              {dataset.farmName}
            </Link>
            <Typography
              sx={{display: 'flex', alignItems: 'center'}}
              color="text.primary"
            >

              {dataset.formalName}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Toolbar>
      <Divider/>
      <CssBaseline/>
      <Box
        component="main"
        sx={{
          backgroundColor: "white",
          display: 'flex',
          flexDirection: 'row',
          overflow: 'auto',
        }}
      >
        <Box
          sx={{flexBasis: "20%"}}>
          <Paper elevation={1} sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
            <VisControl />
          </Paper>
        </Box>
        <Box
          sx={{maxWidth: open ? "70%" : "80%", pl: 2, flexGrow: 1}}>
          <Paper sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',

          }}>
            <ChartContainer />
          </Paper>
        </Box>
        <Toolkit />
      </Box>
    </ThemeProvider>
  </div>;
};

export default Visualizer;