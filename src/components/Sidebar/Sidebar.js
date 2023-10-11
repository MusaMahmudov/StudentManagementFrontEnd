import { Navigate, useNavigate } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div id="sidebar">
      <div className="container">
        <div className="title">
          <p>Main menu</p>
        </div>
        <div className="sidebar-menu">
          <ul className="menu">
            <li className="submenu">
              <button onClick={() => navigate("/")}>Dashboard</button>
            </li>
            <li className="submenu">
              <button onClick={() => navigate("/Students")}>Students</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
