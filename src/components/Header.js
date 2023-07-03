import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import logo from "../Assert/logo-modified.png";

const Header = ({ handleRouteChange }) => {
  const dispatch = useDispatch();

  const handleClick = (route) => {
    handleRouteChange(route);
  };

  const logOutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header>
      <nav>
        <div className="header-display-container">
          <div className="header-left">
            <img src={logo} alt="Logo" className="logo" />
            <h1 className="company-name">FarmHouse</h1>
          </div>
          <div className="header-right">
            <ul>
              <li>
                <Link to="/admin/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link
                  to="/admin/product-management"
                  onClick={() => handleClick("/admin/product-management")}
                >
                  Product Management
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/shop"
                  onClick={() => handleClick("/admin/shop")}
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/user-management"
                  onClick={() => handleClick("/admin/user-management")}
                >
                  User Management
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/logout"
                  onClick={logOutHandler}
                  className="logout-link"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
