import { FormEvent, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [nickName, setNickName] = useState("");

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

        signUp(name, lastName, email, password, nickName);
    }

    return (
        <>
            <h1>Sign up</h1>
            <form className="signUp" action="POST" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" onChange={(e) => { setName(e.target.value) }} />
                <label htmlFor="lastName">Last name:</label>
                <input type="text" id="lastName" onChange={(e) => { setLastName(e.target.value) }} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />
                <label htmlFor="nickName">Nick name:</label>
                <input type="text" id="nickName" onChange={(e) => { setNickName(e.target.value) }} />
                <label htmlFor="password">Passowrd:</label>
                <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />

                <button className="signInButton" type="submit">Sign up</button>
            </form>
            <Link to="/signin">Sign In</Link>

            {showConfirm && (
                <div className="confirm">
                    <Link to={String(registerData.message).split("Confirm your account here:")[1]} target="_blank">Click here to confirm your account.</Link>
                </div>
            )}
        </>
    )
}

export default SignUp
