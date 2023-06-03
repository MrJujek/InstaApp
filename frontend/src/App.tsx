import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthProvider } from '@/contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Profile from './pages/Profile';
import UserProfile from "./pages/UserProfile";
import ShowPost from "./pages/ShowPost";
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