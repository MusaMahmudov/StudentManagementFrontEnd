import { Navigate, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
              <button onClick={() => navigate("/AdminDashboard")}>
                Dashboard
              </button>
              <ArrowForwardIosIcon />
            </li>
            <li className="submenu">
              <button onClick={() => navigate("/Students")}>Students</button>
              <ArrowForwardIosIcon />
            </li>
            <li className="submenu">
              <button onClick={() => navigate("/Teachers")}>Teachers</button>
              <ArrowForwardIosIcon />
            </li>
            <li className="submenu">
              <button onClick={() => navigate("/Groups")}>Groups</button>
              <ArrowForwardIosIcon />
            </li>
            <li className="submenu">
              <button onClick={() => navigate("/ExamTypes")}>ExamTypes</button>
              <ArrowForwardIosIcon />
            </li>
            <li className="submenu">
              <button onClick={() => navigate("/Faculties")}>Faculties</button>
              <ArrowForwardIosIcon />
            </li>
            <li className="submenu">
              <button onClick={() => navigate("/Subjects")}>Subjects</button>
              <ArrowForwardIosIcon />
            </li>
            <li className="submenu">
              <button onClick={() => navigate("/TeacherRoles")}>
                Teacher Roles
              </button>
              <ArrowForwardIosIcon />
            </li>
            <li className="submenu">
              <button onClick={() => navigate("/Exams")}>Exams</button>
              <ArrowForwardIosIcon />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
