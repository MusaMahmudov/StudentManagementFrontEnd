import React from "react";
import Navbar from "../../Common/Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

const Layout = () => {
  return (
    <main>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <Outlet />
      </div>
    </main>
  );
};
export default Layout;
