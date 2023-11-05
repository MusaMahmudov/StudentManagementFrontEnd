import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { AdminFacultyTitle } from "../../../../UI/Common/AdminFacultyTitle";
import { FacultyListTable } from "../../../../UI/Tables/FacultyListTable";
import { SubjectHourListTable } from "../../../../UI/Tables/SubjectHourListTable";
const SubjectHourListAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="student-list-admin">
      <div className="container">
        <AdminFacultyTitle
          child1={"Subject Hours"}
          child2={"Subject Hours / All Subject Hours"}
        />
        <section className="search-part">
          <TextField
            size="small"
            id="outlined-basic"
            label="Search  by Full Name..."
            variant="outlined"
            sx={{ background: "white" }}
          />
        </section>
        <section className="students">
          <div className="students-list">
            <div className="students-list-title">
              <div>
                <h1>Subject Hours</h1>
              </div>
              <div className="buttons">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("CreateSubjectHour")}
                ></Button>
              </div>
            </div>
            <div className="students-list-info">
              <SubjectHourListTable />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default SubjectHourListAdmin;
