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

export function GroupSubjectListTable() {
  const navigate = useNavigate();
  const { groupSubjectServices } = useService();

  const groupSubjectQuery = useQuery([queryKeys.getGroupSubjects], () =>
    groupSubjectServices.getAllGroupSubjects()
  );
  if (groupSubjectQuery.isLoading) {
    return <h1 className="loading">Is Loading...</h1>;
  }
  if (groupSubjectQuery.isError) {
    return <h1 className="errorMessage">Something went wrong</h1>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Group's name</TableCell>
            <TableCell>Subject's name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupSubjectQuery.data?.data.map((groupSubject) => (
            <TableRow
              key={groupSubject?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                onClick={() =>
                  navigate(`${groupSubject.id}`, {
                    state: { ...groupSubject },
                  })
                }
              >
                {groupSubject.id}
              </TableCell>
              <TableCell
                className="cover"
                component="th"
                scope="row"
                onClick={() =>
                  navigate(`${groupSubject.id}`, {
                    state: { ...groupSubject },
                  })
                }
              >
                {groupSubject.group.name}
              </TableCell>
              <TableCell>{groupSubject.subject.name}</TableCell>

              <TableCell>
                <DetailButton
                  onClick={() =>
                    navigate(`${groupSubject.id}`, { state: groupSubject })
                  }
                />
                <UpdateButton
                  onClick={() =>
                    navigate(`UpdateGroupSubject/${groupSubject.id}`, {
                      state: groupSubject,
                    })
                  }
                >
                  Update
                </UpdateButton>
                <DeleteButton
                  onClick={() =>
                    navigate(`DeleteGroupSubject/${groupSubject.id}`, {
                      state: groupSubject,
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
