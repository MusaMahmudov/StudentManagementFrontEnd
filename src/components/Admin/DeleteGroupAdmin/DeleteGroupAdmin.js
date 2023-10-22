import React, { useContext, useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "./deleteGroupAdmin.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminStudentTitle } from "../../../UI/Common/AdminStudentTitle";
import { Button } from "@mui/material";
import { DeleteButton } from "../../../UI/Buttons/ActionButtons";
import useService from "../../../hooks";
import { useMutation } from "react-query";
import { TokenContext } from "../../../Contexts/Token-context";
import jwtDecode from "jwt-decode";
import { tokenRoleProperty } from "../../../utils/TokenProperties";

const DeleteGroupAdmin = () => {
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
  const { groupServices } = useService();
  const mutate = useMutation((id) => groupServices.deleteGroup(id, token), {
    onSuccess: () => navigate(-1),
  });
  return (
    <div className="group-details">
      <div className="container">
        <AdminStudentTitle
          child1={"Group details"}
          child2={" Group / Group Details"}
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
                    <h1>Name</h1>
                    <p>{state.fullName}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Year</h1>
                    <p>{state.year}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Faculty</h1>
                    <p>{state.facultyName}</p>
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
export default DeleteGroupAdmin;
