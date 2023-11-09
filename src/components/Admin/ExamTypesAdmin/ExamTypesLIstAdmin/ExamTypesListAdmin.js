import { StudentListTable } from "../../../../UI/Tables/StudentListTable";
import { Button, Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import "./examTypesListAdmin.scss";
import { ExamTypeListTable } from "../../../../UI/Tables/ExamTypesListTable";
import { getDecodedToken } from "../../../../utils/TokenServices";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
const ExamTypesListAdmin = () => {
  const navigate = useNavigate();
  const decodedToken = getDecodedToken();
  const role = decodedToken[tokenRoleProperty];

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
                <Fab
                  onClick={() => navigate("CreateExamType")}
                  color="primary"
                  aria-label="add"
                  sx={{ zIndex: 10 }}
                  disabled={role !== "Admin" ? true : false}
                >
                  <AddIcon />
                </Fab>
              </div>
            </div>
            <div className="students-list-info">
              <ExamTypeListTable role={role} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default ExamTypesListAdmin;
