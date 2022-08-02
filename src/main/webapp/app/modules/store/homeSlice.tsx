import {createSlice} from "@reduxjs/toolkit";
import { LatLng } from "leaflet";

const initialState = {
    fly: new LatLng(51.505, -0.09),
    bounds: {_southWest: {lat: 0, lng: 0}, _northEast: {lat: 0, lng: 0}},
    filSamples: [],
    allFilters: [],
    items: [],
    selected: [],
    selectedDir: "",
    anchorEl: null,
    selectedAcc: "",
    search: null,
    searchResults: null,
    inputValue: "",
    statSelect: "noOfTurbines",
    statCateg: [],
    chartCategYaxis: [],
    chartCateg: [],
    chartData: [],
    chartType: "column",
    option1: "AVG",
    option2: "power",
    option3: "country",
    option4: ""
}

const home = createSlice({
    name: "HomeState",
    initialState,
    reducers: {
        setFly(state, action) {
            state.fly = action.payload;
        },
        setBounds(state, action) {
            state.bounds = action.payload;
        },
        setFilSamples(state, action) {
            state.filSamples = action.payload;
        },
        setAllFilters(state, action) {
            state.allFilters = action.payload;
        },
        setItems(state, action) {
            state.items = action.payload;
        },
        setSelected(state, action) {
            state.selected = action.payload;
        },
        setSelectedDir(state, action) {
            state.selectedDir = action.payload;
        },
        setAnchorEl(state, action) {
            state.anchorEl = action.payload;
        },
        setSelectedAcc(state, action) {
            state.selectedAcc = action.payload;
        },
        setSearch(state, action) {
            state.search = action.payload;
        },
        setSearchResults(state, action) {
            state.searchResults = action.payload;
        },
        setInputValue(state, action) {
            state.inputValue = action.payload;
        },
        setStatSelect(state, action) {
            state.statSelect = action.payload;
        },
        setStatCateg(state, action) {
            state.statCateg = action.payload;
        },
        setChartCategYaxis(state, action) {
            state.chartCategYaxis = action.payload;
        },
        setChartCateg(state, action) {
            state.chartCateg = action.payload;
        },
        setChartData(state, action) {
            state.chartData = action.payload;
        },
        setChartType(state, action) {
            state.chartType = action.payload;
        },
        setOption1(state, action) {
            state.option1 = action.payload;
        },
        setOption2(state, action) {
            state.option2 = action.payload;
        },
        setOption3(state, action) {
            state.option3 = action.payload;
        },
        setOption4(state, action) {
            state.option4 = action.payload;
        },
    }
});

export const {setFly, setBounds, setAllFilters, setFilSamples, 
setItems, setSelected, setSelectedDir, setAnchorEl, setInputValue, 
setSearch, setSearchResults, setSelectedAcc, setStatCateg, setStatSelect,
setChartCateg, setChartCategYaxis, setChartData, setChartType, setOption1,
setOption2, setOption3, setOption4 } = home.actions;
export default home.reducer;