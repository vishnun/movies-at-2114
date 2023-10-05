import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import Movies from "./components/Movies";
import {AuthProvider} from "./components/contexts/AuthContext";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {decrypt, encrypt} from "./components/modules/Encryption";
import {loadGoogleLibraries} from "./loadGoogleLibraries";
import {getUserEnteredPasscode, saveUserEnteredPasscode} from "./components/modules/LocalStorageManager";

function App() {
    const [open, setOpen] = React.useState(false);
    const [authorizedAccess, setAuthorizedAccess] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const handleSubmit = () => {
        setOpen(false);
        let encryptedTest = "U2FsdGVkX1/BJporcXlmP2AmVJhbHbu2raOcK/H9HLw=";
        const encryptedInputValue = encrypt(inputValue, 'magic-masala');
        if (decrypt(encryptedInputValue, 'magic-masala') === decrypt(encryptedTest, 'magic-masala')) {
            setAuthorizedAccess(true);
            setOpen(false);
            saveUserEnteredPasscode(inputValue);
            loadGoogleLibraries();
        } else {
            setAuthorizedAccess(false);
            setOpen(true);
        }
    }

    useEffect(() => {
        const savedUserEnteredSecret = getUserEnteredPasscode();
        if (savedUserEnteredSecret) {
            let encryptedTest = "U2FsdGVkX1/BJporcXlmP2AmVJhbHbu2raOcK/H9HLw=";
            const encryptedInputValue = encrypt(savedUserEnteredSecret, 'magic-masala');
            if (decrypt(encryptedInputValue, 'magic-masala') === decrypt(encryptedTest, 'magic-masala')) {
                setOpen(false);
                setAuthorizedAccess(true)
            } else {
                setOpen(true);
                setAuthorizedAccess(false)
            }
        } else {
            setOpen(true);
        }
    }, []);

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    }

    return (
        (authorizedAccess) ? (
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/movies" element={<Movies/>}/>
                    </Routes>
                </Router>
            </AuthProvider>
        ) : (
            <Dialog open={open}>
                <DialogTitle>Secret Passcode Required</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To enter this website, enter the secret passcode.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="secret-passcode"
                        label="Secret Passcode"
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
    );
}

export default App;