import { Navigate, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GridViewIcon from "@mui/icons-material/GridView";
import SchoolIcon from "@mui/icons-material/School";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import GroupsIcon from "@mui/icons-material/Groups";
import ListIcon from "@mui/icons-material/List";
import BusinessIcon from "@mui/icons-material/Business";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import QuizIcon from "@mui/icons-material/Quiz";
import PersonIcon from "@mui/icons-material/Person";
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
              <GridViewIcon className="left-icon" />
              <button onClick={() => navigate("/AdminDashboard")}>
                Dashboard
              </button>
              <ArrowForwardIosIcon className="right-icon" />
            </li>
            <li className="submenu">
              <SchoolIcon className="left-icon" />
              <button onClick={() => navigate("/Students")}>Students</button>
              <ArrowForwardIosIcon className="right-icon" />
            </li>
            <li className="submenu">
              <CastForEducationIcon className="left-icon" />

              <button onClick={() => navigate("/Teachers")}>Teachers</button>
              <ArrowForwardIosIcon className="right-icon" />
            </li>
            <li className="submenu">
              <GroupsIcon className="left-icon" />

              <button onClick={() => navigate("/Groups")}>Groups</button>
              <ArrowForwardIosIcon className="right-icon" />
            </li>
            <li className="submenu">
              <ListIcon className="left-icon" />

              <button onClick={() => navigate("/ExamTypes")}>ExamTypes</button>
              <ArrowForwardIosIcon className="right-icon" />
            </li>
            <li className="submenu">
              <BusinessIcon className="left-icon" />

              <button onClick={() => navigate("/Faculties")}>Faculties</button>
              <ArrowForwardIosIcon className="right-icon" />
            </li>
            <li className="submenu">
              <MenuBookIcon className="left-icon" />

              <button onClick={() => navigate("/Subjects")}>Subjects</button>
              <ArrowForwardIosIcon className="right-icon" />
            </li>
            <li className="submenu">
              <AccessibilityIcon className="left-icon" />

              <button onClick={() => navigate("/TeacherRoles")}>
                Teacher Roles
              </button>
              <ArrowForwardIosIcon className="right-icon" />
            </li>
            <li className="submenu">
              <QuizIcon className="left-icon" />
              <button onClick={() => navigate("/Exams")}>Exams</button>
              <ArrowForwardIosIcon className="right-icon" />
            </li>

            <li className="submenu">
              <QuizIcon className="left-icon" />
              <button onClick={() => navigate("/GroupSubjects")}>
                Groups' subjects
              </button>
              <ArrowForwardIosIcon className="right-icon" />
            </li>
            <li className="submenu">
              <PersonIcon className="left-icon" />
              <button onClick={() => navigate("/Users")}>Users</button>
              <ArrowForwardIosIcon className="right-icon" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
