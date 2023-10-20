import "./groupListAdmin.scss";
import { StudentListTable } from "../../../UI/Tables/StudentListTable";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { AdminGroupTitle } from "../../../UI/Common/AdminGroupTitle";
import { GroupListTable } from "../../../UI/Tables/GroupListTable";
const GroupListAdmin = () => {
  const navigate = useNavigate();

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
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("CreateGroup")}
                ></Button>
              </div>
            </div>
            <div className="groups-list-info">
              <GroupListTable />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default GroupListAdmin;
