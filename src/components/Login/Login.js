import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  /* console.log(from); */
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    setSuccess(false);
    setError("");
    const email = form.email.value;
    const password = form.password.value;

    /* console.log(email, password); */
    loginUser(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setSuccess(true);
        navigate(from, { replace: true });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  return (
    <div className="form-container">
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleLogin} className="form">
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" placeholder="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id=""
            placeholder="password"
            required
          />
        </div>
        <button className="button-style" type="submit">
          Login
        </button>
        {success ? <p>Succesfully Log in</p> : <p>{error}</p>}
        <p>
          <small>
            Already Have an Account? Please <Link to="/signup">Sign Up</Link>
          </small>
        </p>
        <p style={{ textAlign: "center" }}>or</p>
        <button className="button-style">Google Sign In</button>
      </form>
    </div>
  );
};

export default Login;
