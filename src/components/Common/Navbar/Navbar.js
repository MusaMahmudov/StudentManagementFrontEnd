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
  const { authServices } = useService();
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

  const handleLogout = () => {
    if (token) {
      // authServices.Logout(token);
      localStorage.removeItem("token");
      navigate("/SignIn");
    }
  };

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
          <div className="user-info">
            <h1>{userInformation.userName}</h1>
            <p class="sm:text-red-500 md:text-green-500 lg:text-blue-500 xl:text-purple-500">
              {userInformation.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
