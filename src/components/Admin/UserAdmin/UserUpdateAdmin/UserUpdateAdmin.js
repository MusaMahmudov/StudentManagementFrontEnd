import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { queryKeys } from "../../../../QueryKeys";
import { updateUserReducer } from "../../../../Reducers/UpdateUserReducer";
const UpdateUserAdmin = () => {
  const [error, setError] = useState();

  const { Id } = useParams();
  const navigate = useNavigate();
  const { teacherServices, studentServices, userServices, roleServices } =
    useService();
  const userQuery = useQuery([queryKeys.getUser], () =>
    userServices.getUserByIdForUpdate(Id)
  );
  const { data: studentData } = useQuery([queryKeys.getStudentsQuery], () =>
    studentServices.getAllStudents()
  );
  const { data: roleData } = useQuery([queryKeys.GetRoles], () =>
    roleServices.getAllRoles()
  );
  const { data: teacherData } = useQuery([queryKeys.getTeachers], () =>
    teacherServices.getAllTeachers()
  );
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    userNameIsValid: true,
    passwordIsValid: true,
    emailIsValid: true,
  });
  const mutate = useMutation(() => userServices.updateUser(Id, inputState), {
    onSuccess: () => {
      navigate("/Users");
    },
  });
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
  const [roleIdInputValue, setRoleIdInputValue] = useState(
    inputState.roleId ?? null
  );
  const [studentIdInputValue, setStudentIdInputValue] = useState(
    inputState.studentId ?? null
  );
  const [teacherIdInputValue, setTeacherIdInputValue] = useState(
    userQuery.data?.data.teacherId?.id ?? null
  );
  useEffect(() => {
    if (userQuery.isSuccess) {
      if (!inputState.userName) {
        setStudentIdInputValue(userQuery.data?.data.studentId);
        setTeacherIdInputValue(userQuery.data?.data.teacherId);

        dispatch({
          type: "init",
          payload: userQuery.data?.data,
        });
      }
    }
  }, [userQuery.isSuccess]);
  if (userQuery.isLoading) {
    return <h1>...isLoading</h1>;
  }
  if (userQuery.isError) {
    return <h1 className="errorMessage">Student Not found</h1>;
  }
  console.log("inputState", inputState);

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

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={studentData?.data ?? []}
                getOptionLabel={(option) => option.fullName}
                inputValue={studentIdInputValue}
                onInputChange={(e, newValue) => {
                  setStudentIdInputValue(newValue);
                }}
                value={
                  studentData?.data.find(
                    (item) => item.id === userQuery.data?.data.studentId
                  ) || null
                }
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
              {roleData && (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={roleData?.data ?? null}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, newValue) => {
                    if (newValue) {
                      dispatch({
                        type: "roleId",
                        payload: newValue.map((role) => role.id),
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

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={teacherData?.data ?? []}
                getOptionLabel={(option) => option.fullName}
                inputValue={teacherIdInputValue}
                onInputChange={(e, newValue) => {
                  setTeacherIdInputValue(newValue);
                }}
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

              <div className="errorMessage">
                <h1>{error}</h1>
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
