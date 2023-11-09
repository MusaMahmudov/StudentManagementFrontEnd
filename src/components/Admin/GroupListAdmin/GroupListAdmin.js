import "./groupListAdmin.scss";
import { StudentListTable } from "../../../UI/Tables/StudentListTable";
import { Button, Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { AdminGroupTitle } from "../../../UI/Common/AdminGroupTitle";
import { GroupListTable } from "../../../UI/Tables/GroupListTable";
import { getDecodedToken } from "../../../utils/TokenServices";
import { tokenRoleProperty } from "../../../utils/TokenProperties";
const GroupListAdmin = () => {
  const navigate = useNavigate();
  const decodedToken = getDecodedToken();
  const role = decodedToken[tokenRoleProperty];
  const searchByFullName = (event) => {};
  return (
    <div className="group-list-admin">
      <div className="container">
        <AdminGroupTitle child1={"Groups"} child2={"Groups / All Groups"} />
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
                <h1>Groups</h1>
              </div>
              <div className="buttons">
                <Fab
                  onClick={() => navigate("CreateGroup")}
                  color="primary"
                  aria-label="add"
                  sx={{ zIndex: 10 }}
                  disabled={role !== "Admin" ? true : false}
                >
                  <AddIcon />
                </Fab>
              </div>
            </div>
            <div className="groups-list-info">
              <GroupListTable role={role} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default GroupListAdmin;
