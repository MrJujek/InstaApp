import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [nickName, setNickName] = useState("")
  const [password, setPassword] = useState("")
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    signIn(nickName, password);
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
        <label htmlFor="nickName">Email:</label>
        <input type="nickName" id="nickName" value={nickName} onChange={(e) => { setNickName(e.target.value) }} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />
        <button className="signInButton" type="submit">Sign in</button>
      </form>
      <Link to="/signup">Sign Up</Link>
    </>
  )
}

export default SignIn
