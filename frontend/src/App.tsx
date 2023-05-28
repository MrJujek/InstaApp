import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register'
import Login from './components/Login'
import { AuthProvider } from '@/services/auth/context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';

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
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}

export default App