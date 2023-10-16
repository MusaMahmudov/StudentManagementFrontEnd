import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import { SubjectListTable } from "../../../../UI/Tables/SubjectListTable";
import { AdminFacultyTitle } from "../../../../UI/Common/AdminFacultyTitle";
const SubjectListAdmin = () => {
  const navigate = useNavigate();

  const searchByFullName = (event) => {};
  return (
    <div className="student-list-admin">
      <div className="container">
        <AdminFacultyTitle
          child1={"Subjects"}
          child2={"Subjects / All Subjects"}
        />
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
                <h1>Subjects</h1>
              </div>
              <div className="buttons">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("CreateSubject")}
                ></Button>
              </div>
            </div>
            <div className="students-list-info">
              <SubjectListTable />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default SubjectListAdmin;