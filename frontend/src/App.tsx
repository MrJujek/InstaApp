import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import { AuthProvider } from '@/services/auth/context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import Profile from './components/Profile';
import UserProfile from "./components/UserProfile";

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/user/:id" element={<UserProfile />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}

export default App