import React from "react";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

interface Movie {
    id?: number;
    name: string;
    rating?: string;
    description?: string;
}

const MovieCard = ({movie}: { movie: Movie }) => {
    return (
        <Card sx={{minWidth: 345}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://picsum.photos/200/300"
                    alt="Movie Card"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {movie.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {movie.rating}
                        <br/>
                        {movie.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
            </CardActions>
        </Card>
    );
}

export default MovieCard;