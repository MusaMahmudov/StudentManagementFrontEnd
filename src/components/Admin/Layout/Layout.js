import React from "react";
import Navbar from "../../Common/Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { TokenContext } from "../../../Contexts/Token-context";

const Layout = () => {
  return (
    <TokenContext.Provider>
      <main>
        <Navbar />
        <div className="main-container">
          <Sidebar />
          <Outlet />
        </div>
      </main>
    </TokenContext.Provider>
  );
};
export default Layout;
