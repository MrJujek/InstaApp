import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from './register'
import Login from './login'

function App() {
    return (
        <>
            <BrowserRouter>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App