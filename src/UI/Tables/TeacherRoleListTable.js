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

import {
  DeleteButton,
  DetailButton,
  UpdateButton,
} from "../Buttons/ActionButtons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../../Contexts/Token-context";

export function TeacherRoleListTable({ role }) {
  const { token } = useContext(TokenContext);

  const navigate = useNavigate();
  const { teacherRoleServices } = useService();

  const teacherRoleQuery = useQuery([queryKeys.getTeacherRoles], () =>
    teacherRoleServices.getAllTeacherRoles(token)
  );
  if (teacherRoleQuery.isLoading) {
    return <h1 className="loading">Is Loading...</h1>;
  }
  if (teacherRoleQuery.isError) {
    return <h1 className="errorMessage">Something went wrong</h1>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teacherRoleQuery.data?.data.map((teacherRole) => (
            <TableRow
              key={teacherRole?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                onClick={() =>
                  navigate(`${teacherRole.id}`, {
                    state: { ...teacherRole },
                  })
                }
              >
                {teacherRole.id}
              </TableCell>
              <TableCell
                className="cover"
                component="th"
                scope="row"
                onClick={() =>
                  navigate(`${teacherRole.id}`, {
                    state: { ...teacherRole },
                  })
                }
              >
                {teacherRole.name}
              </TableCell>

              <TableCell>
                <DetailButton
                  onClick={() =>
                    navigate(`${teacherRole.id}`, { state: teacherRole })
                  }
                />
                <UpdateButton
                  onClick={() =>
                    navigate(`UpdateTeacherRole/${teacherRole.id}`, {
                      state: teacherRole,
                    })
                  }
                >
                  Update
                </UpdateButton>
                <DeleteButton
                  disabled={role !== "Admin" ? true : false}
                  onClick={() =>
                    navigate(`DeleteTeacherRole/${teacherRole.id}`, {
                      state: teacherRole,
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
