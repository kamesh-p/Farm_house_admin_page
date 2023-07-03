import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Shop from "./components/Shop";

import UserManagement from "./components/User-Management";
import ProductManagement from "./components/Product-Management";

import Auth from "./components/Auth";
import { useSelector } from "react-redux";
import DashBoard from "./components/DashBoard";

const App = () => {
  const handleRouteChange = (route) => {
    console.log("Route changed:", route);
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <>
            <Header handleRouteChange={handleRouteChange} />
            <Routes>
              <Route path="/admin/dashboard" element={<DashBoard />} />
              <Route path="/admin/shop" element={<Shop />} />
              <Route
                path="/admin/user-management"
                element={<UserManagement />}
              />
              <Route
                path="/admin/product-management"
                element={<ProductManagement />}
              />
            </Routes>
          </>
        ) : (
          <Auth />
        )}
      </div>
    </Router>
  );
};

export default App;
