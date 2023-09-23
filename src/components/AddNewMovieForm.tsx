// CreateRecordForm.js
import React, {useState} from 'react';
import {Button, Container, Grid, Rating, Stack, TextField, Typography} from "@mui/material";

interface FormProps {
    formName?: string;
    onSubmit?: (event: any, data: object) => void;
}

const AddNewMovieForm: React.FC<FormProps> = ({onSubmit, formName}) => {
    const [formData, setFormData] = useState({
        // Initialize form fields and their default values
        name: '',
        description: '',
        // Add more fields as needed
    });

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e: any) => {
        onSubmit && onSubmit(e, formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                {formName && (
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h2">
                            {formName}
                        </Typography>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Typography component="legend">Movie Name</Typography>
                    <TextField
                        required
                        id="movie-name"
                        name="movie-name"
                        // label="Movie Name"
                        defaultValue={formData.name}
                        variant="standard"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography component="legend">Your Rating</Typography>
                    <Stack spacing={1}>
                        <Rating onChange={handleInputChange} name="your-rating" defaultValue={2.5}
                                precision={0.5}/>
                    </Stack>
                </Grid>
                {/* Add more form fields here */}
                <Grid item xs={12}>
                    <Button variant="contained" type='submit'>Create Record</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default AddNewMovieForm;
