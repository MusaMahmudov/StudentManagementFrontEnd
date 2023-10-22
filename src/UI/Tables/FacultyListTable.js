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

export function FacultyListTable() {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const { facultyServices } = useService();

  const facultyQuery = useQuery([queryKeys.getFaculties], () =>
    facultyServices.getAllFaculties(token)
  );
  if (facultyQuery.isLoading) {
    return <h1 className="loading">Is Loading...</h1>;
  }
  if (facultyQuery.isError) {
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
          {facultyQuery.data?.data.map((faculty) => (
            <TableRow
              key={faculty?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                onClick={() =>
                  navigate(`${faculty.id}`, {
                    state: { ...faculty },
                  })
                }
              >
                {faculty.id}
              </TableCell>
              <TableCell
                className="cover"
                component="th"
                scope="row"
                onClick={() =>
                  navigate(`${faculty.id}`, {
                    state: { ...faculty },
                  })
                }
              >
                {faculty.name}
              </TableCell>

              <TableCell>
                <DetailButton
                  onClick={() => navigate(`${faculty.id}`, { state: faculty })}
                />
                <UpdateButton
                  onClick={() =>
                    navigate(`UpdateFaculty/${faculty.id}`, {
                      state: faculty,
                    })
                  }
                >
                  Update
                </UpdateButton>
                <DeleteButton
                  onClick={() =>
                    navigate(`DeleteFaculty/${faculty.id}`, {
                      state: faculty,
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
