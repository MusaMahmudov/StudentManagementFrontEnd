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
import UpdateGroupAdmin from "./components/Admin/GroupUpdateAdmin/GroupUpdateAdmin";
import CreateGroupAdmin from "./components/Admin/CreateGroupAdmin/CreateGroupAdmin";
import DeleteGroupAdmin from "./components/Admin/DeleteGroupAdmin/DeleteGroupAdmin";
import ExamTypesListAdmin from "./components/Admin/ExamTypesAdmin/ExamTypesLIstAdmin/ExamTypesListAdmin";
import CreateExamType from "./components/Admin/ExamTypesAdmin/ExamTypeCreateAdmin/ExamTypeCreateAdmin";
import DeleteExamTypeAdmin from "./components/Admin/ExamTypesAdmin/ExamTypeDeleteAdmin/ExamTypeDeleteAdmin";
import UpdateExamTypeAdmin from "./components/Admin/ExamTypesAdmin/ExamTypeUpdateAdmin/ExamTypeUpdateAdmin";
import ExamTypeDetailsAdmin from "./components/Admin/ExamTypesAdmin/ExamTypeDetailsAdmin/ExamTypeDetailsAdmin";
import FacultyListAdmin from "./components/Admin/FacultyAdmin/FacultyListAdmin/FacultyListAdmin";
import FacultyDetailsAdmin from "./components/Admin/FacultyAdmin/FacultyDetailsAdmin/FacultyDetailsAdmin";
import CreateFaculty from "./components/Admin/FacultyAdmin/FacultyCreateAdmin/FacultyCreateAdmin";
import UpdateFacultyAdmin from "./components/Admin/FacultyAdmin/FacultyUpdateAdmin/FacultyUpdateAdmin";
import DeleteFacultyAdmin from "./components/Admin/FacultyAdmin/FacultyDeleteAdmin/FacultyDeleteAdmin";
import SubjectListAdmin from "./components/Admin/SubjectAdmin/SubjectListAdmin/SubjectListAdmin";
import CreateSubjectAdmin from "./components/Admin/SubjectAdmin/SubjectCreateAdmin/SubjectCreateAdmin";
import SubjectDetailsAdmin from "./components/Admin/SubjectAdmin/SubjectDetailsAdmin/SubjectDetailsAdmin";
import UpdateSubjectAdmin from "./components/Admin/SubjectAdmin/SubjectUpdateAdmin/SubjectUpdateAdmin";
import DeleteSubjectAdmin from "./components/Admin/SubjectAdmin/SubjectDeleteAdmin/SubjectDeleteAdmin";
import TeacherRoleListAdmin from "./components/Admin/TeacherRoleAdmin/TeacherRoleListAdmin/TeacherRoleListAdmin";
import CreateTeacherRoleAdmin from "./components/Admin/TeacherRoleAdmin/TeacherRoleCreateAdmin/TeacherRoleCreateAdmin";
import UpdateTeacherRoleAdmin from "./components/Admin/TeacherRoleAdmin/TeacherRoleUpdateAdmin.js/TeacherRoleUpdateAdmin";
import TeacherRoleDetailsAdmin from "./components/Admin/TeacherRoleAdmin/TeacherRoleDetailsAdmin/TeacherRoleDetailsAdmin";
import DeleteTeacherRoleAdmin from "./components/Admin/TeacherRoleAdmin/TeacherRoleDeleteAdmin/TeacherRoleDeleteAdmin";
import ExamListAdmin from "./components/Admin/ExamAdmin/ExamListAdmin/ExamListAdmin";
import CreateExam from "./components/Admin/ExamAdmin/ExamCreateAdmin/ExamCreateAdmin";
import ExamDetailsAdmin from "./components/Admin/ExamAdmin/ExamDetailsAdmin/ExamDetailsAdmin";
import ExamDeleteAdmin from "./components/Admin/ExamAdmin/ExamDeleteAdmin/ExamDeleteAdmin";
import UpdateExamAdmin from "./components/Admin/ExamAdmin/ExamUpdateAdmin/ExamUpdateAdmin";

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
              element={<CreateGroupAdmin />}
            ></Route>
            <Route
              path="Groups/UpdateGroup/:Id"
              element={<UpdateGroupAdmin />}
            ></Route>
            <Route
              path="Groups/DeleteGroup/:Id"
              element={<DeleteGroupAdmin />}
            ></Route>
            <Route path="ExamTypes" element={<ExamTypesListAdmin />}></Route>
            <Route
              path="ExamTypes/CreateExamType"
              element={<CreateExamType />}
            ></Route>
            <Route
              path="ExamTypes/DeleteExamType/:Id"
              element={<DeleteExamTypeAdmin />}
            ></Route>
            <Route
              path="ExamTypes/UpdateExamType/:Id"
              element={<UpdateExamTypeAdmin />}
            ></Route>

            <Route
              path="ExamTypes/:Id"
              element={<ExamTypeDetailsAdmin />}
            ></Route>

            <Route path="Faculties" element={<FacultyListAdmin />}></Route>
            <Route
              path="Faculties/:Id"
              element={<FacultyDetailsAdmin />}
            ></Route>
            <Route
              path="Faculties/CreateFaculty"
              element={<CreateFaculty />}
            ></Route>
            <Route
              path="Faculties/UpdateFaculty/:Id"
              element={<UpdateFacultyAdmin />}
            ></Route>
            <Route
              path="Faculties/DeleteFaculty/:Id"
              element={<DeleteFacultyAdmin />}
            ></Route>

            <Route path="Subjects" element={<SubjectListAdmin />}></Route>
            <Route
              path="Subjects/CreateSubject"
              element={<CreateSubjectAdmin />}
            ></Route>
            <Route
              path="Subjects/:Id"
              element={<SubjectDetailsAdmin />}
            ></Route>

            <Route
              path="Subjects/UpdateSubject/:Id"
              element={<UpdateSubjectAdmin />}
            ></Route>

            <Route
              path="Subjects/DeleteSubject/:Id"
              element={<DeleteSubjectAdmin />}
            ></Route>

            <Route
              path="TeacherRoles"
              element={<TeacherRoleListAdmin />}
            ></Route>
            <Route
              path="TeacherRoles/UpdateTeacherRole/:Id"
              element={<UpdateTeacherRoleAdmin />}
            ></Route>
            <Route
              path="TeacherRoles/CreateTeacherRole"
              element={<CreateTeacherRoleAdmin />}
            ></Route>
            <Route
              path="TeacherRoles/:Id"
              element={<TeacherRoleDetailsAdmin />}
            ></Route>
            <Route
              path="TeacherRoles/DeleteTeacherRole/:Id"
              element={<DeleteTeacherRoleAdmin />}
            ></Route>

            <Route path="Exams" element={<ExamListAdmin />}></Route>
            <Route path="Exams/CreateExam" element={<CreateExam />}></Route>
            <Route path="Exams/:Id" element={<ExamDetailsAdmin />}></Route>
            <Route
              path="Exams/UpdateExam/:Id"
              element={<UpdateExamAdmin />}
            ></Route>

            <Route
              path="Exams/DeleteExam/:Id"
              element={<ExamDeleteAdmin />}
            ></Route>
          </Route>

          <Route path="*" element={<ErrorPage />} />

          <Route path="/SignIn" element={<SignIn />}></Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
