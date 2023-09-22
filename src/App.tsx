import React, {useState, useEffect} from 'react';
import {googleLogout, useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import logo from './2114-logo.png'
import theme from './theme';
import {
    AppBar,
    Box,
    Button,
    Container,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    ThemeProvider,
    Toolbar,
    Typography,
    ButtonProps, styled, SvgIcon, Icon,
} from "@mui/material";
import {grey} from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import GoogleIcon from '@mui/icons-material/Google';

const pages = ['Movies', 'Watch Now'];
const settings = ['Profile', 'Dashboard', 'Logout']

// import React, { useState, useEffect } from 'react';
// import { GoogleAuth } from 'google-identity-services';
// import { HashRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home';
// import About from './components/About';
// import DriveLogin from './components/DriveLogin'; // Import the Google Drive login component
// import DriveContent from './components/DriveContent'; // Import the Google Drive content component

//
// function App() {
//   const [accessToken, setAccessToken] = useState('');
//
//   useEffect(() => {
//     // Initialize GoogleAuth with your client ID
//     GoogleAuth.init({
//       client_id: '742371489419-9ueaesa8q5q7gnjumikkds0ah4o1fuu5.apps.googleusercontent.com',
//     });
//   }, []);
//
//   const handleDriveLogin = (token: string) => {
//     setAccessToken(token);
//   };
//
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/drive-login" element={<DriveLogin onSuccess={handleDriveLogin} />} />
//         <Route
//           path="/movies-at-2114/drive-content"
//           element={accessToken ? <DriveContent accessToken={accessToken} /> : <DriveLogin onSuccess={handleDriveLogin} />}
//         />
//       </Routes>
//     </Router>
//   );
// }
//
// export default App;


// Define a type for the user profile
type UserProfile = {
    picture: string;
    name: string;
    email: string;
    // Add other profile properties if needed
};
const LoginButton = styled(Button)<ButtonProps>(({theme}) => ({
    color: theme.palette.getContrastText(grey[50]),
    backgroundColor: grey[50],
    '&:hover': {
        backgroundColor: grey[50],
    },
}));

function App() {
    const [user, setUser] = useState<any>(null); // Use 'any' temporarily
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user && user.access_token) {
            axios
                .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data as UserProfile);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    // log out function to log the user out of Google and set the profile to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (setting: any) => {
        if (setting === 'Logout') {
            logOut();
        }
        setAnchorElUser(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Avatar alt="Movies 2114" src={logo}/>

                            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: {xs: 'block', md: 'none'},
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: {xs: 'flex', md: 'none'},
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                LOGO
                            </Typography>
                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                {pages.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>

                            {profile && (
                                <Box sx={{flexGrow: 0}}>

                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                            <Avatar alt="Remy Sharp" src={profile.picture}/>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{mt: '45px'}}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            )}
                            {!profile && (
                                <LoginButton startIcon={<GoogleIcon/>} variant="contained" color="primary"
                                        onClick={() => login()}>Sign in</LoginButton>
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
            <div>
                <h2>React Google Login</h2>
                <br/>
                <br/>
                {profile ? (
                    <div>
                        <img src={profile.picture} alt="user image"/>
                        <h3>User Logged in</h3>
                        <p>Name: {profile.name}</p>
                        <p>Email Address: {profile.email}</p>
                        <br/>
                        <br/>
                        <Button onClick={logOut}>Log out</Button>
                    </div>
                ) : (
                    <Button startIcon={<GoogleIcon/>} variant="contained" color="primary" onClick={() => login()}>Sign
                        in with Google</Button>
                )}
            </div>
        </ThemeProvider>
    );
}

export default App;
