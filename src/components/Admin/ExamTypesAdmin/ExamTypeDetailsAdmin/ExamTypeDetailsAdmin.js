import { useLocation, useParams } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Icon } from "@mui/material";

import useService from "../../../../hooks";
import { useQuery } from "react-query";
import { queryKeys } from "../../../../QueryKeys";
import { AdminExamTypeTitle } from "../../../../UI/Common/AdminExamTypeTitle";
import { useContext } from "react";
import { TokenContext } from "../../../../Contexts/Token-context";
const ExamTypeDetailsAdmin = () => {
  const { token } = useContext(TokenContext);
  const { Id } = useParams();
  const { examTypeServices } = useService();
  const examTypeQuery = useQuery([queryKeys.getExamTypeById], () =>
    examTypeServices.getExamTypeById(Id, token)
  );
  if (examTypeQuery.isLoading) {
    return <h1>Is Loading...</h1>;
  }
  if (examTypeQuery.isError) {
    return <h1>{examTypeQuery.error.response.data.message}</h1>;
  }

  return (
    <div className="student-details">
      <div className="container">
        <AdminExamTypeTitle
          child1={"Exam Type details"}
          child2={" Exam Type / Exam Type Details"}
        />
        <section className="profile">
          <div className="details">
            <div className="personal-details">
              <div className="card">
                <h1>Personal Details:</h1>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Id</h1>
                    <p>{examTypeQuery.data?.data.id}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Name</h1>
                    <p>{examTypeQuery.data?.data.name}</p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default ExamTypeDetailsAdmin;
