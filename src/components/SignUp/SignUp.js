import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";
import "./SignUp.css";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { createUser } = useContext(AuthContext);
  const handleSignUP = (e) => {
    setSuccess(false);
    setError("");
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    /*  console.log(name, email, password, confirmPassword); */
    if (password.length < 6) {
      alert("Password should be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password Not Match");
      return;
    }
    createUser(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setSuccess(true);
        form.reset();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        setSuccess(false);
        // ..
      });
  };
  return (
    <div className="form-container">
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <form onSubmit={handleSignUP} className="form">
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="" placeholder="name" />
        </div>
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
        <div className="form-control">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id=""
            placeholder="confirm password"
            required
          />
        </div>
        <button className="button-style" type="submit">
          Sign Up
        </button>
        {success ? <p>User Sign in Successfully</p> : <p>{error}</p>}
        <p>
          <small>
            Already Have an Account? Please <Link to="/login">Login</Link>
          </small>
        </p>
        <p style={{ textAlign: "center" }}>or</p>
        <button className="button-style">Google Sign In</button>
      </form>
    </div>
  );
};

export default SignUp;
