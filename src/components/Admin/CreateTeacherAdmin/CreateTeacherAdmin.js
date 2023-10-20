import "./createTeacherAdmin.scss";

import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation, useQueries, useQuery } from "react-query";
import useService from "../../../hooks";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "../../../QueryKeys";
const CreateTeacherAdmin = () => {
  const { teacherServices, userServices } = useService();

  const [newTeacher, setNewTeacher] = useState({
    dateOfBirth: null,
    appUserId: null,
    fullName: "",
    mobileNumber: "",
    eMail: "",
    gender: "",
    address: "",
  });
  const { data: userData } = useQuery([queryKeys.getUsers], () =>
    userServices.getAllUser()
  );
  const [userInputValue, setUserInputValue] = useState();
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    dateOfBirthIsValid: true,
    fullNameIsValid: true,
    mobileNumberIsValid: true,
    eMailIsValid: true,
    genderIsValid: true,
    addressIsValid: true,
  });
  let formValid = true;

  const [birthday, setBirthday] = useState();
  const navigate = useNavigate();
  const handleTeacher = ({
    target: { value: inputValue, name: inputName },
  }) => {
    setNewTeacher((prev) => ({ ...prev, [inputName]: inputValue.trim() }));
    console.log(newTeacher);
  };
  const mutate = useMutation(() => teacherServices.createTeacher(newTeacher), {
    onSuccess: () => navigate(-1),
  });

  const handleBirthday = (date) => {
    console.log(date);
    setNewTeacher((prev) => ({
      ...prev,
      dateOfBirth: `${date.$y}-${
        date.$M < 9 ? `0${date.$M + 1}` : `${date.$M + 1}`
      }-${date.$D < 9 ? `0${date.$D}` : `${date.$D}`}T18:47:20.116`,
    }));
  };
  console.log(mutate);
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
  useEffect(() => {
    if (
      newTeacher.dateOfBirth === "" ||
      (newTeacher.dateOfBirth === null && mutate.isError)
    ) {
      setError("Date of birth required");
    }
  }, [mutate.isError]);
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
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="gender"
                value={newTeacher?.gender}
                label="Gender"
                displayEmpty
                onChange={handleTeacher}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>

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
                  setNewTeacher((prev) => ({
                    ...prev,
                    appUserId: newValue.id,
                  }));
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={birthday} onChange={handleBirthday} />
              </LocalizationProvider>

              <div className="errorMessage">{error}</div>
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
