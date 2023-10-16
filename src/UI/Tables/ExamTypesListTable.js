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

export function ExamTypeListTable() {
  const navigate = useNavigate();
  const { examTypeServices } = useService();

  const examTypeQuery = useQuery([queryKeys.getExamTypes], () =>
    examTypeServices.getAllExamTypes()
  );
  if (examTypeQuery.isLoading) {
    return <h1 className="loading">Is Loading...</h1>;
  }
  if (examTypeQuery.isError) {
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
          {examTypeQuery.data?.data.map((examType) => (
            <TableRow
              key={examType?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                onClick={() =>
                  navigate(`${examType.id}`, {
                    state: { ...examType },
                  })
                }
              >
                {examType.id}
              </TableCell>
              <TableCell
                className="cover"
                component="th"
                scope="row"
                onClick={() =>
                  navigate(`${examType.id}`, {
                    state: { ...examType },
                  })
                }
              >
                {examType.name}
              </TableCell>

              <TableCell>
                <DetailButton
                  onClick={() =>
                    navigate(`${examType.id}`, { state: examType })
                  }
                />
                <UpdateButton
                  onClick={() =>
                    navigate(`UpdateExamType/${examType.id}`, {
                      state: examType,
                    })
                  }
                >
                  Update
                </UpdateButton>
                <DeleteButton
                  onClick={() =>
                    navigate(`DeleteExamType/${examType.id}`, {
                      state: examType,
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
