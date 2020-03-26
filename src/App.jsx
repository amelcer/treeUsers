import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { getListedView } from "./db/api";
import Tree from "./Tree";

function App() {
    const [listedView, setListedView] = useState();

    useEffect(() => {
        getListedView().then(data => {
            setListedView(data);
        });
    }, []);

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
        >
            {listedView ? <Tree listedView={listedView} /> : <Typography> Loading... </Typography>}
        </Grid>
    );
}

export default App;
