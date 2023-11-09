import React, { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import adnsuLogo from "../../../assets/images/logo_adnsu.png";
import useService, { useStyles } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../../Contexts/Token-context";
import jwtDecode from "jwt-decode";
import {
  tokenRoleProperty,
  tokenUserNameProperty,
} from "../../../utils/TokenProperties";
import PersonIcon from "@mui/icons-material/Person";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { Box, Menu } from "@mui/material";
import { useCookies } from "react-cookie";
import ReorderIcon from "@mui/icons-material/Reorder";
import { removeExpireDate, removeToken } from "../../../utils/TokenServices";
const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies(["tokenCookie"]);
  const [userInformation, setUserInformation] = useState({
    userName: "",
    role: "",
  });
  const { token } = useContext(TokenContext);
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
      localStorage.clear();
      removeExpireDate();
      removeToken();
      navigate("/SignIn");
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <div className="header">
        <div className="container">
          <div className="left-navbar">
            <div className="logo">
              <img src={adnsuLogo} className="adnsu-logo" />
            </div>
            <div className="sidebar-toggle">
              <button className="toggle-button" onClick={onToggleSidebar}>
                <ReorderIcon />
              </button>
            </div>
          </div>
          <div className="right-navbar">
            <div className="user-info">
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
              >
                <span>
                  <PersonIcon sx={{ fontSize: 35, marginTop: 1 }} />
                </span>
                <span>
                  <h1>{userInformation.userName}</h1>
                  <p>{userInformation.role}</p>
                </span>
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    zIndex: "9999",
                  }}
                >
                  <Button
                    sx={{ padding: "10px 30px" }}
                    onClick={() => navigate("MyProfile")}
                  >
                    My Profile
                  </Button>
                  <Button
                    sx={{ padding: "10px 10px", fontSize: "13px" }}
                    onClick={() => navigate("ChangePassword")}
                  >
                    Change Password
                  </Button>
                  <Button
                    sx={{ padding: "10px 30px" }}
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </Button>
                </Box>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};
export default Navbar;
