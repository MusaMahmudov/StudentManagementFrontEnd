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
import { RotateLeft } from "@mui/icons-material";
import GroupSubjectListAdmin from "./components/Admin/GroupSubjectAdmin/GroupSubjectListAdmin/GroupSubjectListAdmin";
import DeleteGroupSubjectAdmin from "./components/Admin/GroupSubjectAdmin/GroupSubjectDeleteAdmin/GroupSubjectDeleteAdmin";
import CreateGroupSubjectAdmin from "./components/Admin/GroupSubjectAdmin/GroupSubjectCreateAdmin/GroupSubjectCreateAdmin";
import UpdateGroupSubjectAdmin from "./components/Admin/GroupSubjectAdmin/GroupSubjectUpdateAdmin/GroupSubjectUpdateAdmin";
import GroupSubjectDetailsAdmin from "./components/Admin/GroupSubjectAdmin/GroupSubjectDetailsAdmin/GroupSubjectDetailsAdmin";
import { TokenContext, TokenContextProvider } from "./Contexts/Token-context";
import UserListAdmin from "./components/Admin/UserAdmin/UserListAdmin/UserListAdmin";
import CreateUserAdmin from "./components/Admin/UserAdmin/UserCreateAdmin/UserCreateAdmin";
import UserDetailsAdmin from "./components/Admin/UserAdmin/UserDetailsAdmin/UserDetailsAdmin";
import UpdateUserAdmin from "./components/Admin/UserAdmin/UserUpdateAdmin/UserUpdateAdmin";
import DeleteUserAdmin from "./components/Admin/UserAdmin/UserDeleteAdmin/UserDeleteAdmin";
import { getToken } from "./utils/GetToken";
import jwtDecode from "jwt-decode";
import { tokenRoleProperty } from "./utils/TokenProperties";
import ErrorPageNoAccess from "./components/ErrorPageNoAccess/ErrorPageNoAccess";

import LessonTypeListAdmin from "./components/Admin/LessonTypeAdmin/LessonTypeListAdmin/LessonTypeListAdmin";
import LessonTypeDetailsAdmin from "./components/Admin/LessonTypeAdmin/LessonTypeDetailsAdmin/LessonTypeDetailsAdmin";
import CreateLessonType from "./components/Admin/LessonTypeAdmin/LessonTypeCreateAdmin/LessonTypeCreateAdmin";
import DeleteLessonTypeAdmin from "./components/Admin/LessonTypeAdmin/LessonTypeDeleteAdmin/LessonTypeDeleteAdmin";
import UpdateLessonTypeAdmin from "./components/Admin/LessonTypeAdmin/LessonTypeUpdateAdmin/LessonTypeUpdateAdmin";
import SubjectHourListAdmin from "./components/Admin/SubjectHourAdmin/SubjectHourListAdmin/SubjectHourListAdmin";
import CreateSubjectHourAdmin from "./components/Admin/SubjectHourAdmin/SubjectHourCreateAdmin/SubjectHourCreateAdmin";
import UpdateSubjectHourAdmin from "./components/Admin/SubjectHourAdmin/SubjectHourUpdateAdmin/SubjectHourUpdateAdmin";
import SubjectHourDetailsAdmin from "./components/Admin/SubjectHourAdmin/SubjectHourDetailsAdmin/SubjectHourDetailsAdmin";
import DeleteSubjectHourAdmin from "./components/Admin/SubjectHourAdmin/SubjectHourDeleteAdmin/SubjectHourDeleteAdmin";
import ExamResultListAdmin from "./components/Admin/ExamResultAdmin/ExamResultListAdmin/ExamResultListAdmin";
import ExamResultDetailsAdmin from "./components/Admin/ExamResultAdmin/ExamResultDetailsAdmin/ExamResultDetailsAdmin";
import CreateExamResult from "./components/Admin/ExamResultAdmin/ExamResultCreateAdmin/ExamResultCreateAdmin";
import UpdateExamResultAdmin from "./components/Admin/ExamResultAdmin/ExamResultUpdateAdmin/ExamResultUpdateAdmin";
import ExamResultDeleteAdmin from "./components/Admin/ExamResultAdmin/ExamResultDeleteAdmin/ExamResultDeleteAdmin";

