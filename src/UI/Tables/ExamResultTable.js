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

export function ExamResultListTable({
  groupNameSearch,
  subjectNameSearch,
  examTypeSearch,
  studentFullNameSearch,
}) {
  const navigate = useNavigate();
  const { examResultServices } = useService();
  const { token } = useContext(TokenContext);

  const examResultQuery = useQuery([queryKeys.getExamResults], () =>
    examResultServices.getAllExamResults(token)
  );
  if (examResultQuery.isLoading) {
    return <h1 className="loading">Is Loading...</h1>;
  }
  if (examResultQuery.isError) {
    return <h1 className="errorMessage">Something went wrong</h1>;
  }
  console.log(examResultQuery.data?.data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Student Full Name</TableCell>
            <TableCell>Group Name</TableCell>
            <TableCell>Subject Name</TableCell>
            <TableCell>Exam's type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {examResultQuery.data?.data
            .filter((examResult) =>
              groupNameSearch.trim() === ""
                ? examResult
                : examResult.exam.groupSubject.groupName
                    .trim()
                    .toLowerCase()
                    .includes(groupNameSearch.trim().toLowerCase())
            )
            .filter((examResult) =>
              subjectNameSearch.trim() === ""
                ? examResult
                : examResult.exam.groupSubject.subjectName
                    .trim()
                    .toLowerCase()
                    .includes(subjectNameSearch.trim().toLowerCase())
            )
            .filter((examResult) =>
              examTypeSearch.trim() === ""
                ? examResult
                : examResult.exam.examTypeName
                    .trim()
                    .toLowerCase()
                    .includes(examTypeSearch.trim().toLowerCase())
            )
            .filter((examResult) =>
              studentFullNameSearch.trim() === ""
                ? examResult
                : examResult.studentName
                    .trim()
                    .toLowerCase()
                    .includes(studentFullNameSearch.trim().toLowerCase())
            )
            .map((examResult) => (
              <TableRow
                key={examResult?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  onClick={() =>
                    navigate(`${examResult.id}`, {
                      state: { ...examResult },
                    })
                  }
                >
                  {examResult.id}
                </TableCell>
                <TableCell
                  onClick={() =>
                    navigate(`${examResult.id}`, {
                      state: { ...examResult },
                    })
                  }
                >
                  {examResult.studentName}
                </TableCell>
                <TableCell
                  className="cover"
                  component="th"
                  scope="row"
                  onClick={() =>
                    navigate(`${examResult.id}`, {
                      state: { ...examResult },
                    })
                  }
                >
                  {examResult.exam.groupSubject.groupName}
                </TableCell>
                <TableCell
                  onClick={() =>
                    navigate(`${examResult.id}`, {
                      state: { ...examResult },
                    })
                  }
                >
                  {examResult.exam.groupSubject.subjectName}
                </TableCell>
                <TableCell
                  onClick={() =>
                    navigate(`${examResult.id}`, {
                      state: { ...examResult },
                    })
                  }
                >
                  {examResult.exam.examTypeName}
                </TableCell>

                <TableCell>
                  <DetailButton
                    onClick={() =>
                      navigate(`${examResult.id}`, { state: examResult })
                    }
                  />
                  <UpdateButton
                    onClick={() =>
                      navigate(`UpdateExamResult/${examResult.id}`, {
                        state: examResult,
                      })
                    }
                  >
                    Update
                  </UpdateButton>
                  <DeleteButton
                    onClick={() =>
                      navigate(`DeleteExamResult/${examResult.id}`, {
                        state: examResult,
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
