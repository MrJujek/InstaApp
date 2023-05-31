import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../services/auth/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    signIn(email, password);
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <h1>Login</h1>
      <form className="signIn" action="POST" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />
        <button className="signInButton" type="submit">Sign in</button>
      </form>
      <Link to="/register">Sign Up</Link>
    </>
  )
}

export default Login
