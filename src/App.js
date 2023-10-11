import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Common/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AdminDashboard from "./components/Admin/AdminDahboard/AdminDashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import StudentListAdmin from "./components/Admin/StudentListAdmin/StudentListAdmin";
import StudentDetailsAdmin from "./components/Admin/StudentDetailsAdmin/StudentDetailsAdmin";
import UpdateStudentAdmin from "./components/Admin/StudentUpdateAdmin/StudentUpdateAdmin";
function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Navbar />

        <div className="main-container">
          <Sidebar />

          <Routes>
            <Route path="/" element={<AdminDashboard />}></Route>
            <Route path="/Students" element={<StudentListAdmin />}></Route>
            <Route
              path="/Students/:Id"
              element={<StudentDetailsAdmin />}
            ></Route>
            <Route
              path="/Student/UpdateStudent"
              element={<UpdateStudentAdmin />}
            ></Route>
            <Route path="*"></Route>
          </Routes>
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
