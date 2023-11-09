import { Button, Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { AdminFacultyTitle } from "../../../../UI/Common/AdminFacultyTitle";
import { FacultyListTable } from "../../../../UI/Tables/FacultyListTable";
import { getDecodedToken } from "../../../../utils/TokenServices";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
const FacultyListAdmin = () => {
  const navigate = useNavigate();
  const decodedToken = getDecodedToken();
  const role = decodedToken[tokenRoleProperty];

  const searchByFullName = (event) => {};
  return (
    <div className="student-list-admin">
      <div className="container">
        <AdminFacultyTitle
          child1={"Faculties"}
          child2={"Faculties / All Faculties"}
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
                <h1>Faculties</h1>
              </div>
              <div className="buttons">
                <Fab
                  onClick={() => navigate("CreateFaculty")}
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
              <FacultyListTable role={role} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default FacultyListAdmin;
