import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "../../../../QueryKeys";
const CreateUserAdmin = () => {
  const { studentServices, teacherServices, userServices, roleServices } =
    useService();
  const [newUser, setNewUser] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    studentId: null,
    teacherId: null,
    roleId: [""],
  });
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    userNameIsValid: true,
    passwordIsValid: true,
    emailIsValid: true,
  });
  let formValid = true;

  const navigate = useNavigate();

  const { data: studentData, isLoading: studentsIsLoading } = useQuery(
    [queryKeys.getStudentsQuery],
    () => studentServices.getAllStudents()
  );
  const { data: teacherData, isLoading: teachersIsLoading } = useQuery(
    [queryKeys.getTeachers],
    () => teacherServices.getAllTeachers()
  );
  const { data: roleData, isLoading: roleSIsLoading } = useQuery(
    [queryKeys.GetRoles],
    () => roleServices.getAllRoles()
  );
  const [studentInputValue, setStudentInputValue] = useState();
  const [teacherInputValue, setTeacherInputValue] = useState();

  const handleUser = ({ target: { value: inputValue, name: inputName } }) => {
    setNewUser((prev) => ({ ...prev, [inputName]: inputValue }));
  };
  const mutate = useMutation(() => userServices.createUser(newUser), {
    onSuccess: () => navigate("/Users"),
  });
  console.log("User", newUser);

  const [error, setError] = useState([]);
  useEffect(() => {
    if (
      mutate.isError &&
      mutate.error.response.data.message &&
      mutate.error.response.status != "500"
    ) {
      setError([mutate.error.response.data.message]);
    }
  }, [mutate.isError]);

  const handleNewUser = (e) => {
    e.preventDefault();
    if (newUser.userName?.trim() === "" || newUser.userName === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, userNameIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, userNameIsValid: true }));
    }

    if (newUser.email?.trim() === "" || newUser.email === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, emailIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, emailIsValid: true }));
    }

    if (newUser.password?.trim() === null || newUser.password?.length < 8) {
      setEnteredValueIsValid((prev) => ({ ...prev, passwordIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, passwordIsValid: true }));
    }

    if (newUser.confirmPassword.trim() === "") {
      setEnteredValueIsValid((prev) => ({ ...prev, confirmPassword: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, confirmPassword: true }));
    }

    if (newUser.password !== newUser.confirmPassword) {
      setError((prev) => ["Passwords do not match"]);
    }
    if (
      newUser.studentId !== null &&
      newUser.studentId?.length > 0 &&
      newUser.teacherId !== null &&
      newUser.teacherId?.length > 0
    ) {
      setError((prev) => ["User cannot be student and teacher"]);
    }

    mutate.mutate(newUser);
  };
  if (studentsIsLoading || teachersIsLoading || roleSIsLoading) {
    return <h1>...Is isLoading</h1>;
  }
  console.log(mutate);

  return (
    <div className="update-student">
      <div className="container">
        <section className="title">
          <div className="title-left">
            <h1>Create User</h1>
          </div>
          <div className="title-right">
            <h1>User/Create User</h1>
          </div>
        </section>
        <section className="form">
          <div className="form-title">
            <h1>User Information</h1>
          </div>
          <div className="inputs">
            <Box
              display="flex"
              flexDirection="column"
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "43ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                size="small"
                id="outlined-basic"
                label="User Name"
                variant="outlined"
                name="userName"
                onChange={handleUser}
                error={enteredValueisValid.userNameIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.userNameIsValid && "User name required"
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                onChange={handleUser}
                error={enteredValueisValid.emailIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.emailIsValid && `Email. required`
                }
              />
              <TextField
                type="password"
                size="small"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                name="password"
                onChange={handleUser}
                error={enteredValueisValid.passwordIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.passwordIsValid &&
                  "Password must be minimum 8 length"
                }
              />
              <TextField
                type="password"
                size="small"
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                name="confirmPassword"
                onChange={handleUser}
                error={enteredValueisValid.passwordIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.passwordIsValid &&
                  "Confirm Password required"
                }
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={studentData?.data ?? []}
                getOptionLabel={(option) => option.fullName}
                inputValue={studentInputValue}
                onInputChange={(e, newValue) => {
                  setStudentInputValue(newValue);
                }}
                name="sutndetId"
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Student" />
                )}
                onChange={(e, newValue) => {
                  setNewUser((prev) => ({
                    ...prev,
                    studentId: newValue.id,
                  }));
                }}
              />

              <Autocomplete
                disablePortal
                id="combo-box-mainGroup"
                size="small"
                options={teacherData?.data ?? []}
                getOptionLabel={(option) => option.fullName}
                onChange={(e, newValue) => {
                  setNewUser((prev) => ({
                    ...prev,
                    teacherId: newValue?.id,
                  }));
                }}
                inputValue={teacherInputValue}
                onInputChange={(e, newValue) => {
                  setTeacherInputValue(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Teacher" />
                )}
              />
              {roleData && (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={roleData?.data ?? null}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, newValue) => {
                    if (newValue) {
                      setNewUser((prev) => ({
                        ...prev,
                        roleId: newValue.map((role) => role.id),
                      }));
                    } else {
                      setNewUser((prev) => ({
                        ...prev,
                        roleId: [],
                      }));
                    }
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} label="Roles" placeholder="Roles" />
                  )}
                />
              )}

              <div className="errorMessage">
                {error ? error.map((err) => <h1>{err}</h1>) : ""}
              </div>
              <Button type="submit" onClick={handleNewUser} variant="contained">
                Create User
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreateUserAdmin;
