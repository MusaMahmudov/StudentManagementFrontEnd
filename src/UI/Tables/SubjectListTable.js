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

export function SubjectListTable() {
  const { token } = useContext(TokenContext);

  const navigate = useNavigate();
  const { subjectServices } = useService();

  const subjectQuery = useQuery([queryKeys.getSubjects], () =>
    subjectServices.getAllSubjects(token)
  );
  if (subjectQuery.isLoading) {
    return <h1 className="loading">Is Loading...</h1>;
  }
  if (subjectQuery.isError) {
    return <h1 className="errorMessage">Something went wrong</h1>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjectQuery.data?.data.map((subject) => (
            <TableRow
              key={subject?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                onClick={() =>
                  navigate(`${subject.id}`, {
                    state: { ...subject },
                  })
                }
              >
                {subject.id}
              </TableCell>
              <TableCell
                className="cover"
                component="th"
                scope="row"
                onClick={() =>
                  navigate(`${subject.id}`, {
                    state: { ...subject },
                  })
                }
              >
                {subject.name}
              </TableCell>

              <TableCell>
                <DetailButton
                  onClick={() => navigate(`${subject.id}`, { state: subject })}
                />
                <UpdateButton
                  onClick={() =>
                    navigate(`UpdateSubject/${subject.id}`, {
                      state: subject,
                    })
                  }
                >
                  Update
                </UpdateButton>
                <DeleteButton
                  onClick={() =>
                    navigate(`DeleteSubject/${subject.id}`, {
                      state: subject,
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
