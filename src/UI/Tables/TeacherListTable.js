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
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { TokenContext } from "../../Contexts/Token-context";

export function TeacherListTable({
  fullNameSearch,
  idSearch,
  emailSearch,
  mobileNumberSearch,
  role,
}) {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const { teacherServices } = useService();

  const {
    data: teachersData,
    isLoading,
    isError,
  } = useQuery([queryKeys.getAllTeachers], () =>
    teacherServices.getAllTeachers(token, fullNameSearch)
  );
  if (isLoading) {
    return <h1 className="loading">Is Loading...</h1>;
  }
  if (isError) {
    return <h1 className="errorMessage">Something went wrong</h1>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>User name</TableCell>
            <TableCell>Mobile Number</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachersData.data
            .filter((teacher) => {
              return fullNameSearch.trim().toLowerCase() === ""
                ? teacher
                : teacher.fullName
                    .toLowerCase()
                    .trim()
                    .includes(fullNameSearch.toLowerCase());
            })
            .filter((teacher) => {
              return idSearch.trim().toLowerCase() === ""
                ? teacher
                : teacher.id
                    .toLowerCase()
                    .trim()
                    .includes(idSearch.toLowerCase());
            })
            .filter((teacher) => {
              return emailSearch.trim().toLowerCase() === ""
                ? teacher
                : teacher.eMail
                    .toLowerCase()
                    .trim()
                    .includes(emailSearch.toLowerCase());
            })
            .filter((teacher) => {
              return mobileNumberSearch.trim().toLowerCase() === ""
                ? teacher
                : teacher.mobileNumber
                    .toLowerCase()
                    .trim()
                    .includes(mobileNumberSearch.toLowerCase());
            })
            .map((teacher) => (
              <TableRow
                key={teacher?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  onClick={() =>
                    navigate(`${teacher.id}`, {
                      state: { ...teacher },
                    })
                  }
                >
                  {teacher.id}
                </TableCell>
                <TableCell
                  className="cover"
                  component="th"
                  scope="row"
                  onClick={() =>
                    navigate(`${teacher.id}`, {
                      state: { ...teacher },
                    })
                  }
                >
                  {teacher.fullName}
                </TableCell>
                <TableCell>{teacher.eMail}</TableCell>
                <TableCell>{teacher.appUser?.userName ?? "No user"}</TableCell>
                <TableCell>{teacher.mobileNumber}</TableCell>
                <TableCell>
                  <DetailButton
                    onClick={() =>
                      navigate(`${teacher.id}`, { state: teacher })
                    }
                  />
                  <UpdateButton
                    onClick={() =>
                      navigate(`/Teachers/UpdateTeacher/${teacher.id}`, {
                        state: { ...teacher },
                      })
                    }
                  >
                    Update
                  </UpdateButton>
                  <DeleteButton
                    disabled={role !== "Admin" ? true : false}
                    onClick={() =>
                      navigate(`/Teachers/DeleteTeacher/${teacher.id}`, {
                        state: teacher,
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
