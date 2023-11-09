import { Button } from "@mui/material";
import "./confirmEmail.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import useService from "../../hooks";
import { useEffect, useState } from "react";
import { Email } from "@mui/icons-material";
const ConfirmEmailPage = () => {
  const { userServices } = useService();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const token = search.get("token");
  const email = search.get("email");
  const navigate = useNavigate();
  console.log(token);
  const mutate = useMutation(() => userServices.confirmEmail(token, email));

  useEffect(() => {
    if (token && email) {
      mutate.mutate(token, email);
    }
  }, []);

  if (!token || !email) {
    return <h1>Email and Token are required</h1>;
  }
  if (mutate.isSuccess) {
    return (
      <div className="confirm-email-page">
        <div className="container">
          <div className="content">
            <div className="successIcon">
              <CheckCircleIcon />
            </div>
            <h1>You confirmed email successefully!</h1>
            <div className="button">
              <Button
                sx={{ borderRadius: 10 }}
                variant="contained"
                onClick={() => navigate("/SignIn")}
              >
                Go To Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Ploxo epta</h1>;
      </div>
    );
  }
};
export default ConfirmEmailPage;
