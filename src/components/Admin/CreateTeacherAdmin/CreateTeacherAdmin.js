import "./createTeacherAdmin.scss";

import { Box, Button, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import useService from "../../../hooks";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
const CreateTeacherAdmin = () => {
  const [newTeacher, setNewTeacher] = useState({
    dateOfBirth: new Date("2003-05-16T00:00:00"),
    appUserId: null,
    fullName: "",
    mobileNumber: "",
    eMail: "",
    gender: "Male",
    address: "",
  });
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    dateOfBirth: new Date("2003-05-16T00:00:00"),
    fullNameIsValid: true,
    mobileNumberIsValid: true,
    eMailIsValid: true,
    genderIsValid: true,
    addressIsValid: true,
  });
  let formValid = true;

  const [birthday, setBirthday] = useState();
  const navigate = useNavigate();
  const { teacherServices } = useService();
  const handleTeacher = ({
    target: { value: inputValue, name: inputName },
  }) => {
    setNewTeacher((prev) => ({ ...prev, [inputName]: inputValue.trim() }));
    console.log(newTeacher);
  };
  const mutate = useMutation(() => teacherServices.createTeacher(newTeacher), {
    onSuccess: () => navigate(-1),
  });

  const handleBirthday = ({ date }) => {
    setNewTeacher((prev) =>
      setNewTeacher({
        ...prev,
        dateOfBirthday: `${date.$Y}-${date.$M}-${date.$D}T18:47:20.116`,
      })
    );
  };
  const handleNewTeacher = (e) => {
    e.preventDefault();
    if (newTeacher.fullName.trim() === "") {
      setEnteredValueIsValid((prev) => ({ ...prev, fullNameIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, fullNameIsValid: true }));
    }

    if (newTeacher.eMail.trim() === "") {
      setEnteredValueIsValid((prev) => ({ ...prev, eMailIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, eMailIsValid: true }));
    }

    if (newTeacher.gender.trim() === "") {
      setEnteredValueIsValid((prev) => ({ ...prev, genderIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, genderIsValid: true }));
    }

    if (newTeacher.address.trim() === "") {
      setEnteredValueIsValid((prev) => ({ ...prev, addressIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, addressIsValid: true }));
    }
    if (newTeacher.mobileNumber.trim() === "") {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        mobileNumberIsValid: false,
      }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({
        ...prev,
        mobileNumberIsValid: true,
      }));
    }
    if (formValid) {
      mutate.mutate(newTeacher);
    }
  };

  return (
    <div className="update-student">
      <div className="container">
        <section className="title">
          <div className="title-left">
            <h1>Create Teacher</h1>
          </div>
          <div className="title-right">
            <h1>Teacher / Create Teacher</h1>
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
                name="fullName"
                onChange={handleTeacher}
                error={enteredValueisValid.fullNameIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.fullNameIsValid && "Full name required"
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="eMail"
                onChange={handleTeacher}
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
                name="mobileNumber"
                onChange={handleTeacher}
                error={enteredValueisValid.mobileNumberIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.mobileNumberIsValid &&
                  "Mobile Number required"
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
                label="Address"
                variant="outlined"
                name="address"
                onChange={handleTeacher}
                error={enteredValueisValid.addressIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.addressIsValid && "Address  required"
                }
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={birthday} onChange={handleBirthday} />
              </LocalizationProvider>

              <Button
                type="submit"
                onClick={handleNewTeacher}
                variant="contained"
              >
                Create teacher
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreateTeacherAdmin;
