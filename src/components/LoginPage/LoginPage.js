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
import { useMutation } from "react-query";
import useService from "../../hooks";
import { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { getToken } from "../../utils/GetToken";
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
export default function SignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const existingToken = getToken();
    // if (existingToken) {
    //   // navigate("Error");
    //   const decodedCheckToken = jwtDecode(existingToken);
    //   switch (decodedCheckToken[tokenRoleProperty]) {
    //     case "Admin":
    //       window.location.href = "http://localhost:3000/AdminDashboard";
    //       return console.log("");
    //     case "Moderator":
    //       window.location.href = "http://localhost:3000/AdminDashboard";
    //       return console.log("");
    //     case "Student":
    //       window.location.href = "http://localhost:3001/Student";
    //       return console.log("");
    //   }
    //   // const decodedCheckToken = jwtDecode(existingToken);
    //   // switch (decodedCheckToken[tokenRoleProperty]) {
    //   //   case "Admin":
    //   //     navigate("AdminDashboard");
    //   //     return;
    //   //   case "Moderator":
    //   //     navigate("AdminDashboard");
    //   //     return;
    //   //   case "Student":
    //   //     navigate("AdminDashboard");
    //   //     return;
    //   //   default:
    //   //     return <ErrorPage />;
    //   // }
    // }
  }, []);
  const { authServices } = useService();
  const [error, setError] = useState();
  const [token, setToken] = useState();
  const [expireDate, setExpireDate] = useState();
  const [user, setUser] = useState({
    userName: "",
    password: "",
    rememberMe: false,
  });
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  var mutate = useMutation(() => authServices.Login(user), {
    onError: () => handleClick(),
    onSuccess: (res) => (
      setToken(res.data?.token), setExpireDate(res.data?._expireDate)
    ),
  });
  if (mutate.isSuccess) {
    localStorage.setItem("token", token);
    localStorage.setItem("expireDate", expireDate);
    var decodedToken = jwtDecode(token);

    switch (decodedToken[tokenRoleProperty]) {
      case "Admin":
        return (window.location.href = "http://localhost:3000/AdminDashboard");
      case "Moderator":
        return (window.location.href = "http://localhost:3000/AdminDashboard");
      case "Student":
        return (window.location.href = `http://localhost:3001/StudentDashboard?token=${token}`);
      case "Teacher":
        return (window.location.href = `http://localhost:3001/TeacherDashboard?token=${token}`);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password && user.userName) {
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="userName"
              autoFocus
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  userName: e.target.value,
                }));
              }}
              error={user.userName ? "" : "error"}
              helperText={user.userName ? "" : "User name is required"}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
              error={user.password ? "" : "error"}
              helperText={user.password ? "" : "Password  is required"}
            />
            {/* <div className="errorMessage"> */}
            {/* <h1>{error}</h1> */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
                variant="filled"
              >
                Username or Password is wrong!
              </Alert>
            </Snackbar>
            {/* </div> */}
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  rememberMe: !prev.rememberMe,
                }))
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
