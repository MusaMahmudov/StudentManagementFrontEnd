import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import useService from "../../hooks";
import { createTheme } from "@mui/material/styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { queryKeys } from "../../QueryKeys";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const email = search.get("email");
  const token = search.get("token");
  console.log(email);
  console.log(token);

  const { userServices } = useService();
  const [error, setError] = useState([]);
  const [result, setResult] = useState("");
  const [inputState, setInputState] = useState({
    password: "",
    confirmPassword: "",
    token: token,
    email: email,
  });

  console.log(inputState, "input");

  const mutate = useMutation(() => userServices.resetPassword(inputState), {
    onSuccess: () => {
      return setResult("Password changed successefully"), navigate("/SignIn");
    },
  });

  const defaultTheme = createTheme();

  useEffect(() => {
    if (
      mutate.isError &&
      mutate.error.response.data.message &&
      mutate.error.response.status != "500"
    ) {
      setError([mutate.error.response.data.message]);
    }
  }, [mutate.isError]);
  const handleSubmit = (e) => {
    e.preventDefault();

    mutate.mutate();
  };
  if (localStorage.getItem("token")) {
    return <h1>Error</h1>;
  }

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
            Reset Password
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
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setInputState((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
              error={inputState?.password ? "" : "error"}
              helperText={inputState?.password ? "" : "Password  is required"}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              onChange={(e) => {
                setInputState((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }));
              }}
              error={inputState?.confirmPassword ? "" : "error"}
              helperText={
                inputState?.confirmPassword ? "" : "Password  is required"
              }
            />
            <div className="errorMessage">
              {error
                ? error.map((err, index) => <h1 key={index}>{err}</h1>)
                : ""}
            </div>
            <div className="successMessage">
              {result ? <h1>{result}</h1> : ""}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
