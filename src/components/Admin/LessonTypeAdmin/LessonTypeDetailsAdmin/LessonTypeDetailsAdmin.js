import { useParams } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import useService from "../../../../hooks";
import { useQuery } from "react-query";
import { queryKeys } from "../../../../QueryKeys";
import { AdminExamTypeTitle } from "../../../../UI/Common/AdminExamTypeTitle";
import { AdminFacultyTitle } from "../../../../UI/Common/AdminFacultyTitle";
import { useContext } from "react";
import { TokenContext } from "../../../../Contexts/Token-context";
const LessonTypeDetailsAdmin = () => {
  const { token } = useContext(TokenContext);
  const { Id } = useParams();
  const { lessonTypesServices } = useService();
  const lessonTypeQuery = useQuery([queryKeys.GetLessonTypeById], () =>
    lessonTypesServices.getLessonTypeById(Id, token)
  );
  if (lessonTypeQuery.isLoading) {
    return <h1>Is Loading...</h1>;
  }
  if (lessonTypeQuery.data === null) {
    return <h1>Lesson's type Not Found</h1>;
  }

  if (lessonTypeQuery.isError) {
    return <h1>{lessonTypeQuery.error.response.data?.message}</h1>;
  }

  return (
    <div className="student-details">
      <div className="container">
        <AdminFacultyTitle
          child1={"Lesson's type details"}
          child2={" Lesson's type / Lesson's type Details"}
        />
        <section className="profile">
          <div className="details">
            <div className="personal-details">
              <div className="card">
                <h1>Details:</h1>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Id</h1>
                    <p>{lessonTypeQuery.data?.data.id}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Name</h1>
                    <p>{lessonTypeQuery.data?.data.name}</p>
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
export default LessonTypeDetailsAdmin;
