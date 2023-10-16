import { useLocation, useParams } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Icon } from "@mui/material";

import useService from "../../../../hooks";
import { useQuery } from "react-query";
import { queryKeys } from "../../../../QueryKeys";
import { AdminExamTypeTitle } from "../../../../UI/Common/AdminExamTypeTitle";
import { AdminFacultyTitle } from "../../../../UI/Common/AdminFacultyTitle";
const TeacherRoleDetailsAdmin = () => {
  const { Id } = useParams();
  const { teacherRoleServices } = useService();
  const teacherRoleQuery = useQuery([queryKeys.getTeacherRoleById], () =>
    teacherRoleServices.getTeacherRoleById(Id)
  );
  if (teacherRoleQuery.isLoading) {
    return <h1>Is Loading...</h1>;
  }
  if (teacherRoleQuery.data === null) {
    return <h1>Teacher Role Not Found</h1>;
  }

  if (teacherRoleQuery.isError) {
    return <h1>{teacherRoleQuery.error.response.data.message}</h1>;
  }

  return (
    <div className="student-details">
      <div className="container">
        <AdminFacultyTitle
          child1={"Teacher Role details"}
          child2={" Teacher Role / Teacher Role Details"}
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
                    <p>{teacherRoleQuery.data?.data.id}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Name</h1>
                    <p>{teacherRoleQuery.data?.data.name}</p>
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
export default TeacherRoleDetailsAdmin;
