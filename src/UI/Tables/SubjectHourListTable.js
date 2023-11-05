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

export function SubjectHourListTable() {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const { subjectHourServices } = useService();

  const subjectHourQuery = useQuery([queryKeys.GetSubjectHours], () =>
    subjectHourServices.getAllSubjectHours(token)
  );
  if (subjectHourQuery.isLoading) {
    return <h1 className="loading">Is Loading...</h1>;
  }
  if (subjectHourQuery.isError) {
    return <h1 className="errorMessage">Something went wrong</h1>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Group Name</TableCell>
            <TableCell>Subject Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjectHourQuery.data?.data.map((subjectHour) => (
            <TableRow
              key={subjectHour?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                onClick={() =>
                  navigate(`${subjectHour.id}`, {
                    state: { ...subjectHour },
                  })
                }
              >
                {subjectHour.id}
              </TableCell>
              <TableCell>{subjectHour.groupSubject.groupName}</TableCell>
              <TableCell>{subjectHour.groupSubject.subjectName}</TableCell>

              <TableCell>
                <DetailButton
                  onClick={() =>
                    navigate(`${subjectHour.id}`, { state: subjectHour })
                  }
                />
                <UpdateButton
                  onClick={() =>
                    navigate(`UpdateSubjectHour/${subjectHour.id}`, {
                      state: subjectHour,
                    })
                  }
                >
                  Update
                </UpdateButton>
                <DeleteButton
                  onClick={() =>
                    navigate(`DeleteSubjectHour/${subjectHour.id}`, {
                      state: subjectHour,
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
