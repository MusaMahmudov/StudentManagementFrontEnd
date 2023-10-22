import React, { useContext, useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { DeleteButton } from "../../../../UI/Buttons/ActionButtons";
import { useMutation } from "react-query";
import { AdminExamTypeTitle } from "../../../../UI/Common/AdminExamTypeTitle";
import useService from "../../../../hooks";
import jwtDecode from "jwt-decode";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
import { TokenContext } from "../../../../Contexts/Token-context";

const DeleteFacultyAdmin = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken[tokenRoleProperty] !== "Admin") {
        navigate("Error");
      }
    }
  });
  const { facultyServices } = useService();
  const mutate = useMutation((id) => facultyServices.deleteFaculty(id, token), {
    onSuccess: () => navigate(-1),
  });
  return (
    <div className="student-details">
      <div className="container">
        <AdminExamTypeTitle
          child1={"Faculty details"}
          child2={" Faculty / Faculty Details"}
        />
        <section className="profile-actions">
          <div className="details">
            <div className="personal-details">
              <div className="card">
                <h1 className="card-title">Faculty Details:</h1>
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
                    <p>{state.name}</p>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div className="action">
            <DeleteButton onClick={() => mutate.mutate(state.id)}>
              Delete Faculty
            </DeleteButton>
          </div>
        </section>
      </div>
    </div>
  );
};
export default DeleteFacultyAdmin;
