import { useQuery } from "react-query";
import useService from "../../../../hooks";
import { queryKeys } from "../../../../QueryKeys";
import { StudentListTable } from "../../../../UI/Tables/StudentListTable";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserListTable } from "../../../../UI/Tables/UserListTable";

const UserListAdmin = () => {
  const navigate = useNavigate();

  const searchByFullName = (event) => {};
  return (
    <div className="student-list-admin">
      <div className="container">
        <section className="title">
          <div className="title-left">
            <h1>Users</h1>
          </div>
          <div className="title-right">
            <h1>Users / All Users</h1>
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
                <h1>Users</h1>
              </div>
              <div className="buttons">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("CreateUser")}
                ></Button>
              </div>
            </div>
            <div className="students-list-info">
              <UserListTable />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default UserListAdmin;
