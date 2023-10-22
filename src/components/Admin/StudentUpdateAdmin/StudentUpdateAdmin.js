import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./studentUpdateAdmin.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useReducer, useState } from "react";
import { useMutation, useQuery } from "react-query";
import useService from "../../../hooks";
import { queryKeys } from "../../../QueryKeys";
import { updateStudentReducer } from "../../../Reducers/UpdateStudentReducer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { TokenContext } from "../../../Contexts/Token-context";
import jwtDecode from "jwt-decode";
import { tokenRoleProperty } from "../../../utils/TokenProperties";
const UpdateStudentAdmin = () => {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);

  const { groupServices, studentServices, userServices } = useService();
  const { data: userData } = useQuery([queryKeys.getUsers], () =>
    userServices.getAllUser(token)
  );
  const { Id } = useParams();
  const studentQuery = useQuery([queryKeys.getStudentByIdQuery], () =>
    studentServices.getStudentByIdForUpdate(Id, token)
  );
  const { data: groupData } = useQuery([queryKeys.getGroupsQuery], () =>
    groupServices.getAllGroups()
  );
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    fullNameIsValid: true,
    yearOfGraduationIsValid: true,
    educationDegreeIsValid: true,
    formOfEducationIsValid: true,
    typeOfPaymentIsValid: true,
    phoneNumberIsValid: true,
    homePhoneNumberIsValid: true,
    emailIsValid: true,
    date0fBirthIsValid: true,
  });
  console.log(groupData);
  console.log("studentDATA", studentQuery.data?.data);
  const [newBirthday, setNewBirthday] = useState(
    studentQuery.data?.data.date0fBirth
  );

  const mutate = useMutation(
    () => studentServices.updateStudent(Id, inputState, token),
    {
      onSuccess: () => {
        navigate("/Students");
      },
    }
  );
  console.log("enteredValue", enteredValueisValid);
  const handleStudentUpdate = (e) => {
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

    if (
      inputState.yearOfGraduation === "" ||
      inputState.yearOfGraduation < 1900 ||
      inputState.yearOfGraduation > new Date().getFullYear() ||
      inputState.yearOfGraduation === null
    ) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        yearOfGraduationIsValid: false,
      }));
    } else {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        yearOfGraduationIsValid: true,
      }));
    }
    if (
      inputState.date0fBirth === "" ||
      inputState.date0fBirth > new Date().getFullYear() - 18 ||
      inputState.date0fBirth === null
    ) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        date0fBirthIsValid: false,
      }));
    } else {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        date0fBirthIsValid: true,
      }));
    }

    if (
      inputState.educationDegree.trim() === "" ||
      inputState.educationDegree === null
    ) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        educationDegreeIsValid: false,
      }));
    } else {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        educationDegreeIsValid: true,
      }));
    }

    if (
      inputState.formOfEducation.trim() === "" ||
      inputState.formOfEducation === null
    ) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        formOfEducationIsValid: false,
      }));
    } else {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        formOfEducationIsValid: true,
      }));
    }

    if (
      inputState.typeOfPayment.trim() === "" ||
      inputState.typeOfPayment === null
    ) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        typeOfPaymentIsValid: false,
      }));
    } else {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        typeOfPaymentIsValid: true,
      }));
    }
    if (
      inputState.homePhoneNumber.trim() === "" ||
      inputState.homePhoneNumber === null
    ) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        homePhoneNumberIsValid: false,
      }));
    } else {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        homePhoneNumberIsValid: true,
      }));
    }
    if (
      inputState.phoneNumber.trim() === "" ||
      inputState.phoneNumber === null
    ) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        phoneNumberIsValid: false,
      }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, phoneNumberIsValid: true }));
    }
    if (inputState.email.trim() === "" || inputState.email === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, emailIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, emailIsValid: true }));
    }

    mutate.mutate();
  };
  const [error, setError] = useState();
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
  const handleBirthday = (date) => {
    dispatch({
      type: "dateOfBirth",
      patload: dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSS"),
    });
  };
  let [inputState, dispatch] = useReducer(updateStudentReducer, {});

  const [mainGroupInputValue, setMainGroupInputValue] = useState(
    studentQuery.data?.data.mainGroup ?? null
  );
  const [userInputValue, setUserInputValue] = useState(
    studentQuery.data?.data.appUser?.id ?? null
  );
  useEffect(() => {
    if (studentQuery.isSuccess) {
      if (!inputState.fullName) {
        setUserInputValue(studentQuery.data?.data.appUser);
        dispatch({
          type: "init",
          payload: studentQuery.data?.data,
        });
      }
    }
  }, [studentQuery.isSuccess]);
  if (studentQuery.isLoading) {
    return <h1>...isLoading</h1>;
  }
  if (studentQuery.isError) {
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
            <h1>Student/Update Student</h1>
          </div>
        </section>
        <section className="form">
          <div className="form-title">
            <h1>Student Information</h1>
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
                defaultValue={studentQuery.data?.data.fullName}
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
                label="Year Of Graduation"
                variant="outlined"
                defaultValue={studentQuery.data?.data.yearOfGraduation}
                onChange={(e) =>
                  dispatch({
                    type: "yearOfGraduation",
                    payload: e.target.value,
                  })
                }
                error={
                  enteredValueisValid.yearOfGraduationIsValid ? "" : "error"
                }
                helperText={
                  !enteredValueisValid.yearOfGraduationIsValid &&
                  `Year of graduation minimum 1900 and maximum ${new Date().getFullYear()}`
                }
              />
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={inputState?.gender}
                label="Gender"
                defaultValue={studentQuery.data?.data.gender}
                onChange={(e) => {
                  dispatch({
                    type: "gender",
                    payload: e.target.value,
                  });
                }}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>

              <TextField
                size="small"
                id="outlined-basic"
                label="Education Degree"
                variant="outlined"
                defaultValue={studentQuery.data?.data.educationDegree}
                onChange={(e) =>
                  dispatch({
                    type: "educationDegree",
                    payload: e.target.value,
                  })
                }
                error={
                  enteredValueisValid.educationDegreeIsValid ? "" : "error"
                }
                helperText={
                  !enteredValueisValid.educationDegreeIsValid &&
                  "Education Degree  must be minimum 3 length "
                }
              />

              <TextField
                size="small"
                id="outlined-basic"
                label="Form Of Education"
                variant="outlined"
                defaultValue={studentQuery.data?.data.formOfEducation}
                onChange={(e) =>
                  dispatch({
                    type: "formOfEducation",
                    payload: e.target.value,
                  })
                }
                error={
                  enteredValueisValid.formOfEducationIsValid ? "" : "error"
                }
                helperText={
                  !enteredValueisValid.formOfEducationIsValid &&
                  "Form of Education  must be minimum 3 length "
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Type Of Payment"
                variant="outlined"
                defaultValue={studentQuery.data?.data.typeOfPayment}
                onChange={(e) =>
                  dispatch({
                    type: "typeOfPayment",
                    payload: e.target.value,
                  })
                }
                error={enteredValueisValid.typeOfPaymentIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.typeOfPaymentIsValid &&
                  "Type of Payment  must be minimum 3 length "
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Home Phone Number"
                variant="outlined"
                defaultValue={studentQuery.data?.data.homePhoneNumber}
                onChange={(e) =>
                  dispatch({
                    type: "homePhoneNumber",
                    payload: e.target.value,
                  })
                }
                error={
                  enteredValueisValid.homePhoneNumberIsValid ? "" : "error"
                }
                helperText={
                  !enteredValueisValid.homePhoneNumberIsValid &&
                  "Home Phone Number  required"
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                defaultValue={studentQuery.data?.data.phoneNumber}
                onChange={(e) =>
                  dispatch({
                    type: "phoneNumber",
                    payload: e.target.value,
                  })
                }
                error={enteredValueisValid.phoneNumberIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.phoneNumberIsValid &&
                  "Phone Number  required "
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                defaultValue={studentQuery.data?.data.email}
                onChange={(e) =>
                  dispatch({
                    type: "email",
                    payload: e.target.value,
                  })
                }
                error={enteredValueisValid.emailIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.emailIsValid && "Email  required "
                }
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={userData?.data ?? []}
                getOptionLabel={(option) => option.userName}
                inputValue={userInputValue}
                onInputChange={(e, newValue) => {
                  setUserInputValue(newValue);
                }}
                value={
                  userData?.data.find(
                    (item) => item.id === studentQuery.data?.data.appUser?.id
                  ) || null
                }
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="User" />}
                onChange={(e, newValue) =>
                  dispatch({
                    type: "appUserId",
                    payload: newValue ? newValue.id : null,
                  })
                }
              />
              {groupData && (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={groupData?.data ?? null}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, newValue) => {
                    if (newValue) {
                      dispatch({
                        type: "groups",
                        payload: newValue.map((group) => group.id),
                      });
                    } else {
                      dispatch({
                        type: "groups",
                        payload: [],
                      });
                    }
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Groups"
                      placeholder="Groups"
                    />
                  )}
                />
              )}

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={groupData?.data ?? []}
                getOptionLabel={(option) => option.name}
                inputValue={mainGroupInputValue}
                onInputChange={(e, newValue) => {
                  setMainGroupInputValue(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Main Group" />
                )}
                onChange={(e, newValue) =>
                  dispatch({
                    type: "mainGroup",
                    payload: newValue ? newValue.id : null,
                  })
                }
                value={
                  groupData?.data.find(
                    (item) => item.id === inputState?.mainGroup?.id
                  ) || null
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(inputState?.dateOfBirth)}
                  defaultValue={dayjs(studentQuery.data?.data.dateOfBirth)}
                  onChange={handleBirthday}
                />
              </LocalizationProvider>
              <div className="errorMessage">
                <h1>{error}</h1>
              </div>
              <Button
                type="submit"
                onClick={handleStudentUpdate}
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
export default UpdateStudentAdmin;
