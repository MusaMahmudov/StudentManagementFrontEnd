import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Navigate,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { useMutation } from "react-query";
import useService from "../../hooks";
import { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { getToken } from "../../utils/TokenServices";
import { Token } from "@mui/icons-material";
import { useEffect } from "react";
import { useContext } from "react";
import {
  TokenContext,
  TokenContextProvider,
} from "../../Contexts/Token-context";
import ErrorPage from "../ErrorPage/ErrorPage";
import { tokenRoleProperty } from "../../utils/TokenProperties";
import { Alert, Snackbar } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()} Developed by Musa Mahmudov
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();
export default function ForgotPassword() {
  const navigate = useNavigate();

  const { userServices } = useService();
  const [email, setEmail] = useState("");
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const [result, setResult] = useState();

  const handleClick = (result) => {
    if (result === "error") {
      setOpenError(true);
    } else if (result === "success") {
      setOpenSuccess(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
    setOpenSuccess(false);
  };
  var mutate = useMutation(() => userServices.forgotPassword(email), {
    onError: () => handleClick("error"),
    onSuccess: () => handleClick("success"),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email) {
      mutate.mutate();
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate("/SignIn")}
            >
              <ArrowBack sx={{ mr: 2 }} />
              Back To Sign In
            </Button>
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              onChange={(e) => {
                setEmail((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
              error={email ? "" : "error"}
              helperText={email ? "" : "Email  is required"}
            />
            <Snackbar
              open={openError}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
                variant="filled"
              >
                User not Found
              </Alert>
            </Snackbar>
            <Snackbar
              open={openSuccess}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
                variant="filled"
              >
                Please check you email
              </Alert>
            </Snackbar>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send email
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
