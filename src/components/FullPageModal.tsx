import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

interface FullPageModalProps {
    title?: string;
    contextText?: string;
    inputFieldOptions: {
        id: string;
        label: string;
    };
    open?: boolean;
    handleSubmit?: () => void;
    handleInputChange?: (event: any) => void;
}

const FullPageModal: React.FC<FullPageModalProps> = (
    {
        title,
        contextText,
        inputFieldOptions,
        open,
        handleInputChange,
        handleSubmit
    }) => {

    open = open || false;
    title = title || 'Welcome';
    contextText = contextText || 'Enter your input below.';
    const defaultInputFieldOptions = {
        id: 'full-page-dialog-input-field',
        label: 'Enter your input here'
    }
    inputFieldOptions = {...defaultInputFieldOptions, ...inputFieldOptions}

    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {contextText}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id={inputFieldOptions.id}
                    label={inputFieldOptions.label}
                    fullWidth
                    variant="standard"
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FullPageModal;