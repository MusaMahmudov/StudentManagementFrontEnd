import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminStudentTitle } from "../../../../UI/Common/AdminStudentTitle";
import { Button } from "@mui/material";
import { DeleteButton } from "../../../../UI/Buttons/ActionButtons";
import useService from "../../../../hooks";
import { useMutation } from "react-query";

const DeleteGroupSubjectAdmin = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { groupSubjectServices } = useService();
  const mutate = useMutation(
    (id) => groupSubjectServices.deleteGroupSubject(id),
    {
      onSuccess: () => navigate(-1),
    }
  );
  return (
    <div className="group-details">
      <div className="container">
        <AdminStudentTitle
          child1={"Group's subject details"}
          child2={" Group's subject / Group's subject Details"}
        />
        <section className="profile-actions">
          <div className="details">
            <div className="personal-details">
              <div className="card">
                <h1 className="card-title">Details:</h1>
                <div className="info">
                  <section className="info-left"></section>
                  <section className="info-right">
                    <h1>Id</h1>
                    <p>{state.id}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left"></section>
                  <section className="info-right">
                    <h1>Group Name</h1>
                    <p>{state.group.name}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left"></section>
                  <section className="info-right">
                    <h1>subject name</h1>
                    <p>{state.subject.name}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left"></section>
                  <section className="info-right">
                    <h1>Teachers</h1>
                    {state.teachers.map((teacher) => (
                      <p key={teacher.id}>
                        {teacher.fullName} - {teacher.roleName}
                      </p>
                    ))}
                  </section>
                </div>
                <div className="info">
                  <section className="info-left"></section>
                  <section className="info-right">
                    <h1>Credits</h1>
                    <p>{state.credits}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left"></section>
                  <section className="info-right">
                    <h1>Hours</h1>
                    <p>{state.hours}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left"></section>
                  <section className="info-right">
                    <h1>Duration</h1>
                    <p>{state.totalWeeks}</p>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div className="action">
            <DeleteButton onClick={() => mutate.mutate(state.id)}>
              Delete
            </DeleteButton>
          </div>
        </section>
      </div>
    </div>
  );
};
export default DeleteGroupSubjectAdmin;
