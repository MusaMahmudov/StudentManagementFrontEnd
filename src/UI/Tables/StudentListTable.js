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
import { useContext } from "react";
import { TokenContext } from "../../Contexts/Token-context";

export function StudentListTable({
  fullNameSearch,
  idSearch,
  emailSearch,
  mainGroupSearch,
  role,
}) {
  const navigate = useNavigate();
  const { studentServices } = useService();
  const { token } = useContext(TokenContext);

  const studentQuery = useQuery(
    [queryKeys.getStudentsQuery],
    () => studentServices.getAllStudents(token),
    {
      onSuccess: () => localStorage.setItem("studentsListData", studentQuery),
    }
  );

  if (studentQuery.isLoading) {
    return <h1 className="loading">Is Loading...</h1>;
  }
  if (studentQuery.isError) {
    return <h1 className="errorMessage">Something went wrong</h1>;
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>

            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            {/* <TableCell>Education Degree</TableCell> */}
            <TableCell>User name</TableCell>
            <TableCell>Main group</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentQuery.data?.data
            .filter((student) =>
              fullNameSearch.trim() === ""
                ? student
                : student.fullName
                    .trim()
                    .toLowerCase()
                    .includes(fullNameSearch.trim().toLowerCase())
            )
            .filter((student) =>
              idSearch.trim() === ""
                ? student
                : student.id
                    .trim()
                    .toLowerCase()
                    .includes(idSearch.trim().toLowerCase())
            )
            .filter((student) =>
              emailSearch.trim() === ""
                ? student
                : student.email
                    .trim()
                    .toLowerCase()
                    .includes(emailSearch.trim().toLowerCase())
            )
            .filter((student) =>
              mainGroupSearch.trim() === ""
                ? student
                : student.mainGroup?.name
                    .trim()
                    .toLowerCase()
                    .includes(mainGroupSearch.trim().toLowerCase())
            )
            .map((student) => (
              <TableRow
                key={student?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  onClick={() =>
                    navigate(`${student.id}`, {
                      state: { ...student },
                    })
                  }
                >
                  {student.id}
                </TableCell>
                <TableCell
                  className="cover"
                  component="th"
                  scope="row"
                  onClick={() =>
                    navigate(`${student.id}`, {
                      state: { ...student },
                    })
                  }
                >
                  {student.fullName}
                </TableCell>
                <TableCell>{student.email}</TableCell>
                {/* <TableCell>{student.educationDegree}</TableCell> */}
                <TableCell>{student.appUser?.userName ?? "No user"}</TableCell>
                <TableCell>{student.mainGroup?.name ?? "No group"}</TableCell>

                <TableCell>
                  <DetailButton
                    onClick={() =>
                      navigate(`${student.id}`, { state: student })
                    }
                  />
                  <UpdateButton
                    onClick={() =>
                      navigate(`UpdateStudent/${student.id}`, {
                        state: student,
                      })
                    }
                  >
                    Update
                  </UpdateButton>
                  <DeleteButton
                    disabled={role !== "Admin" ? true : false}
                    onClick={() =>
                      navigate(`DeleteStudent/${student.id}`, {
                        state: student,
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
