import {
  Autocomplete,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useReducer, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../hooks";
import { queryKeys } from "../../../QueryKeys";
import { updateStudentReducer } from "../../../Reducers/UpdateStudentReducer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { updateTeacherReduce } from "../../../Reducers/UpdateTeacherReducer";
import { TokenContext } from "../../../Contexts/Token-context";
const UpdateTeacherAdmin = () => {
  const { teacherServices, userServices } = useService();
  const { data: userData } = useQuery([queryKeys.getUsers], () =>
    userServices.getAllUser(token)
  );
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);

  const { Id } = useParams();
  const teacherQuery = useQuery([queryKeys.getTeacherById], () =>
    teacherServices.getTeacherByIdForUpdate(Id, token)
  );
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    dateOfBirthIsValid: true,
    fullNameIsValid: true,
    mobileNumberIsValid: true,
    eMailIsValid: true,
    genderIsValid: true,
    addressIsValid: true,
  });
  const [userInputValue, setUserInputValue] = useState();

  console.log("teacherData", teacherQuery.data?.data);
  const [error, setError] = useState();
  const mutate = useMutation(
    () => teacherServices.updateTeacher(Id, inputState, token),
    {
      onSuccess: () => navigate("/Teachers"),
    }
  );
  useEffect(() => {
    if (
      mutate.isError &&
      mutate.error.response.data.message &&
      mutate.error.response.status != "500"
    ) {
      setError(mutate.error.response.data.message);
    } else if (
      mutate.isError &&
      mutate.error.response.data.errors?.DateOfBirth
    ) {
      setError(mutate.error.response?.data.errors.DateOfBirth[0]);
    }
  }, [mutate]);

  console.log(error);
  const handleTeacherUpdate = (e) => {
    e.preventDefault();
    if (
      inputState.fullName.trim() === "" ||
      inputState.fullName === null ||
      inputState.fullName.trim().length < 3
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, fullNameIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, fullNameIsValid: true }));
    }

    if (inputState.email.trim() === "" || inputState.email === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, eMailIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, eMailIsValid: true }));
    }

    if (inputState.gender.trim() === "" || inputState.gender === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, genderIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, genderIsValid: true }));
    }

    if (inputState.address.trim() === "" || inputState.address === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, addressIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, addressIsValid: true }));
    }

    if (
      inputState.mobileNumber.trim() === "" ||
      inputState.mobileNumber === null
    ) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        mobileNumberIsValid: false,
      }));
    } else {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        mobileNumberIsValid: true,
      }));
    }
    mutate.mutate();
  };

  let [inputState, dispatch] = useReducer(updateTeacherReduce, {});
  const handleBirthday = (date) => {
    console.log(date);
    dispatch({
      type: "dateOfBirth",
      payload: dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSS"),
    });
  };
  console.log("UserInput", userInputValue);
  useEffect(() => {
    if (teacherQuery.isSuccess) {
      setUserInputValue(teacherQuery.data?.data.appUserId ?? null);

      dispatch({
        type: "init",
        payload: teacherQuery.data?.data,
      });
    }
  }, [teacherQuery.isSuccess]);
  console.log("inputState", inputState);
  if (teacherQuery.isLoading) {
    return <h1>...isLoading</h1>;
  }

  return (
    <div className="update-student">
      <div className="container">
        <section className="title">
          <div className="title-left">
            <h1>Update Teacher</h1>
          </div>
          <div className="title-right">
            <h1>Teacher/Update Teacher</h1>
          </div>
        </section>
        <section className="form">
          <div className="form-title">
            <h1>Teacher Information</h1>
          </div>
          <div className="inputs">
            <Box
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
                label="Full Name"
                variant="outlined"
                defaultValue={teacherQuery.data?.data.fullName}
                onChange={(e) =>
                  dispatch({
                    type: "fullName",
                    payload: e.target.value,
                  })
                }
                error={enteredValueisValid.fullNameIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.fullNameIsValid &&
                  "Full name must be minimum 3 length "
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                defaultValue={teacherQuery.data?.data.email}
                onChange={(e) =>
                  dispatch({
                    type: "email",
                    payload: e.target.value,
                  })
                }
                error={enteredValueisValid.eMailIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.eMailIsValid && "Email required"
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Mobile Number"
                variant="outlined"
                defaultValue={teacherQuery.data?.data.mobileNumber}
                onChange={(e) =>
                  dispatch({
                    type: "mobileNumber",
                    payload: e.target.value,
                  })
                }
                error={enteredValueisValid.mobileNumberIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.mobileNumberIsValid && "Email required"
                }
              />
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={inputState?.gender}
                label="Gender"
                defaultValue={teacherQuery.data?.data.gender}
                onChange={(e) => {
                  dispatch({
                    type: "gender",
                    payload: e.target.value,
                  });
                }}
                error={enteredValueisValid.genderIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.genderIsValid && "Email required"
                }
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
              <Autocomplete
                disablePortal
                id="combo-box-mainGroup"
                size="small"
                options={userData?.data ?? []}
                getOptionLabel={(option) => option.userName}
                onChange={(e, newValue) => {
                  dispatch({
                    type: "appUserId",
                    payload: newValue?.id,
                  });
                }}
                inputValue={userInputValue}
                onInputChange={(e, newValue) => {
                  setUserInputValue(newValue.id);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="User" />}
              />

              <TextField
                size="small"
                id="outlined-basic"
                label="Home Phone Number"
                variant="outlined"
                defaultValue={teacherQuery.data?.data.address}
                onChange={(e) =>
                  dispatch({
                    type: "address",
                    payload: e.target.value,
                  })
                }
                error={enteredValueisValid.addressIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.addressIsValid && "Email required"
                }
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(inputState?.dateOfBirth)}
                  defaultValue={dayjs(teacherQuery.data?.data.dateOfBirth)}
                  onChange={handleBirthday}
                />
              </LocalizationProvider>
              <div className="errorMessage">{error}</div>
              <Button
                type="submit"
                onClick={handleTeacherUpdate}
                variant="contained"
              >
                Update Teacher
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default UpdateTeacherAdmin;
