import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Common/Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import {
  TokenContext,
  TokenContextProvider,
} from "../../../Contexts/Token-context";
import {
  GetTokenFromCookie,
  getDecodedToken,
  getToken,
} from "../../../utils/TokenServices";

const Layout = () => {
  const token = getToken();
  const decodedToken = getDecodedToken();
  const [isOpen, setIsOpen] = useState(localStorage.getItem("sidebarToggle"));

  const handleToggleSidebar = () => {
    setIsOpen((prev) => !prev);
    localStorage.setItem("sidebarToggle", isOpen);
  };

  const contentWrapperStyle = (isOpen) => ({
    marginLeft: isOpen && window.innerWidth > 600 ? 210 : 0,
    transition: "margin 0.1s",
  });
  return (
    <TokenContext.Provider value={{ token, decodedToken }}>
      <main>
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <div className="main-container" style={contentWrapperStyle(isOpen)}>
          <Sidebar isOpen={isOpen} />
          <Outlet />
        </div>
      </main>
    </TokenContext.Provider>
  );
};
export default Layout;
