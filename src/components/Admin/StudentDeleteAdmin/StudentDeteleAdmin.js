import React, { useContext, useEffect } from "react";
import "./studentDeleteAdmin.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminStudentTitle } from "../../../UI/Common/AdminStudentTitle";
import { Button } from "@mui/material";
import { DeleteButton } from "../../../UI/Buttons/ActionButtons";
import useService from "../../../hooks";
import { useMutation } from "react-query";
import { getToken } from "../../../utils/TokenServices";
import jwtDecode from "jwt-decode";
import { tokenRoleProperty } from "../../../utils/TokenProperties";
import { TokenContext } from "../../../Contexts/Token-context";

const DeleteStudentAdmin = () => {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken[tokenRoleProperty] !== "Admin") {
        navigate("Error");
      }
    }
  }, []);

  const { state } = useLocation();
  const { studentServices } = useService();
  const mutate = useMutation((id) => studentServices.deleteStudent(id, token), {
    onSuccess: () => navigate(-1),
  });
  return (
    <div className="student-details">
      <div className="container">
        <AdminStudentTitle
          child1={"Student details"}
          child2={" Student / Student Details"}
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
                    <p>{state.email}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Main group</h1>
                    <p>{state.mainGroup?.name ?? "no main group"}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Year of Graduation</h1>
                    <p>{state.yearOfGraduation}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Faculty</h1>
                    <p>{state.mainGroup?.facultyName ?? "no faculty yet"}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Phone Number</h1>
                    <p>{state.phoneNumber}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Home Phone Number</h1>
                    <p>{state.homePhoneNumber}</p>
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
              Delete Student
            </DeleteButton>
          </div>
        </section>
      </div>
    </div>
  );
};
export default DeleteStudentAdmin;
