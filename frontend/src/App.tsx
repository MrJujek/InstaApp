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
import { ConfigProvider, theme } from 'antd';
import { useTheme } from '@/contexts/ThemeContext';

function App() {
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const { isDarkTheme } = useTheme();

    return (
        <div id="theme" style={{ backgroundColor: isDarkTheme ? "#141414" : "#ffffff" }}>
            <ConfigProvider
                theme={{
                    algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
                }}>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route element={<PrivateRoute />}>
                                <Route path="*" element={
                                    <>
                                        <Navbar />
                                        <main className="mainApp">
                                            <Routes>
                                                <Route path="/" element={<Home />} />
                                                <Route path="/profile" element={<Profile />} />
                                                <Route path="/createPost" element={<CreatePost />} />
                                                <Route path="/user/:id" element={<UserProfile />} />
                                                <Route path="/post/:id" element={<ShowPost />} />
                                                <Route path="*" element={<h1>Not found</h1>} />
                                            </Routes>
                                        </main>
                                    </>
                                } />
                            </Route>
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </ConfigProvider>
        </div>
    )
}

export default App