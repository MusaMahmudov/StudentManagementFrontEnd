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
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../../Contexts/Token-context";

export function GroupListTable() {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);

  const { groupServices } = useService();

  const groupQuery = useQuery([queryKeys.getGroupsQuery], () =>
    groupServices.getAllGroups(token)
  );
  if (groupQuery.isLoading) {
    return <h1 className="loading">Is Loading...</h1>;
  }
  if (groupQuery.isError) {
    return <h1 className="errorMessage">Something went wrong</h1>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Student Count</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Faculty Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupQuery.data?.data.map((group) => (
            <TableRow
              key={group?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                onClick={() =>
                  navigate(`${group.id}`, {
                    state: { ...group },
                  })
                }
              >
                {group.id}
              </TableCell>
              <TableCell
                className="cover"
                component="th"
                scope="row"
                onClick={() =>
                  navigate(`${group.id}`, {
                    state: { ...group },
                  })
                }
              >
                {group.name}
              </TableCell>
              <TableCell>{group.studentCount}</TableCell>
              <TableCell>{group.year}</TableCell>
              <TableCell>{group.facultyName}</TableCell>

              <TableCell>
                <DetailButton
                  onClick={() => navigate(`${group.id}`, { state: group })}
                />
                <UpdateButton
                  onClick={() =>
                    navigate(`UpdateGroup/${group.id}`, {
                      state: group,
                    })
                  }
                >
                  Update
                </UpdateButton>
                <DeleteButton
                  onClick={() =>
                    navigate(`DeleteGroup/${group.id}`, {
                      state: group,
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
