import React from 'react';
import {Link} from 'react-router-dom';
import theme from "../theme";
import {ThemeProvider} from "@mui/material";
import Header from "./Header";

const Home = () => {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Header/>
                <h1>Home Page</h1>
                <Link to="/about">Go to About</Link>
            </div>
        </ThemeProvider>
    );
};

export default Home;
