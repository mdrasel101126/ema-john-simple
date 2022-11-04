import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";
import logo from "../../images/Logo.svg";
import "./Header.css";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut();
  };
  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div>
        <NavLink to="/">Shop</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/inventory">Inventory</NavLink>
        <NavLink to="/about">about</NavLink>
        {user && user.uid ? (
          <button onClick={handleLogOut} style={{ marginLeft: "10px" }}>
            LogOut
          </button>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">SignUp</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
