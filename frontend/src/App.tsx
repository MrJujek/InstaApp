import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { AuthProvider } from '@/contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Profile from './pages/Profile';
import UserProfile from "./pages/UserProfile";
import ShowPost from "./pages/ShowPost";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="*" element={
                                <>
                                    <Navbar />
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/createPost" element={<CreatePost />} />
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