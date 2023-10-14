import { useLocation, useParams } from "react-router-dom";
import { AdminStudentTitle } from "../../../UI/Common/AdminStudentTitle";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Icon } from "@mui/material";
import { useContext } from "react";
import { StudentListContext } from "../../../Contexts/student-list-context";
import useService from "../../../hooks";
import { useQuery } from "react-query";
import { queryKeys } from "../../../QueryKeys";
import { AdminTeacherTitle } from "../../../UI/Common/AdminTeacherTitle";
const TeacherDetailsAdmin = () => {
  const { Id } = useParams();
  const { teacherServices } = useService();
  const teacherQuery = useQuery([queryKeys.getTeacherById], () =>
    teacherServices.getTeacherById(Id)
  );
  if (teacherQuery.isLoading) {
    return <h1>Is Loading...</h1>;
  }
  if (teacherQuery.isError) {
    return (
      <h1>
        {teacherQuery.error.response.data.message ??
          `Student with id:${Id} not found`}
      </h1>
    );
  }
  console.log(teacherQuery.data?.data);

  return (
    <div className="student-details">
      <div className="container">
        <AdminTeacherTitle
          child1={"Teacher details"}
          child2={" Teacher / Teacher Details"}
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
                    <p>{teacherQuery.data?.data.id}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Full Name</h1>
                    <p>{teacherQuery.data?.data.fullName}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Email</h1>
                    <p>{teacherQuery.data?.data.eMail}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Gender</h1>
                    <p>{teacherQuery.data?.data.gender}</p>
                  </section>
                </div>

                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Mobile Number</h1>
                    <p>{teacherQuery.data?.data.mobileNumber}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Date of Birthday</h1>
                    <p>{teacherQuery.data?.data.dateOfBirth.slice(0, 10)}</p>
                  </section>
                </div>

                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>User</h1>
                    <p>
                      {teacherQuery.data?.data.appUser?.userName ?? "No user"}
                    </p>
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
export default TeacherDetailsAdmin;
