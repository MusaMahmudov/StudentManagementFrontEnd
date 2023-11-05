import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Common/Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import {
  TokenContext,
  TokenContextProvider,
} from "../../../Contexts/Token-context";
import { getDecodedToken, getToken } from "../../../utils/GetToken";
import jwtDecode from "jwt-decode";
import SignIn from "../../LoginPage/LoginPage";
import ErrorPage from "../../ErrorPage/ErrorPage";

const Layout = () => {
  const token = getToken();
  const decodedToken = getDecodedToken();
  // if (!token) {
  //   <Navigate to={<SignIn />} />;
  // }
  // const decodedToken = token ? jwtDecode(token) : null;

  // if (decodedToken) {
  //   if (
  //     decodedToken[
  //       "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  //     ] !== "Admin"
  //   ) {
  //     <Navigate to={<ErrorPage />} />;
  //   }
  // }

  return (
    <TokenContext.Provider value={{ token, decodedToken }}>
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
