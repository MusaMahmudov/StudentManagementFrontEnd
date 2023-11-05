import { useLocation, useParams } from "react-router-dom";
import "./studentDetailsAdmin.scss";
import { AdminStudentTitle } from "../../../UI/Common/AdminStudentTitle";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Icon } from "@mui/material";
import { useContext } from "react";
import useService from "../../../hooks";
import { useQuery } from "react-query";
import { queryKeys } from "../../../QueryKeys";
import { ConstructionOutlined } from "@mui/icons-material";
import { getToken } from "../../../utils/GetToken";
const StudentDetailsAdmin = () => {
  const token = getToken();
  const { Id } = useParams();
  const { studentServices } = useService();
  const studendQuery = useQuery([queryKeys.getStudentByIdQuery], () =>
    studentServices.getStudentById(Id, token)
  );
  if (studendQuery.isLoading) {
    return <h1>Is Loading...</h1>;
  }
  if (studendQuery.isError) {
    return <h1>{studendQuery.error.response.data.message}</h1>;
  }
  console.log(studendQuery);

  return (
    <div className="student-details">
      <div className="container">
        <AdminStudentTitle
          child1={"Student details"}
          child2={" Student / Student Details"}
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
                    <p>{studendQuery.data?.data.id}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Full Name</h1>
                    <p>{studendQuery.data?.data.fullName}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Email</h1>
                    <p>{studendQuery.data?.data.email}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Main group</h1>
                    <p>
                      {studendQuery.data?.data.mainGroup?.name ??
                        "No main group"}
                    </p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Year of Graduation</h1>
                    <p>{studendQuery.data?.data.yearOfGraduation}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Faculty</h1>
                    <p>
                      {studendQuery.data?.data.facultyName ?? "No faculty yet"}
                    </p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Phone Number</h1>
                    <p>{studendQuery.data?.data.phoneNumber}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Home Phone Number</h1>
                    <p>{studendQuery.data?.data.homePhoneNumber}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>User</h1>
                    <p>
                      {studendQuery.data?.data.appUser?.userName ?? "No user"}
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
export default StudentDetailsAdmin;