function App() {
  const queryClient = new QueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const token = getToken();
  const expireDate = localStorage.getItem("expireDate");
  const decodedToken = token ? jwtDecode(token) : null;
  const date = new Date();
  const expire = new Date(expireDate);

  useEffect(() => {
    if (!token) {
      navigate("SignIn");
    } else if (expire < date) {
      localStorage.removeItem("token");
      localStorage.removeItem("expireDate");
      navigate("SignIn");
    } else if (
      decodedToken[tokenRoleProperty] === "Student" ||
      decodedToken[tokenRoleProperty] === "Teacher"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("expireDate");
      navigate("SignIn");
    } else if (
      decodedToken[tokenRoleProperty] !== "Admin" &&
      decodedToken[tokenRoleProperty] !== "Moderator"
    ) {
      navigate("Error");
    } else if (location.pathname === "/" || location.pathname === "") {
      navigate("/AdminDashboard");
    }
  }, []);
  // useEffect(() => {
  //   if (location.pathname === "/" || location.pathname === "") {
  //     navigate("/AdminDashboard");
  //   }
  // }, []);
  if (window.onoffline) {
    return <h1>onoffline</h1>;
  }

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

            <Route path="LessonTypes" element={<LessonTypeListAdmin />}></Route>
            <Route
              path="LessonTypes/:Id"
              element={<LessonTypeDetailsAdmin />}
            ></Route>
            <Route
              path="LessonTypes/CreateLessonType"
              element={<CreateLessonType />}
            ></Route>
            <Route
              path="LessonTypes/DeleteLessonType/:Id"
              element={<DeleteLessonTypeAdmin />}
            ></Route>
            <Route
              path="LessonTypes/UpdateLessonType/:Id"
              element={<UpdateLessonTypeAdmin />}
            ></Route>

            <Route path="ExamResults" element={<ExamResultListAdmin />}></Route>
            <Route
              path="ExamResults/:Id"
              element={<ExamResultDetailsAdmin />}
            ></Route>
            <Route
              path="ExamResults/CreateExamResult"
              element={<CreateExamResult />}
            ></Route>
            <Route
              path="ExamResults/UpdateExamResult/:Id"
              element={<UpdateExamResultAdmin />}
            ></Route>

            <Route
              path="ExamResults/DeleteExamResult/:Id"
              element={<ExamResultDeleteAdmin />}
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

            <Route
              path="GroupSubjects"
              element={<GroupSubjectListAdmin />}
            ></Route>
            <Route
              path="GroupSubjects/UpdateGroupSubject/:Id"
              element={<UpdateGroupSubjectAdmin />}
            ></Route>
            <Route
              path="GroupSubjects/:Id"
              element={<GroupSubjectDetailsAdmin />}
            ></Route>

            <Route
              path="GroupSubjects/CreateGroupSubject"
              element={<CreateGroupSubjectAdmin />}
            ></Route>

            <Route
              path="GroupSubjects/DeleteGroupSubject/:Id"
              element={<DeleteGroupSubjectAdmin />}
            ></Route>

            <Route
              path="SubjectHours"
              element={<SubjectHourListAdmin />}
            ></Route>
            <Route
              path="SubjectHours/CreateSubjectHour"
              element={<CreateSubjectHourAdmin />}
            ></Route>
            <Route
              path="SubjectHours/UpdateSubjectHour/:Id"
              element={<UpdateSubjectHourAdmin />}
            ></Route>
            <Route
              path="SubjectHours/:Id"
              element={<SubjectHourDetailsAdmin />}
            ></Route>
            <Route
              path="SubjectHours/DeleteSubjectHour/:Id"
              element={<DeleteSubjectHourAdmin />}
            ></Route>

            <Route path="Users" element={<UserListAdmin />}></Route>
            <Route path="Users/:Id" element={<UserDetailsAdmin />}></Route>
            <Route
              path="Users/UpdateUser/:Id"
              element={<UpdateUserAdmin />}
            ></Route>

            <Route
              path="Users/CreateUser"
              element={<CreateUserAdmin />}
            ></Route>
            <Route
              path="Users/DeleteUser/:Id"
              element={<DeleteUserAdmin />}
            ></Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
          <Route path="ErrorPage" element={<ErrorPage />} />
          <Route path="Error" element={<ErrorPageNoAccess />} />

          <Route path="/SignIn" element={<SignIn />}></Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
