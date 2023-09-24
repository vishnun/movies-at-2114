import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import Movies from "./components/Movies";
import {AuthProvider} from "./components/contexts/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/movies" element={<Movies/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;