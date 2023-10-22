import React, { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import adnsuLogo from "../../../assets/images/logo_adnsu.png";
import fullScreenIcon from "../../../assets/images/FullScreen-Icon.svg";
import useService from "../../../hooks";
import { useMutation } from "react-query";
import { getToken } from "../../../utils/GetToken";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../../Contexts/Token-context";
import jwtDecode from "jwt-decode";
import {
  tokenRoleProperty,
  tokenUserNameProperty,
} from "../../../utils/TokenProperties";

const Navbar = () => {
  const navigate = useNavigate();
  // const [isFullScreen, setFullScreen] = React.useState(false);
  const [userInformation, setUserInformation] = useState({
    userName: "",
    role: "",
  });
  const { token } = useContext(TokenContext);

  console.log(userInformation);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserInformation({
        userName: decodedToken[tokenUserNameProperty],
        role: decodedToken[tokenRoleProperty],
      });
    }
  }, []);
  console.log(userInformation);

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem("token");
      navigate("/SignIn");
    }
  };
  // const fullScreenHandle = () => {
  //   if (!isFullScreen) {
  //     if (document.documentElement.requestFullscreen) {
  //       document.documentElement.requestFullscreen();
  //     }
  //   } else {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //     }
  //   }
  //   setFullScreen(!isFullScreen);
  // };

  return (
    <div className="header">
      <div className="container">
        <div className="left-navbar">
          <img src={adnsuLogo} className="adnsu-logo" />
        </div>
        <div className="right-navbar">
          <div>
            <button onClick={() => handleLogout()}>Logout</button>
          </div>
          {/* <div>
            <button onClick={fullScreenHandle}>
              <img src={fullScreenIcon} className="full-screen-logo" />
            </button>
          </div> */}
          <div className="user-info">
            <h1>{userInformation.userName}</h1>
            <p>{userInformation.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
