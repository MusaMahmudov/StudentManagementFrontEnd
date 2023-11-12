import { Button, Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { AdminFacultyTitle } from "../../../../UI/Common/AdminFacultyTitle";
import { FacultyListTable } from "../../../../UI/Tables/FacultyListTable";
import { SubjectHourListTable } from "../../../../UI/Tables/SubjectHourListTable";
import { getDecodedToken } from "../../../../utils/TokenServices";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
import { searchTextFieldDesign } from "../../../../UI/TextFieldDesign/TextFieldDesign";
const SubjectHourListAdmin = () => {
  const navigate = useNavigate();
  const decodedToken = getDecodedToken();
  const role = decodedToken[tokenRoleProperty];

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
            label="Search  by Group Name..."
            variant="outlined"
            sx={{
              background: "white",
              width: searchTextFieldDesign.textField.width,
            }}
          />
          <TextField
            size="small"
            id="outlined-basic"
            label="Search  by Subject Name..."
            variant="outlined"
            sx={{
              background: "white",
              width: searchTextFieldDesign.textField.width,
            }}
          />
        </section>
        <section className="students">
          <div className="students-list">
            <div className="students-list-title">
              <div>
                <h1>Subject Hours</h1>
              </div>
              <div className="buttons">
                <Fab
                  disabled={role !== "Admin" ? true : false}
                  onClick={() => navigate("CreateSubjectHour")}
                  color="primary"
                  aria-label="add"
                  sx={{ zIndex: 10 }}
                >
                  <AddIcon />
                </Fab>
              </div>
            </div>
            <div className="students-list-info">
              <SubjectHourListTable role={role} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default SubjectHourListAdmin;
