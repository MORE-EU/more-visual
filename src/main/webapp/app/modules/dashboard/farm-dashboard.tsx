import Grid from "@mui/material/Grid";
import React from "react";

const Dashboard = () => {
    return (
        <>
        <Grid container sx={{height: "100vh"}}>
        <Grid sx={{height: "47rem", width: "100%", bgcolor: "white"}} xs={1.5}>

        </Grid>
        <Grid sx={{height: "20rem", width: "100%", bgcolor: "black"}} xs={10.5}>

        </Grid>
        <Grid xs={12} sx={{height: 200, width: "100%", bgcolor: "blue"}}>

        </Grid>
        </Grid>
        </>
    )
}

export default Dashboard;