import { useQuery } from "react-query";
import useService from "../../../hooks";
import "./studentListAdmin.scss";
import { queryKeys } from "../../../QueryKeys";
import { StudentListTable } from "../../../UI/Tables/StudentListTable";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StudentListContext } from "../../../Contexts/student-list-context";
import StudentDetailsAdmin from "../StudentDetailsAdmin/StudentDetailsAdmin";
import UpdateStudentAdmin from "../StudentUpdateAdmin/StudentUpdateAdmin";
import DeleteStudentAdmin from "../StudentDeleteAdmin/StudentDeteleAdmin";
import CreateStudentAdmin from "../StudentCreateAdmin/StudentCreateAdmin";

const StudentAdminPage = () => {
  const navigate = useNavigate();

  const searchByFullName = (event) => {};
  return (
    <div className="student-list-admin">
      <div className="container">
        <section className="title">
          <div className="title-left">
            <h1>Students</h1>
          </div>
          <div className="title-right">
            <h1>Student / All Students</h1>
          </div>
        </section>
        <section className="search-part">
          <TextField
            size="small"
            id="outlined-basic"
            label="Search  by Full Name..."
            variant="outlined"
            sx={{ background: "white" }}
            onChange={(event) => searchByFullName(event)}
          />
        </section>
        <section className="students">
          <div className="students-list">
            <div className="students-list-title">
              <div>
                <h1>Students</h1>
              </div>
              <div className="buttons">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("CreateStudent")}
                ></Button>
              </div>
            </div>
            <div className="students-list-info">
              <StudentListTable />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default StudentAdminPage;
