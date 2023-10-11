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

export function StudentListTable() {
  const { studentServices } = useService();
  const navigate = useNavigate();
  const studentQuery = useQuery([queryKeys.getStudentsQuery], () =>
    studentServices.getAllStudents()
  );
  if (studentQuery.isLoading) {
    return <h1>Is Loading...</h1>;
  }
  if (studentQuery.isError) {
    return <h1 className="errorMessage">Something went wrong</h1>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Mobile Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>educationDegree</TableCell>
            <TableCell>User name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentQuery.data?.data.map((student) => (
            <TableRow
              key={student?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                className="cover"
                onClick={() =>
                  navigate(`${student.id}`, {
                    state: { ...student },
                  })
                }
                component="th"
                scope="row"
              >
                {student.fullName}
              </TableCell>
              <TableCell>{student.phoneNumber}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.educationDegree}</TableCell>
              <TableCell>{student.appUser?.userName ?? "No user"}</TableCell>
              <TableCell>
                <DetailButton />
                <UpdateButton
                  onClick={() =>
                    navigate("/Student/UpdateStudent", {
                      state: { ...student },
                    })
                  }
                >
                  Update
                </UpdateButton>
                <DeleteButton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
