import {
  Autocomplete,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
import { TokenContext } from "../../../../Contexts/Token-context";
import jwtDecode from "jwt-decode";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
import { queryKeys } from "../../../../QueryKeys";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";

const CreateSubjectHourAdmin = () => {
  const { subjectHourServices, groupSubjectServices, lessonTypesServices } =
    useService();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken[tokenRoleProperty] !== "Admin") {
        navigate("Error");
      }
    }
  });
  const lessonTypeQuery = useQuery([queryKeys.GetLessonTypes], () =>
    lessonTypesServices.getAllLessonTypes(token)
  );
  const groupSubjectQuery = useQuery([queryKeys.getGroupSubjects], () =>
    groupSubjectServices.getAllGroupSubjects(token)
  );

  const [newSubjectHour, setNewSubjectHour] = useState({
    dayOfWeek: "",
    lessonTypeId: "",
    room: "",
    groupSubjectId: "",
    startTime: "",
    endTime: "",
  });
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    dayOfTheWeekIsValid: true,
    lessonTypeIdIsValid: true,
    roomIsValid: true,
    startTimeIsValid: true,
    endTimeIsValid: true,
    groupSubjectIdIsValid: true,
  });
  let formValid = true;

  const handleSubjectHour = ({
    target: { value: inputValue, name: inputName },
  }) => {
    setNewSubjectHour((prev) => ({ ...prev, [inputName]: inputValue }));
  };
  const handleStartTime = (newValue) => {
    setNewSubjectHour((prev) => ({
      ...prev,
      startTime: dayjs(newValue).format("HH:mm:ss"),
    }));
  };
  const handleEndTime = (newValue) => {
    setNewSubjectHour((prev) => ({
      ...prev,
      endTime: dayjs(newValue).format("HH:mm:ss"),
    }));
  };
  const mutate = useMutation(
    () => subjectHourServices.createSubjectHours(newSubjectHour, token),
    {
      onSuccess: () => navigate("/SubjectHours"),
    }
  );
  useEffect(() => {
    if (
      mutate.isError &&
      mutate.error.response.data.message &&
      mutate.error.response.status != "500"
    ) {
      setError(mutate.error.response.data.message);
    }
  }, [mutate]);
  const [lessonTypeInputValue, setLessonTypeInputValue] = useState();
  const [groupSubjectInputValue, setGroupSubjectInputValue] = useState();
  const handleNewSubjectHour = (e) => {
    e.preventDefault();
    if (
      newSubjectHour.dayOfTheWeek === "" ||
      newSubjectHour.dayOfTheWeek === null
    ) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        dayOfTheWeekIsValid: false,
      }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: true }));
    }
    if (
      newSubjectHour.lessonTypeId === "" ||
      newSubjectHour.lessonTypeId === null
    ) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        lessonTypeIdIsValid: false,
      }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, lessonTypeId: true }));
    }
    if (
      newSubjectHour.groupSubjectId === "" ||
      newSubjectHour.groupSubjectId === null
    ) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        groupSubjectIdIsValid: false,
      }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({
        ...prev,
        groupSubjectIdIsValid: true,
      }));
    }
    if (newSubjectHour.room === "" || newSubjectHour.room === null) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        roomIsValid: false,
      }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({
        ...prev,
        roomIsValid: true,
      }));
    }

    if (formValid) {
      mutate.mutate(newSubjectHour);
    }
  };
  console.log(newSubjectHour);
  if (lessonTypeQuery.isLoading || groupSubjectQuery.isLoading) {
    return <h1>... Is Loading</h1>;
  }

  return (
    <div className="update-student">
      <div className="container">
        <AdminGroupTitle
          child1={"Subject Hour"}
          child2={"Subject Hour / Create Subject Hours"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Subject Hour Form</h1>
          </div>
          <div className="inputs">
            <Box
              display={"flex"}
              flexDirection={"column"}
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "65ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                size="small"
                id="outlined-basic"
                label="Room"
                variant="outlined"
                name="room"
                onChange={handleSubjectHour}
                error={enteredValueisValid.roomIsValid ? "" : "error"}
                helperText={!enteredValueisValid.roomIsValid && "Room required"}
              />
              {/* <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newSubjectHour.dayOfTheWeek}
                label="Day of the week"
                name="dayOfTheWeel"
                onChange={handleSubjectHour}
              ></Select> */}
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Day Of The Week"
                size="small"
                onChange={handleSubjectHour}
                name="dayOfWeek"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Monday</MenuItem>
                <MenuItem value={2}>Tuesday</MenuItem>
                <MenuItem value={3}>Wednesday</MenuItem>
                <MenuItem value={4}>Thursday</MenuItem>
                <MenuItem value={5}>Friday</MenuItem>
                <MenuItem value={6}>Saturday</MenuItem>
                <MenuItem value={0}>Sunday</MenuItem>
              </Select>
              <Autocomplete
                disablePortal
                id="combo-box-group"
                size="small"
                options={lessonTypeQuery.data?.data ?? []}
                getOptionLabel={(option) => option.name}
                onChange={(e, newValue) => {
                  setNewSubjectHour((prev) => ({
                    ...prev,
                    lessonTypeId: newValue?.id,
                  }));
                }}
                inputValue={lessonTypeInputValue}
                onInputChange={(e, newValue) => {
                  setLessonTypeInputValue(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Lesson Type" />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-group"
                size="small"
                options={groupSubjectQuery.data?.data ?? []}
                getOptionLabel={(option) =>
                  ` ${option.group.name} - ${option.subject.name}`
                }
                onChange={(e, newValue) => {
                  setNewSubjectHour((prev) => ({
                    ...prev,
                    groupSubjectId: newValue?.id,
                  }));
                }}
                inputValue={groupSubjectInputValue}
                onInputChange={(e, newValue) => {
                  setGroupSubjectInputValue(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Group Subject" />
                )}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimeField", "TimeField"]}>
                  <TimeField
                    label="Start Time"
                    value={newSubjectHour.startTime}
                    onChange={(newValue) => handleStartTime(newValue)}
                  />
                  <TimeField
                    label="End Time"
                    value={newSubjectHour.endTime}
                    onChange={(newValue) => handleEndTime(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <div className="errorMessage">
                <h1>{error}</h1>
              </div>
              <Button
                type="submit"
                onClick={handleNewSubjectHour}
                variant="contained"
              >
                Create Subject Hours
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreateSubjectHourAdmin;
