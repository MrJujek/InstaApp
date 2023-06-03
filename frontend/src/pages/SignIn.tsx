import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    signIn(login, password);
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <div>
        <h1>Sign in</h1>
        <form className="signIn" action="POST" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="nickName">Nickname or email:</label>
          <input type="text" id="nickName" value={login} onChange={(e) => { setLogin(e.target.value) }} />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />
          <button className="signInButton" type="submit">Sign in</button>
        </form>

        <p>Don't have an account?</p>
        <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}

export default SignIn
