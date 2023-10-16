import { useLocation, useParams } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Icon } from "@mui/material";

import useService from "../../../../hooks";
import { useQuery } from "react-query";
import { queryKeys } from "../../../../QueryKeys";
import { AdminExamTypeTitle } from "../../../../UI/Common/AdminExamTypeTitle";
import { AdminFacultyTitle } from "../../../../UI/Common/AdminFacultyTitle";
const FacultyDetailsAdmin = () => {
  const { Id } = useParams();
  const { facultyServices } = useService();
  const facultyQuery = useQuery([queryKeys.getFacultyById], () =>
    facultyServices.getFacultyById(Id)
  );
  if (facultyQuery.isLoading) {
    return <h1>Is Loading...</h1>;
  }
  if (facultyQuery.data === null) {
    return <h1>Faculty Not Found</h1>;
  }

  if (facultyQuery.isError) {
    return <h1>{facultyQuery.error.response.data.message}</h1>;
  }

  return (
    <div className="student-details">
      <div className="container">
        <AdminFacultyTitle
          child1={"Faculty details"}
          child2={" Faculty / Faculty Details"}
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
                    <p>{facultyQuery.data?.data.id}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Name</h1>
                    <p>{facultyQuery.data?.data.name}</p>
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
export default FacultyDetailsAdmin;
