import React from 'react';
import Header from "./Header";
import AddNewMovieForm from "./AddNewMovieForm";
import {Container, Divider, Grid, List, ListItem, Typography} from "@mui/material";
import {useGoogleSheets} from "./contexts/GoogleSheetsContext";
import MovieCard from "./MovieCard";

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
    const {moviesData} = useGoogleSheets();

    const movies = moviesData("test", "test");
    return (
        <div>
            <Header/>
            <Container maxWidth="sm">
                <Typography variant="h3" component="h1">
                    Movies
                </Typography>

                <AddNewMovieForm formName={"Add a New Movie"} onSubmit={onSubmit}/>
                <Divider> Movies </Divider>
                <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                    {movies.map((movie: any) => (
                        <ListItem>
                            <MovieCard movie={movie}/>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </div>
    );
};

export default Movies;
