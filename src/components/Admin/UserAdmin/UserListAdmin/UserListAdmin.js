import { useQuery } from "react-query";
import useService from "../../../../hooks";
import { queryKeys } from "../../../../QueryKeys";
import { StudentListTable } from "../../../../UI/Tables/StudentListTable";
import { Button, Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserListTable } from "../../../../UI/Tables/UserListTable";
import { useContext, useEffect } from "react";
import { TokenContext } from "../../../../Contexts/Token-context";
import jwtDecode from "jwt-decode";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
import { getDecodedToken } from "../../../../utils/TokenServices";

const UserListAdmin = () => {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const decodedToken = getDecodedToken();
  const role = decodedToken[tokenRoleProperty];

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
                <Fab
                  onClick={() => navigate("CreateUser")}
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
              <UserListTable role={role} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default UserListAdmin;
