import { useLocation, useNavigate, useParams } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import useService from "../../../../hooks";
import { useMutation, useQuery } from "react-query";
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
import { DeleteButton } from "../../../../UI/Buttons/ActionButtons";
import { getToken } from "../../../../utils/TokenServices";
import { useContext, useEffect } from "react";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
import jwtDecode from "jwt-decode";
import { TokenContext } from "../../../../Contexts/Token-context";
const DeleteExamResultAdmin = () => {
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
  const { examResultServices } = useService();
  const examResultQuery = useQuery([queryKeys.getExamById], () =>
    examResultServices.getExamResultById(Id, token)
  );
  const mutate = useMutation(
    () => examResultServices.deleteExamResult(Id, token),
    {
      onSuccess: () => navigate("/ExamResults"),
    }
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

  //   const handleNavigation = (id) => {
  //     navigate(`/Students/${id}`, { replace: true });
  //   };

  console.log(examResultQuery.data?.data);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

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
export default DeleteExamResultAdmin;
