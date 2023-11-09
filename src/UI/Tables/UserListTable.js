import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import { queryKeys } from "../../QueryKeys";
import useService from "../../hooks";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DeleteButton,
  DetailButton,
  UpdateButton,
} from "../Buttons/ActionButtons";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../../utils/TokenServices";
import { useContext, useEffect } from "react";
import { TokenContext } from "../../Contexts/Token-context";
import jwtDecode from "jwt-decode";
import { tokenRoleProperty } from "../../utils/TokenProperties";

export function UserListTable({ role }) {
  const navigate = useNavigate();
  const { userServices } = useService();
  const { token } = useContext(TokenContext);

  const userQuery = useQuery([queryKeys.getUsers], () =>
    userServices.getAllUser(token)
  );
  console.log(userQuery, "userQuery");
  if (userQuery.isLoading) {
    return <h1 className="loading">Is Loading...</h1>;
  }
  if (userQuery.isError) {
    return <h1 className="errorMessage">Something went wrong</h1>;
  }
  console.log(userQuery);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Roles</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userQuery.data?.data.map((user) => (
            <TableRow
              key={user?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                onClick={() =>
                  navigate(`${user.id}`, {
                    state: { ...user },
                  })
                }
              >
                {user.id}
              </TableCell>
              <TableCell
                className="cover"
                component="th"
                scope="row"
                onClick={() =>
                  navigate(`${user.id}`, {
                    state: { ...user },
                  })
                }
              >
                {user.userName}
              </TableCell>
              <TableCell>
                {user.roles.length !== 0
                  ? user.roles.map((role, index) =>
                      index !== 0 ? ` - ${role}` : `${role}`
                    )
                  : "no roles"}
              </TableCell>
              <TableCell>{user.isActive ? "Yes" : "No"}</TableCell>
              <TableCell>
                <DetailButton
                  onClick={() => navigate(`${user.id}`, { state: user })}
                />
                <UpdateButton
                  disabled={role !== "Admin" ? true : false}
                  onClick={() =>
                    navigate(`UpdateUser/${user.id}`, {
                      state: user,
                    })
                  }
                >
                  Update
                </UpdateButton>
                <DeleteButton
                  disabled={role !== "Admin" ? true : false}
                  onClick={() =>
                    navigate(`DeleteUser/${user.id}`, {
                      state: user,
                    })
                  }
                >
                  Delete
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
