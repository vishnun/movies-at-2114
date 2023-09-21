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

import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

// Define a type for the user profile
type UserProfile = {
    picture: string;
    name: string;
    email: string;
    // Add other profile properties if needed
};

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

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀</button>
            )}
        </div>
    );
}

export default App;
