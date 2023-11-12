import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useReducer, useState } from "react";
import { useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { queryKeys } from "../../../../QueryKeys";
import { updateUserReducer } from "../../../../Reducers/UpdateUserReducer";
import { TokenContext } from "../../../../Contexts/Token-context";
import jwtDecode from "jwt-decode";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
const UpdateUserAdmin = () => {
  const [error, setError] = useState([]);
  const { token } = useContext(TokenContext);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken[tokenRoleProperty] !== "Admin") {
        navigate("Error");
      }
    }
  });
  const { Id } = useParams();
  const navigate = useNavigate();
  const { teacherServices, studentServices, userServices, roleServices } =
    useService();
  const userQuery = useQuery([queryKeys.getUser], () =>
    userServices.getUserByIdForUpdate(Id, token)
  );
  const { data: studentData, isLoading: isLoadingStudents } = useQuery(
    [queryKeys.getStudentsQuery],
    () => studentServices.getAllStudentsForUserUpdate(token)
  );
  const { data: roleData, isLoading: isLoadingRole } = useQuery(
    [queryKeys.GetRoles],
    () => roleServices.getAllRoles(token)
  );
  const { data: teacherData, isLoading: isLoadingTeacher } = useQuery(
    [queryKeys.getTeachers],
    () => teacherServices.getAllTeachersForUserUpdate(token)
  );
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    userNameIsValid: true,
    passwordIsValid: true,
    emailIsValid: true,
    passwordIsValid: true,
    confirmPasswordIsValid: true,
  });

  const mutate = useMutation(
    () => userServices.updateUser(Id, inputState, token),
    {
      onSuccess: () => {
        navigate("/Users");
      },
    }
  );
  useEffect(() => {
    if (
      mutate.isError &&
      mutate.error.response.data.message &&
      mutate.error.response.status != "500"
    ) {
      setError([mutate.error.response.data.message]);
    }
  }, [mutate.isError]);
  useEffect(() => {
    if (mutate.isError && mutate.error.response.data.message) {
      setError([mutate.error.response.data.message]);
    }
  }, [mutate.isError]);
  const handleUserUpdate = (e) => {
    e.preventDefault();

    if (inputState.userName?.trim() === "" || inputState.userName === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, userNameIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, userNameIsValid: true }));
    }

    if (inputState.email?.trim() === "" || inputState.email === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, emailIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, emailIsValid: true }));
    }

    if (
      inputState.studentId !== null &&
      inputState.studentId?.length > 0 &&
      inputState.teacherId !== null &&
      inputState.teacherId?.length > 0
    ) {
      setError((prev) => ["User cannot be student and teacher"]);
    }
    mutate.mutate();
  };
  let [inputState, dispatch] = useReducer(updateUserReducer, {});
  useEffect(() => {
    if (userQuery.isSuccess) {
      if (!inputState.userName) {
        dispatch({
          type: "init",
          payload: userQuery.data?.data,
        });
      }
    }
  }, [userQuery.isSuccess]);
  if (
    userQuery.isLoading ||
    isLoadingStudents ||
    isLoadingTeacher ||
    isLoadingRole
  ) {
    return <h1>...isLoading</h1>;
  }
  if (userQuery.isError) {
    return <h1 className="errorMessage">Student Not found</h1>;
  }
  console.log("inputState", inputState);
  console.log(userQuery.data?.data, "User data");
  return (
    <div className="update-student">
      <div className="container">
        <section className="title">
          <div className="title-left">
            <h1>Update Student</h1>
          </div>
          <div className="title-right">
            <h1>User/Update User</h1>
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
                defaultValue={userQuery.data?.data.userName}
                onChange={(e) =>
                  dispatch({
                    type: "userName",
                    payload: e.target.value,
                  })
                }
                error={enteredValueisValid.userNameIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.userNameIsValid && "User Name required"
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                defaultValue={userQuery.data?.data.email}
                onChange={(e) =>
                  dispatch({
                    type: "email",
                    payload: e.target.value,
                  })
                }
                error={enteredValueisValid.emailIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.emailIsValid && `Email required`
                }
              />
              <TextField
                type="password"
                size="small"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={(e) =>
                  dispatch({
                    type: "password",
                    payload: e.target.value,
                  })
                }
                error={enteredValueisValid.userNameIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.userNameIsValid && "User Name required"
                }
              />
              <TextField
                type="password"
                size="small"
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                onChange={(e) =>
                  dispatch({
                    type: "confirmPassword",
                    payload: e.target.value,
                  })
                }
                error={enteredValueisValid.userNameIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.userNameIsValid && "User Name required"
                }
              />
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="isactive"
                label="IsActive"
                displayEmpty
                value={inputState.isActive}
                defaultValue={userQuery.data?.data.isActive}
                onChange={(e) =>
                  dispatch({
                    type: "isActive",
                    payload: e.target.value,
                  })
                }
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={false}>No</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
              </Select>
              {userQuery.data?.data.studentId ? (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={studentData?.data ?? []}
                  getOptionLabel={(option) => option.studentName}
                  defaultValue={studentData?.data.find(
                    (student) => student.id === userQuery.data?.data.studentId
                  )}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Student" />
                  )}
                  onChange={(e, newValue) =>
                    dispatch({
                      type: "studentId",
                      payload: newValue ? newValue.id : null,
                    })
                  }
                />
              ) : (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={studentData?.data ?? []}
                  getOptionLabel={(option) => option.studentName}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Student" />
                  )}
                  onChange={(e, newValue) =>
                    dispatch({
                      type: "studentId",
                      payload: newValue ? newValue.id : null,
                    })
                  }
                />
              )}

              {roleData && (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={roleData?.data ?? null}
                  getOptionLabel={(option) => option.name}
                  defaultValue={[
                    ...roleData?.data.filter((role) =>
                      userQuery.data?.data.roleId?.some(
                        (roleId) => roleId === role.id
                      )
                    ),
                  ]}
                  onChange={(e, newValue) => {
                    if (newValue) {
                      dispatch({
                        type: "roleId",
                        payload: newValue?.map((role) => role.id),
                      });
                    } else {
                      dispatch({
                        type: "roleId",
                        payload: [],
                      });
                    }
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} label="Roles" placeholder="Roles" />
                  )}
                />
              )}
              {userQuery.data?.data.teacherId ? (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={teacherData?.data ?? []}
                  getOptionLabel={(option) => option.fullName}
                  defaultValue={teacherData?.data.find(
                    (teacher) => teacher.id === userQuery.data?.data.teacherId
                  )}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Teacher" />
                  )}
                  onChange={(e, newValue) =>
                    dispatch({
                      type: "teacherId",
                      payload: newValue ? newValue.id : null,
                    })
                  }
                  value={
                    teacherData?.data.find(
                      (item) => item.id === inputState?.teacherId
                    ) || null
                  }
                />
              ) : (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={teacherData?.data ?? []}
                  getOptionLabel={(option) => option.fullName}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Teacher" />
                  )}
                  onChange={(e, newValue) =>
                    dispatch({
                      type: "teacherId",
                      payload: newValue ? newValue.id : null,
                    })
                  }
                  value={
                    teacherData?.data.find(
                      (item) => item.id === inputState?.teacherId
                    ) || null
                  }
                />
              )}

              <div className="errorMessage">
                {error ? error.map((err) => <h1>{err}</h1>) : ""}
              </div>
              <Button
                type="submit"
                onClick={handleUserUpdate}
                variant="contained"
              >
                Update student
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default UpdateUserAdmin;
