import React, {useState} from 'react';
import logo from '../2114-logo.png'
import theme from '../theme';
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
import GoogleIcon from '@mui/icons-material/Google';
import {Link} from "react-router-dom";
import {useAuth} from "./contexts/AuthContext";

const pages = ['Movies', 'Watch Now'];
const settings = ['Profile', 'Dashboard', 'Logout']

const LoginButton = styled(Button)<ButtonProps>(({theme}) => ({
    color: theme.palette.getContrastText(grey[50]),
    backgroundColor: grey[50],
    '&:hover': {
        backgroundColor: grey[50],
    },
}));

function Header() {
    const {authenticated, user, profile, signIn, signOut} = useAuth();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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
            signOut();
        }
        setAnchorElUser(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
                                <Avatar alt="Movies 2114" src={logo}/>
                            </Link>

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
                                            <Link to={`/${page.toLowerCase()}`}
                                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                                <Typography textAlign="center">{page}</Typography>
                                            </Link>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                {pages.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={() => window.location.href = `/${page.toLowerCase()}`}
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
                                             onClick={() => signIn()}>Sign in</LoginButton>
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        </ThemeProvider>
    );
}

export default Header;
