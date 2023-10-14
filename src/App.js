import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Common/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AdminDashboard from "./components/Admin/AdminDahboard/AdminDashboard";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import StudentListAdmin from "./components/Admin/StudentListAdmin/StudentListAdmin";
import StudentDetailsAdmin from "./components/Admin/StudentDetailsAdmin/StudentDetailsAdmin";
import UpdateStudentAdmin from "./components/Admin/StudentUpdateAdmin/StudentUpdateAdmin";
import CreateStudentAdmin from "./components/Admin/StudentCreateAdmin/StudentCreateAdmin";
import DeleteStudentAdmin from "./components/Admin/StudentDeleteAdmin/StudentDeteleAdmin";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import SignIn from "./components/LoginPage/LoginPage";

import Layout from "./components/Admin/Layout/Layout";
import { useEffect } from "react";
import TeacherListAdmin from "./components/Admin/TeaherListAdmin/TeacherListAdmin";
import TeacherDetailsAdmin from "./components/Admin/TeacherDetailsAdmin/TeacherDetailsAdmin";
import CreateTeacherAdmin from "./components/Admin/CreateTeacherAdmin/CreateTeacherAdmin";
import DeleteTeacherAdmin from "./components/Admin/TeacherDeleteAdmin/TeacherDeteleAdmin";
import UpdateTeacherAdmin from "./components/Admin/TeacherUpdateAdmin/TeacherUpdateAdmin";
import GroupListAdmin from "./components/Admin/GroupListAdmin/GroupListAdmin";
import GroupDetailsAdmin from "./components/Admin/GroupDetailsAdmin/GroupDetailsAdmin";

function App() {
  const queryClient = new QueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "") {
      navigate("/AdminDashboard");
    }
  }, []);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
            <Route path="Students" element={<StudentListAdmin />}></Route>
            <Route
              path="Students/:Id"
              element={<StudentDetailsAdmin />}
            ></Route>
            <Route
              path="Students/UpdateStudent/:Id"
              element={<UpdateStudentAdmin />}
            ></Route>
            <Route
              path="Students/DeleteStudent/:Id"
              element={<DeleteStudentAdmin />}
            ></Route>
            <Route
              path="Students/CreateStudent"
              element={<CreateStudentAdmin />}
            ></Route>

            <Route path="Teachers" element={<TeacherListAdmin />}></Route>
            <Route
              path="Teachers/:Id"
              element={<TeacherDetailsAdmin />}
            ></Route>
            <Route
              path="Teachers/CreateTeacher"
              element={<CreateTeacherAdmin />}
            ></Route>
            <Route
              path="Teachers/DeleteTeacher/:Id"
              element={<DeleteTeacherAdmin />}
            ></Route>
            <Route
              path="Teachers/UpdateTeacher/:Id"
              element={<UpdateTeacherAdmin />}
            ></Route>
            <Route path="Groups" element={<GroupListAdmin />}></Route>
            <Route path="Groups/:Id" element={<GroupDetailsAdmin />}></Route>
            <Route
              path="Groups/CreateGroup"
              element={<GroupListAdmin />}
            ></Route>
            <Route path="Groups" element={<GroupListAdmin />}></Route>
          </Route>

          <Route path="*" element={<ErrorPage />} />

          <Route path="/SignIn" element={<SignIn />}></Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
