import "./createStudentAdmin.scss";
import { Box, Button, Select, TextField } from "@mui/material";
import { useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../hooks";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuseumRounded } from "@mui/icons-material";
import dayjs from "dayjs";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const CreateStudentAdmin = () => {
  const [newStudent, setNewStudent] = useState({
    dateOfBirth: new Date("2003-05-16T00:00:00"),
    mainGroup: null,
    groups: [],
    appUserId: null,
    fullName: "",
    yearOfGraduation: "",
    educationDegree: "",
    formOfEducation: "",
    typeOfPayment: "",
    homePhoneNumber: "",
    phoneNumber: "",
    email: "",
    gender: "Male",
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
  const { studentServices } = useService();
  const handleStudent = ({
    target: { value: inputValue, name: inputName },
  }) => {
    setNewStudent((prev) => ({ ...prev, [inputName]: inputValue.trim() }));
    console.log(newStudent);
  };
  const mutate = useMutation(() => studentServices.createStudent(newStudent), {
    onSuccess: () => navigate(-1),
  });

  const handleBirthday = ({ date }) => {
    setNewStudent((prev) =>
      setNewStudent({
        ...prev,
        dateOfBirthday: `${date.$Y}-${date.$M}-${date.$D}T18:47:20.116`,
      })
    );
  };
  const handleNewStudent = (e) => {
    e.preventDefault();
    if (newStudent.fullName.trim() === "") {
      setEnteredValueIsValid((prev) => ({ ...prev, fullNameIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, fullNameIsValid: true }));
    }

    if (newStudent.yearOfGraduation.trim() === "") {
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
                  !enteredValueisValid.fullNameIsValid && "Full name required"
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Year Of Graduation"
                variant="outlined"
                name="yearOfGraduation"
                onChange={handleStudent}
                error={enteredValueisValid.yearOfGraduation ? "" : "error"}
                helperText={
                  !enteredValueisValid.yearOfGraduation &&
                  "Year of graduation required"
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

              {/* <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={studentData?.data.gender}
                  label="Age"
                  onChange={(e) =>
                    dispatch({
                      type: "gender",
                      payload: e.target.value,
                    })
                  }
                >
                  <MenuItem value={studentData?.data.gender}>
                    {inputState.gender}
                  </MenuItem>
                  <MenuItem
                    value={inputState.gender == "Male" ? "Female" : "Male"}
                  >
                    {inputState.gender == "Male" ? "Female" : "Male"}
                  </MenuItem>
                </Select> */}

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
              <TextField
                size="small"
                id="outlined-basic"
                label="AppUserId"
                variant="outlined"
                name="appUserId"
                onChange={handleStudent}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={birthday} onChange={handleBirthday} />
              </LocalizationProvider>

              <Select
                multiple
                native
                label="Groups"
                inputProps={{
                  id: "select-multiple-native",
                }}
              ></Select>
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
