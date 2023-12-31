import { useLocation, useNavigate, useParams } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import useService from "../../../../hooks";
import { useMutation, useQuery } from "react-query";
import { queryKeys } from "../../../../QueryKeys";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
import "./examDeleteAdmin.scss";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DeleteButton } from "../../../../UI/Buttons/ActionButtons";
import { getToken } from "../../../../utils/TokenServices";
import { useContext, useEffect } from "react";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
import jwtDecode from "jwt-decode";
import { TokenContext } from "../../../../Contexts/Token-context";
const ExamDeleteAdmin = () => {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken[tokenRoleProperty] !== "Admin") {
        navigate("Error");
      }
    }
  });
  const { Id } = useParams();
  const { examServices } = useService();
  const examQuery = useQuery([queryKeys.getExamById], () =>
    examServices.getExamById(Id, token)
  );
  const mutate = useMutation(() => examServices.deleteExam(Id, token), {
    onSuccess: () => navigate(-1),
  });

  if (examQuery.isLoading) {
    return <h1>Is Loading...</h1>;
  }
  if (examQuery.isError) {
    return (
      <h1>
        {examQuery.error.response.data.message ??
          `Exam with id:${Id} not found`}
      </h1>
    );
  }

  //   const handleNavigation = (id) => {
  //     navigate(`/Students/${id}`, { replace: true });
  //   };

  console.log(examQuery.data?.data);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const examResults = examQuery.data?.data.examResults;

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className="group-details">
      <div className="container">
        <AdminGroupTitle
          child1={"Exam details"}
          child2={" Exam / Exam Details"}
        />
        <section className="profile">
          <div className="details">
            <section className="personal-details">
              <div className="card">
                <h1>Details:</h1>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Id</h1>
                    <p>{examQuery.data?.data.id}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Name</h1>
                    <p>{examQuery.data?.data.name}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Exam Type</h1>
                    <p>{examQuery.data?.data.examType}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Group</h1>
                    <p>{examQuery.data?.data.groupSubject.groupName}</p>
                  </section>
                </div>

                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Subject</h1>
                    <p>{examQuery.data?.data.groupSubject.subjectName}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Credits</h1>
                    <p>{examQuery.data?.data.groupSubject.credits}</p>
                  </section>
                </div>
              </div>
            </section>
            <section className="group-students">
              <div>
                <h1>Results:</h1>
              </div>
              <TableContainer component={Paper}>
                <Table
                  sx={{ maxWidth: 400 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="right">Student</StyledTableCell>
                      <StyledTableCell>Score</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {examResults && examResults.length > 0 ? (
                      examResults.map((examResult) => (
                        <StyledTableRow
                          key={examResult.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableCell component="th" scope="row">
                            {examResult.studentName}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {examResult.score}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <StyledTableRow>
                        <StyledTableCell colSpan={2} align="center">
                          No Results
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </section>
          </div>
          <div className="action">
            <DeleteButton onClick={() => mutate.mutate(Id)}>
              Delete Exam
            </DeleteButton>
          </div>
        </section>
      </div>
    </div>
  );
};
export default ExamDeleteAdmin;
