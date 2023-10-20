import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { AdminFacultyTitle } from "../../../../UI/Common/AdminFacultyTitle";
import { FacultyListTable } from "../../../../UI/Tables/FacultyListTable";
import { ExamListTable } from "../../../../UI/Tables/ExamListTable";
import { getToken } from "../../../../utils/GetToken";
import ErrorPage from "../../../ErrorPage/ErrorPage";
const ExamListAdmin = () => {
  const navigate = useNavigate();

  const searchByFullName = (event) => {};
  return (
    <div className="student-list-admin">
      <div className="container">
        <AdminFacultyTitle child1={"Exams"} child2={"Exams / All Exams"} />
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
                <h1>Exams</h1>
              </div>
              <div className="buttons">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("CreateExam")}
                ></Button>
              </div>
            </div>
            <div className="students-list-info">
              <ExamListTable />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default ExamListAdmin;
