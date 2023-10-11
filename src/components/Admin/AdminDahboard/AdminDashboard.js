import "./admindashboard.scss";
import studentIcon from "../../../assets/images/Student-Icon.svg";
import groupsIcon from "../../../assets/images/groups-image.svg";
import facultyIcon from "../../../assets/images/faculty-image.svg";
import useService from "../../../hooks";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { queryKeys } from "../../../QueryKeys";
import { ApexChart } from "../../../UI/Charts/StudentsByYearChart";
const AdminDashboard = () => {
  const { studentServices, groupServices, teacherServices, facultyServices } =
    useService();

  var {
    data: studentData,
    isLoading,
    isError: studentsIsError,
    error: studentsError,
  } = useQuery([queryKeys.getStudentsQuery], () =>
    studentServices.getAllStudents()
  );
  var { data: groupData } = useQuery(["Group"], () =>
    groupServices.getAllGroups()
  );
  var { data: teacherData } = useQuery(["Teacher"], () =>
    teacherServices.getAllTeachers()
  );

  var { data: facultyData } = useQuery(["faculty"], () =>
    facultyServices.getAllFaculties()
  );
  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="title">
          <h1>Welcome Musa!</h1>
          <h1>Home/Admin</h1>
        </div>
        <div className="numbers">
          <ul className="cards">
            <li className="card">
              <div className="card-info">
                <p>Students</p>
                <h1>{studentsIsError ? "Error" : studentData?.data.length}</h1>
              </div>
              <div className="card-icon">
                <img src={studentIcon}></img>
              </div>
            </li>
            <li className="card">
              <div className="card-info">
                <p>Groups</p>
                <h1>{groupData?.data.length}</h1>
              </div>
              <div className="card-icon">
                <img src={groupsIcon}></img>
              </div>
            </li>
            <li className="card">
              <div className="card-info">
                <p>Teachers</p>
                <h1>{teacherData?.data.length}</h1>
              </div>
              <div className="card-icon">
                <img src={studentIcon}></img>
              </div>
            </li>
            <li className="card">
              <div className="card-info">
                <p>Faculties</p>
                <h1>{facultyData?.data.length}</h1>
              </div>
              <div className="card-icon">
                <img src={facultyIcon}></img>
              </div>
            </li>
          </ul>
        </div>
        <ApexChart />
      </div>
    </div>
  );
};
export default AdminDashboard;
