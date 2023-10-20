import "./createStudentAdmin.scss";
import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../hooks";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Group, MuseumRounded } from "@mui/icons-material";
import dayjs from "dayjs";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "../../../QueryKeys";
const CreateStudentAdmin = () => {
  const { studentServices, groupServices, userServices } = useService();

  const [newStudent, setNewStudent] = useState({
    dateOfBirth: null,
    mainGroup: null,
    groupId: [],
    appUserId: null,
    fullName: "",
    yearOfGraduation: "",
    educationDegree: "",
    formOfEducation: "",
    typeOfPayment: "",
    homePhoneNumber: "",
    phoneNumber: "",
    email: "",
    gender: "",
  });
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    fullNameIsValid: true,
    yearOfGraduation: true,
    educationDegree: true,
    formOfEducation: true,
    typeOfPayment: true,
    phoneNumber: true,
    homePhoneNumber: true,
    email: true,
  });
  let formValid = true;

  const [birthday, setBirthday] = useState();
  const navigate = useNavigate();
  const { data: userData } = useQuery([queryKeys.getUsers], () =>
    userServices.getAllUser()
  );
  const [userInputValue, setUserInputValue] = useState();
  const { data: groupData } = useQuery([queryKeys.getGroupsQuery], () =>
    groupServices.getAllGroups()
  );
  const [mainGroup, setMainGroup] = useState();
  const [mainGroupInputValue, setMainGroupInputValue] = useState();
  const handleStudent = ({
    target: { value: inputValue, name: inputName },
  }) => {
    setNewStudent((prev) => ({ ...prev, [inputName]: inputValue.trim() }));
    console.log(newStudent);
  };
  const mutate = useMutation(() => studentServices.createStudent(newStudent), {
    onSuccess: () => navigate(-1),
  });
  console.log("Student", newStudent);

  const [error, setError] = useState();
  useEffect(() => {
    if (
      mutate.isError &&
      mutate.error.response.data.message &&
      mutate.error.response.status != "500"
    ) {
      setError(mutate.error.response.data.message);
    } else if (mutate.isError && mutate.error.response.data.errors) {
      if (mutate.error.response.data.errors.DateOfBirth) {
        setError(mutate.error.response.data.errors.DateOfBirth[0]);
      }
    }
  }, [mutate]);
  const handleBirthday = (date) => {
    setNewStudent((prev) => ({
      ...prev,
      dateOfBirth: `${date.$y}-${
        date.$M < 9 ? `0${date.$M + 1}` : `${date.$M + 1}`
      }-${date.$D < 9 ? `0${date.$D}` : `${date.$D}`}T18:47:20.116`,
    }));
  };
  const handleNewStudent = (e) => {
    e.preventDefault();
    if (
      newStudent.fullName.trim() === "" ||
      newStudent.fullName === null ||
      newStudent.fullName.trim().length < 3
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, fullNameIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, fullNameIsValid: true }));
    }

    if (
      newStudent.yearOfGraduation.trim() === "" ||
      newStudent.yearOfGraduation < 1900 ||
      newStudent.yearOfGraduation > new Date().getFullYear
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, yearOfGraduation: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, yearOfGraduation: true }));
    }

    if (newStudent.educationDegree.trim() === "") {
      setEnteredValueIsValid((prev) => ({ ...prev, educationDegree: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, educationDegree: true }));
    }

    if (newStudent.formOfEducation.trim() === "") {
      setEnteredValueIsValid((prev) => ({ ...prev, formOfEducation: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, formOfEducation: true }));
    }

    if (newStudent.typeOfPayment.trim() === "") {
      setEnteredValueIsValid((prev) => ({ ...prev, typeOfPayment: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, typeOfPayment: true }));
    }
    if (newStudent.homePhoneNumber.trim() === "") {
      setEnteredValueIsValid((prev) => ({ ...prev, homePhoneNumber: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, homePhoneNumber: true }));
    }
    if (newStudent.phoneNumber.trim() === "") {
      setEnteredValueIsValid((prev) => ({ ...prev, phoneNumber: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, phoneNumber: true }));
    }
    if (newStudent.email.trim() === "") {
      setEnteredValueIsValid((prev) => ({ ...prev, email: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, email: true }));
    }

    mutate.mutate(newStudent);
  };
  console.log(mutate);

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
                name="fullName"
                onChange={handleStudent}
                error={enteredValueisValid.fullNameIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.fullNameIsValid &&
                  "Full name must be minimum 3 length"
                }
              />
              <TextField
                type="number"
                size="small"
                id="outlined-basic"
                label="Year Of Graduation"
                variant="outlined"
                name="yearOfGraduation"
                onChange={handleStudent}
                error={enteredValueisValid.yearOfGraduation ? "" : "error"}
                helperText={
                  !enteredValueisValid.yearOfGraduation &&
                  `Year of graduation must be between 1900 and ${new Date().getFullYear()}`
                }
              />

              <TextField
                size="small"
                id="outlined-basic"
                label="Education Degree"
                variant="outlined"
                name="educationDegree"
                onChange={handleStudent}
                error={enteredValueisValid.educationDegree ? "" : "error"}
                helperText={
                  !enteredValueisValid.educationDegree &&
                  "Education degree required"
                }
              />

              <TextField
                size="small"
                id="outlined-basic"
                label="Form Of Education"
                variant="outlined"
                name="formOfEducation"
                onChange={handleStudent}
                error={enteredValueisValid.formOfEducation ? "" : "error"}
                helperText={
                  !enteredValueisValid.formOfEducation &&
                  "Form Of Education required"
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Type Of Payment"
                variant="outlined"
                name="typeOfPayment"
                onChange={handleStudent}
                error={enteredValueisValid.typeOfPayment ? "" : "error"}
                helperText={
                  !enteredValueisValid.typeOfPayment &&
                  "Type Of Payment required"
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Home Phone Number"
                variant="outlined"
                name="homePhoneNumber"
                onChange={handleStudent}
                error={enteredValueisValid.homePhoneNumber ? "" : "error"}
                helperText={
                  !enteredValueisValid.homePhoneNumber &&
                  "Home Phone Number required"
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                name="phoneNumber"
                onChange={handleStudent}
                error={enteredValueisValid.homePhoneNumber ? "" : "error"}
                helperText={
                  !enteredValueisValid.homePhoneNumber &&
                  " Phone Number required"
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                onChange={handleStudent}
                error={enteredValueisValid.email ? "" : "error"}
                helperText={
                  !enteredValueisValid.email && "Type Of Payment required"
                }
              />
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="gender"
                value={newStudent?.gender}
                label="Gender"
                displayEmpty
                onChange={handleStudent}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
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
                name="appUserId"
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="User" />}
                onChange={(e, newValue) => {
                  setNewStudent((prev) => ({
                    ...prev,
                    appUserId: newValue.id,
                  }));
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={birthday} onChange={handleBirthday} />
              </LocalizationProvider>

              <Autocomplete
                disablePortal
                id="combo-box-mainGroup"
                size="small"
                options={groupData?.data ?? []}
                getOptionLabel={(option) => option.name}
                onChange={(e, newValue) => {
                  setNewStudent((prev) => ({
                    ...prev,
                    mainGroup: newValue?.id,
                  }));
                }}
                inputValue={mainGroupInputValue}
                onInputChange={(e, newValue) => {
                  setMainGroupInputValue(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Main Group" />
                )}
              />
              {groupData && (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={groupData?.data ?? null}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, newValue) => {
                    if (newValue) {
                      setNewStudent((prev) => ({
                        ...prev,
                        groupId: newValue.map((group) => group.id),
                      }));
                    } else {
                      setNewStudent((prev) => ({
                        ...prev,
                        groups: [],
                      }));
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

              <div className="errorMessage">{error}</div>
              <Button
                type="submit"
                onClick={handleNewStudent}
                variant="contained"
              >
                Create student
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreateStudentAdmin;
