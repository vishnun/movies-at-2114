import React from 'react';
import theme from "../theme";
import {Container, Grid, ThemeProvider, Typography} from "@mui/material";
import Header from "./Header";
import EncryptionExample from "./examples/EncryptionExample";
import CreateSpreadsheetExample from "./examples/CreateSpreadsheetExample";

const Home = () => {
    return (
        <div>
            <Header/>
            <Container maxWidth='md'>
                <EncryptionExample/>
                <CreateSpreadsheetExample/>
            </Container>
        </div>
    );
};

export default Home;
