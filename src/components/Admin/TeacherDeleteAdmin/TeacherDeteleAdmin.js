import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminStudentTitle } from "../../../UI/Common/AdminStudentTitle";
import { Button } from "@mui/material";
import { DeleteButton } from "../../../UI/Buttons/ActionButtons";
import useService from "../../../hooks";
import { useMutation } from "react-query";
import { AdminTeacherTitle } from "../../../UI/Common/AdminTeacherTitle";

const DeleteTeacherAdmin = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { teacherServices } = useService();
  const mutate = useMutation((id) => teacherServices.deleteTeacher(id), {
    onSuccess: () => navigate(-1),
  });
  return (
    <div className="student-details">
      <div className="container">
        <AdminTeacherTitle
          child1={"Teacher details"}
          child2={" Teacher / Teacher Details"}
        />
        <section className="profile-actions">
          <div className="details">
            <div className="personal-details">
              <div className="card">
                <h1 className="card-title">Personal Details:</h1>
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
                    <h1>Full Name</h1>
                    <p>{state.fullName}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Email</h1>
                    <p>{state.eMail}</p>
                  </section>
                </div>

                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Address </h1>
                    <p>{state.address}</p>
                  </section>
                </div>

                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Mobile Number</h1>
                    <p>{state.mobileNumber}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Gender</h1>
                    <p>{state.gender}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Date Of Birthday</h1>
                    <p>{state.dateOfBirth}</p>
                  </section>
                </div>

                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>User</h1>
                    <p>{state.AppUser ?? "No user"}</p>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div className="action">
            <DeleteButton onClick={() => mutate.mutate(state.id)}>
              Delete Teacher
            </DeleteButton>
          </div>
        </section>
      </div>
    </div>
  );
};
export default DeleteTeacherAdmin;
