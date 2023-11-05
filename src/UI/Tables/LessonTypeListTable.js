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

export function LessonTypeListTable() {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const { lessonTypesServices } = useService();

  const lessonTypeQuery = useQuery([queryKeys.GetLessonTypes], () =>
    lessonTypesServices.getAllLessonTypes(token)
  );
  if (lessonTypeQuery.isLoading) {
    return <h1 className="loading">Is Loading...</h1>;
  }
  if (lessonTypeQuery.isError) {
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
          {lessonTypeQuery.data?.data.map((lessonType) => (
            <TableRow
              key={lessonType?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                onClick={() =>
                  navigate(`${lessonType.id}`, {
                    state: { ...lessonType },
                  })
                }
              >
                {lessonType.id}
              </TableCell>
              <TableCell
                className="cover"
                component="th"
                scope="row"
                onClick={() =>
                  navigate(`${lessonType.id}`, {
                    state: { ...lessonType },
                  })
                }
              >
                {lessonType.name}
              </TableCell>

              <TableCell>
                <DetailButton
                  onClick={() =>
                    navigate(`${lessonType.id}`, { state: lessonType })
                  }
                />
                <UpdateButton
                  onClick={() =>
                    navigate(`UpdateLessonType/${lessonType.id}`, {
                      state: lessonType,
                    })
                  }
                >
                  Update
                </UpdateButton>
                <DeleteButton
                  onClick={() =>
                    navigate(`DeleteLessonType/${lessonType.id}`, {
                      state: lessonType,
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
