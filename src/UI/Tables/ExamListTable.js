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

export function ExamListTable() {
  const navigate = useNavigate();
  const { examServices } = useService();

  const examQuery = useQuery([queryKeys.getExams], () =>
    examServices.getAllExams()
  );
  if (examQuery.isLoading) {
    return <h1 className="loading">Is Loading...</h1>;
  }
  if (examQuery.isError) {
    return <h1 className="errorMessage">Something went wrong</h1>;
  }
  console.log(examQuery);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Exam Type</TableCell>
            <TableCell>Group</TableCell>
            <TableCell>Subject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {examQuery.data?.data.map((exam) => (
            <TableRow
              key={exam?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                onClick={() =>
                  navigate(`${exam.id}`, {
                    state: { ...exam },
                  })
                }
              >
                {exam.id}
              </TableCell>
              <TableCell
                className="cover"
                component="th"
                scope="row"
                onClick={() =>
                  navigate(`${exam.id}`, {
                    state: { ...exam },
                  })
                }
              >
                {exam.name}
              </TableCell>
              <TableCell className="cover" component="th" scope="row">
                {exam.examType}
              </TableCell>
              <TableCell className="cover" component="th" scope="row">
                {exam.groupSubject.groupName}
              </TableCell>
              <TableCell className="cover" component="th" scope="row">
                {exam.groupSubject.subjectName}
              </TableCell>

              <TableCell>
                <DetailButton
                  onClick={() => navigate(`${exam.id}`, { state: exam })}
                />
                <UpdateButton
                  onClick={() =>
                    navigate(`UpdateExam/${exam.id}`, {
                      state: exam,
                    })
                  }
                >
                  Update
                </UpdateButton>
                <DeleteButton
                  onClick={() =>
                    navigate(`DeleteExam/${exam.id}`, {
                      state: exam,
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
