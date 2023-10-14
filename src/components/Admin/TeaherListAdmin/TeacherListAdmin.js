import { Button, TextField } from "@mui/material";
import "./teacherListAdmin.scss";
import { StudentListTable } from "../../../UI/Tables/StudentListTable";
import { Navigate, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { AdminTeacherTitle } from "../../../UI/Common/AdminTeacherTitle";
import { TeacherListTable } from "../../../UI/Tables/TeacherListTable";

const TeacherListAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="teacher-list-admin">
      <div className="container">
        <AdminTeacherTitle
          child1={"Teachers"}
          child2={"Teachers / All Teachers"}
        />
        {/* <TextField
          size="small"
          id="outlined-basic"
          label="Search  by Full Name..."
          variant="outlined"
          sx={{ background: "white" }}
          onChange={(event) => searchByFullName(event)}
        /> */}

        <section className="teachers">
          <div className="teachers-list">
            <div className="teachers-list-title">
              <div>
                <h1>Teachers</h1>
              </div>
              <div className="buttons">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("CreateTeacher")}
                ></Button>
              </div>
            </div>
            <div className="teachers-list-info">
              <TeacherListTable />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default TeacherListAdmin;
