import { FormEvent, useState, useEffect } from "react";
import { useAuth } from "../services/auth/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    const { user, registerData, signUp } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (registerData.status) {
            console.log("msg", registerData.message);
            setShowConfirm(true);
        }
    }, [registerData]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        signUp(name, lastName, email, password);
    }

    return (
        <>
            <h1>Register</h1>
            <form className="signUp" action="POST" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" onChange={(e) => { setName(e.target.value) }} />
                <label htmlFor="lastName">Last name:</label>
                <input type="text" id="lastName" onChange={(e) => { setLastName(e.target.value) }} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />
                <label htmlFor="password">Passowrd:</label>
                <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />

                <button className="signInButton" type="submit">Sign up</button>
            </form>
            <Link to="/login">Log In</Link>

            {showConfirm && (
                <div className="confirm">
                    <Link to={String(registerData.message).split("Confirm your account here:")[1]} target="_blank">Click here to confirm your account.</Link>
                </div>
            )}
        </>
    )
}

export default Register