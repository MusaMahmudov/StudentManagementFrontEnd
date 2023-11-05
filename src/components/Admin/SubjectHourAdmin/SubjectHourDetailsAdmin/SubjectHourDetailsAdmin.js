import { useLocation, useParams } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Icon } from "@mui/material";

import useService from "../../../../hooks";
import { useQuery } from "react-query";
import { queryKeys } from "../../../../QueryKeys";
import { AdminExamTypeTitle } from "../../../../UI/Common/AdminExamTypeTitle";
import { AdminFacultyTitle } from "../../../../UI/Common/AdminFacultyTitle";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../../../Contexts/Token-context";
const SubjectHourDetailsAdmin = () => {
  const { token } = useContext(TokenContext);
  const { Id } = useParams();
  const [dayOfWeek, setDayOfWeek] = useState("");

  const { subjectHourServices } = useService();
  const subjectHourQuery = useQuery([queryKeys.GetSubjectHour], () =>
    subjectHourServices.getSubjectHourById(Id, token)
  );

  useEffect(() => {
    switch (subjectHourQuery.data?.data.dayOfWeek) {
      case 0:
        setDayOfWeek("Sunday");
        return;
      case 1:
        setDayOfWeek("Monday");
        return;
      case 2:
        setDayOfWeek("Tuesday");
        return;
      case 3:
        setDayOfWeek("Wednesday");
        return;
      case 4:
        setDayOfWeek("Thursday");
        return;
      case 5:
        setDayOfWeek("Friday");
        return;
      case 6:
        setDayOfWeek("Saturday");
        return;
    }
  }, [subjectHourQuery.isSuccess]);
  if (subjectHourQuery.isLoading) {
    return <h1>Is Loading...</h1>;
  }
  if (subjectHourQuery.data === null) {
    return <h1>Subject Hour Not Found</h1>;
  }

  if (subjectHourQuery.isError) {
    return <h1>{subjectHourQuery.error.response.data.message}</h1>;
  }

  console.log("detail", subjectHourQuery.data?.data);
  return (
    <div className="student-details">
      <div className="container">
        <AdminFacultyTitle
          child1={"Subject Hour details"}
          child2={" Subject Hour / Subject Hour Details"}
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
                    <p>{subjectHourQuery.data?.data.id}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Group Name</h1>
                    <p>{subjectHourQuery.data?.data.groupSubject.groupName}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Subject Name</h1>
                    <p>
                      {subjectHourQuery.data?.data.groupSubject.subjectName}
                    </p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Room</h1>
                    <p>{subjectHourQuery.data?.data.room}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Day Of The Week</h1>
                    <p>{dayOfWeek}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Start Time</h1>
                    <p>
                      {subjectHourQuery.data?.data.startTime.substring(0, 5)}
                    </p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>End Time</h1>
                    <p>{subjectHourQuery.data?.data.endTime.substring(0, 5)}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Lesson Type</h1>
                    <p>{subjectHourQuery.data?.data.lessonType.name}</p>
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
export default SubjectHourDetailsAdmin;
