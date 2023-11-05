import React, { useContext, useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminStudentTitle } from "../../../../UI/Common/AdminStudentTitle";
import { DeleteButton } from "../../../../UI/Buttons/ActionButtons";
import useService from "../../../../hooks";
import { useMutation } from "react-query";
import { getToken } from "../../../../utils/GetToken";
import jwtDecode from "jwt-decode";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
import { TokenContext } from "../../../../Contexts/Token-context";

const DeleteSubjectHourAdmin = () => {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const { state } = useLocation();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken[tokenRoleProperty] !== "Admin") {
        navigate("Error");
      }
    }
  }, []);

  const { subjectHourServices } = useService();
  const mutate = useMutation(
    (id) => subjectHourServices.deleteSubjectHours(id, token),
    {
      onSuccess: () => navigate("/SubjectHours"),
    }
  );
  console.log(state);
  return (
    <div className="student-details">
      <div className="container">
        <AdminStudentTitle
          child1={"Stubject hour details"}
          child2={" Stubject hour / Stubject hour Details"}
        />
        <section className="profile-actions">
          <div className="details">
            <div className="personal-details">
              <div className="card">
                <h1 className="card-title">Details:</h1>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Id</h1>
                    <p>{state.id}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Group Name</h1>
                    <p>{state.groupSubject.groupName}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Subject Name</h1>
                    <p>{state.groupSubject.subjectName}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Room</h1>
                    <p>{state.room}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Start Time</h1>
                    <p>{state.startTime.substring(0, 5)}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>End Time</h1>
                    <p>{state.endTime.substring(0, 5)}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Lesson Type</h1>
                    <p>{state.lessonType.name}</p>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div className="action">
            <DeleteButton onClick={() => mutate.mutate(state.id)}>
              Delete Subject Hour
            </DeleteButton>
          </div>
        </section>
      </div>
    </div>
  );
};
export default DeleteSubjectHourAdmin;
