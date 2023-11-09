import { StudentListTable } from "../../../../UI/Tables/StudentListTable";
import { Button, Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
import { GroupListTable } from "../../../../UI/Tables/GroupListTable";
import { GroupSubjectListTable } from "../../../../UI/Tables/GroupSubjectListTable";
import { getDecodedToken } from "../../../../utils/TokenServices";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
const GroupSubjectListAdmin = () => {
  const navigate = useNavigate();
  const decodedToken = getDecodedToken();
  const role = decodedToken[tokenRoleProperty];
  const searchByFullName = (event) => {};
  return (
    <div className="group-list-admin">
      <div className="container">
        <AdminGroupTitle
          child1={"Group's Subjects"}
          child2={"Group's Subjects"}
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
        <section className="group">
          <div className="groups-list">
            <div className="groups-list-title">
              <div>
                <h1>Groups' subjects</h1>
              </div>
              <div className="buttons">
                <Fab
                  onClick={() => navigate("CreateGroupSubject")}
                  color="primary"
                  aria-label="add"
                  disabled={role !== "Admin" ? true : false}
                >
                  <AddIcon />
                </Fab>
                {/* <Button variant="contained" startIcon={<AddIcon />}></Button> */}
              </div>
            </div>
            <div className="groups-list-info">
              <GroupSubjectListTable role={role} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default GroupSubjectListAdmin;
