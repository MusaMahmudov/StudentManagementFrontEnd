import React from "react";
import "./navbar.scss";
import adnsuLogo from "../../../assets/images/logo_adnsu.png";
import fullScreenIcon from "../../../assets/images/FullScreen-Icon.svg";

const Navbar = () => {
  const [isFullScreen, setFullScreen] = React.useState(false);

  const fullScreenHandle = () => {
    if (!isFullScreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setFullScreen(!isFullScreen);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="left-navbar">
          <img src={adnsuLogo} className="adnsu-logo" />
        </div>
        <div className="right-navbar">
          <div>
            <button onClick={fullScreenHandle}>
              <img src={fullScreenIcon} className="full-screen-logo" />
            </button>
          </div>
          <div className="user-info">
            <h1>Musa Mahmudov</h1>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
