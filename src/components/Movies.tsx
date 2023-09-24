import React from 'react';
import Header from "./Header";
import AddNewMovieForm from "./AddNewMovieForm";
import {Container, Grid, Typography} from "@mui/material";

const onSubmit = (event: any, data: object) => {
    event.preventDefault();
    // Perform AJAX POST request to create a record with formData
    // You can use libraries like Axios or the built-in fetch API

    // Example using fetch:
    fetch('#', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response from the server (e.g., success message, error)
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

const Movies = () => {
    return (
        <div>
            <Header/>
            <Container maxWidth="sm">
                <Typography variant="h3" component="h1">
                    Movies
                </Typography>

                <AddNewMovieForm formName={"Add a New Movie"} onSubmit={onSubmit}/>
            </Container>
        </div>
    );
};

export default Movies;
