import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import { AuthProvider } from '@/services/auth/context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import Profile from './components/Profile';
import UserProfile from "./components/UserProfile";
import ShowPost from "./components/ShowPost";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="*" element={
                                <>
                                    <Navbar />
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/user/:id" element={<UserProfile />} />
                                        <Route path="/post/:id" element={<ShowPost />} />
                                        <Route path="*" element={<h1>Not found</h1>} />
                                    </Routes>
                                </>
                            } />

                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}

export default App