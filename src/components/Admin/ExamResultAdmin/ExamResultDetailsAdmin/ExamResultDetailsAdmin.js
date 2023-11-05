import { useLocation, useNavigate, useParams } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import useService from "../../../../hooks";
import { useQuery } from "react-query";
import { queryKeys } from "../../../../QueryKeys";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
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
import { useContext } from "react";
import { TokenContext } from "../../../../Contexts/Token-context";
const ExamResultDetailsAdmin = () => {
  const navigate = useNavigate();
  const { Id } = useParams();
  const { token } = useContext(TokenContext);

  const { examResultServices } = useService();
  const examResultQuery = useQuery([queryKeys.getExamResultById], () =>
    examResultServices.getExamResultById(Id, token)
  );
  if (examResultQuery.isLoading) {
    return <h1>Is Loading...</h1>;
  }
  if (examResultQuery.isError) {
    return (
      <h1>
        {examResultQuery.error.response.data.message ??
          `Exam with id:${Id} not found`}
      </h1>
    );
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const examResults = examResultQuery.data?.data.examResults;

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
          child1={"Exam's Result details"}
          child2={" Exam's Result / Exam's Result Details"}
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
                    <p>{examResultQuery.data?.data.id}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Group Name</h1>
                    <p>
                      {examResultQuery.data?.data.exam.groupSubject.groupName}
                    </p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Subject Name</h1>
                    <p>
                      {examResultQuery.data?.data.exam.groupSubject.subjectName}
                    </p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Student's Full Name</h1>
                    <p>{examResultQuery.data?.data.studentName}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Score</h1>
                    <p>{examResultQuery.data?.data.score}</p>
                  </section>
                </div>

                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Exam's Type</h1>
                    <p>{examResultQuery.data?.data.exam.examTypeName}</p>
                  </section>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};
export default ExamResultDetailsAdmin;
