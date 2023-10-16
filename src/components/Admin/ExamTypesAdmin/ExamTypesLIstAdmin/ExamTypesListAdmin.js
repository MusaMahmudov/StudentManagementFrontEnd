import { StudentListTable } from "../../../../UI/Tables/StudentListTable";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import "./examTypesListAdmin.scss";
import { ExamTypeListTable } from "../../../../UI/Tables/ExamTypesListTable";
const ExamTypesListAdmin = () => {
  const navigate = useNavigate();

  const searchByFullName = (event) => {};
  return (
    <div className="student-list-admin">
      <div className="container">
        <section className="title">
          <div className="title-left">
            <h1>Exam Types</h1>
          </div>
          <div className="title-right">
            <h1>Exam Types / All Exam Types</h1>
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
                <h1>Exam Types</h1>
              </div>
              <div className="buttons">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("CreateExamType")}
                ></Button>
              </div>
            </div>
            <div className="students-list-info">
              <ExamTypeListTable />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default ExamTypesListAdmin;
