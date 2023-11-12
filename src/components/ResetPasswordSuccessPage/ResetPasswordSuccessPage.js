import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import useService from "../../hooks";
import { useEffect, useState } from "react";
import { Email } from "@mui/icons-material";
const ResetPasswordSuccessPage = () => {
  const { userServices } = useService();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="confirm-email-page">
      <div className="container">
        <div className="content">
          <div className="successIcon">
            <CheckCircleIcon />
          </div>
          <h1>You changed your password successefully!</h1>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordSuccessPage;
