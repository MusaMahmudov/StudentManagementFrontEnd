import { Button, Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import { SubjectListTable } from "../../../../UI/Tables/SubjectListTable";
import { AdminFacultyTitle } from "../../../../UI/Common/AdminFacultyTitle";
import { getDecodedToken } from "../../../../utils/TokenServices";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
import { searchTextFieldDesign } from "../../../../UI/TextFieldDesign/TextFieldDesign";
const SubjectListAdmin = () => {
  const navigate = useNavigate();
  const decodedToken = getDecodedToken();
  const role = decodedToken[tokenRoleProperty];

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
            label="Search  by Name..."
            variant="outlined"
            sx={{
              background: "white",
              width: searchTextFieldDesign.textField.width,
            }}
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
                <Fab
                  onClick={() => navigate("CreateSubject")}
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
              <SubjectListTable role={role} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default SubjectListAdmin;
