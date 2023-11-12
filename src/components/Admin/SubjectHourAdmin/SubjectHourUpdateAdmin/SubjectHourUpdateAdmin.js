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
import { queryKeys } from "../../../../QueryKeys";
import dayjs from "dayjs";
import { updateSubjectHourReducer } from "../../../../Reducers/UpdateSubjectHourReducer";
import { TokenContext } from "../../../../Contexts/Token-context";
import useService from "../../../../hooks";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
const UpdateSubjectHourAdmin = () => {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const { subjectHourServices, lessonTypesServices, groupSubjectServices } =
    useService();
  const { data: lessonTypeData, isLoading: isLoadingLessonType } = useQuery(
    [queryKeys.GetLessonTypes],
    () => lessonTypesServices.getAllLessonTypes(token)
  );

  const { Id } = useParams();
  const subjectHourQuery = useQuery([queryKeys.GetSubjectHour], () =>
    subjectHourServices.getSubjectHourByIdForUpdate(Id, token)
  );

  const { data: groupSubjectData, isLoading: isLoadingGroupSubject } = useQuery(
    [queryKeys.getGroupSubjects],
    () => groupSubjectServices.getAllGroupSubjectsForExamForUpdate(token)
  );
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    dayOfTheWeekIsValid: true,
    lessonTypeIdIsValid: true,
    roomIsValid: true,
    startTimeIsValid: true,
    endTimeIsValid: true,
    groupSubjectIdIsValid: true,
  });
  const [lessonTypeInputValue, setLessonTypeInputValue] = useState(
    subjectHourQuery.data?.data.lessonTypeId ?? null
  );
  const [groupSubjectInputValue, setGroupSubjectInputValue] = useState(
    subjectHourQuery.data?.data.groupSubjectId ?? null
  );

  const handleStartTime = (newValue) => {
    dispatch({
      type: "startTime",
      payload: dayjs(newValue).format("HH:mm:ss"),
    });
  };
  const handleEndTime = (newValue) => {
    dispatch({
      type: "endTime",
      payload: dayjs(newValue).format("HH:mm:ss"),
    });
  };
  const mutate = useMutation(
    () => subjectHourServices.updateSubjectHours(Id, inputState, token),
    {
      onSuccess: () => {
        navigate("/SubjectHours");
      },
    }
  );
  const handleStudentUpdate = (e) => {
    e.preventDefault();

    if (inputState.dayOfTheWeek === "" || inputState.dayOfTheWeek === null) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        dayOfTheWeekIsValid: false,
      }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: true }));
    }
    if (inputState.lessonTypeId === "" || inputState.lessonTypeId === null) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        lessonTypeIdIsValid: false,
      }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, lessonTypeId: true }));
    }
    if (
      inputState.groupSubjectId === "" ||
      inputState.groupSubjectId === null
    ) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        groupSubjectIdIsValid: false,
      }));
    } else {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        groupSubjectIdIsValid: true,
      }));
    }
    if (inputState.room === "" || inputState.room === null) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        roomIsValid: false,
      }));
    } else {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        roomIsValid: true,
      }));
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

  let [inputState, dispatch] = useReducer(updateSubjectHourReducer, {});

  useEffect(() => {
    if (subjectHourQuery.isSuccess) {
      if (!inputState.room) {
        setGroupSubjectInputValue(subjectHourQuery.data?.data.groupSubjectId);

        setLessonTypeInputValue(subjectHourQuery.data?.data.lessonTypeId);
        dispatch({
          type: "init",
          payload: subjectHourQuery.data?.data,
        });
      }
    }
  }, [subjectHourQuery.isSuccess]);
  if (
    subjectHourQuery.isLoading ||
    isLoadingLessonType ||
    isLoadingGroupSubject
  ) {
    return <h1>...isLoading</h1>;
  }
  if (subjectHourQuery.isError) {
    return <h1 className="errorMessage">Subject Hour Not found</h1>;
  }

  console.log("inputState", inputState);
  console.log(groupSubjectData?.data, "groupSubject");

  return (
    <div className="update-student">
      <div className="container">
        <section className="title">
          <div className="title-left">
            <h1>Update Subject Hours</h1>
          </div>
          <div className="title-right">
            <h1>Subject Hours/Update Subject Hours</h1>
          </div>
        </section>
        <section className="form">
          <div className="form-title">
            <h1>Subject Hour Information</h1>
          </div>
          <div className="inputs">
            <Box
              display={"flex"}
              flexDirection={"column"}
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
                label="Room"
                variant="outlined"
                defaultValue={subjectHourQuery.data?.data.room}
                onChange={(e) =>
                  dispatch({
                    type: "room",
                    payload: e.target.value,
                  })
                }
                error={enteredValueisValid.roomIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.roomIsValid && "Room required "
                }
              />

              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Day Of The Week"
                size="small"
                name="Day Of The Week"
                value={inputState.dayOfWeek}
                defaultValue={subjectHourQuery.data?.data.dayOfWeek}
                onChange={(e) => {
                  dispatch({
                    type: "dayOfWeek",
                    payload: e.target.value,
                  });
                }}
              >
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
                id="combo-box-demo"
                size="small"
                options={lessonTypeData?.data ?? []}
                getOptionLabel={(option) => option.name}
                inputValue={lessonTypeInputValue}
                onInputChange={(e, newValue) => {
                  setLessonTypeInputValue(newValue);
                }}
                value={
                  lessonTypeData?.data.find(
                    (item) =>
                      item.id === subjectHourQuery.data?.data.lessonTypeId
                  ) || null
                }
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Lesson Type" />
                )}
                onChange={(e, newValue) =>
                  dispatch({
                    type: "lessonTypeId",
                    payload: newValue ? newValue.id : null,
                  })
                }
              />
              {
                <Autocomplete
                  size="small"
                  disablePortal
                  id="tags-outlined"
                  options={groupSubjectData?.data ?? null}
                  getOptionLabel={(option) =>
                    `${option.subjectName} - ${option.groupName}`
                  }
                  defaultValue={groupSubjectData?.data.find(
                    (groupSubject) =>
                      groupSubject.id ===
                      subjectHourQuery.data?.data.groupSubjectId
                  )}
                  onChange={(e, newValue) => {
                    if (newValue) {
                      dispatch({
                        type: "groupSubjectId",
                        payload: newValue.id,
                      });
                    } else {
                      dispatch({
                        type: "groupSubjectId",
                        payload: "",
                      });
                    }
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Group Subject"
                      placeholder="Group Subject"
                    />
                  )}
                />
              }
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimeField", "TimeField"]}>
                  <TimeField
                    size="small"
                    label="Start Time"
                    value={inputState.startTime}
                    onChange={(newValue) => handleStartTime(newValue)}
                  />
                  <TimeField
                    size="small"
                    label="End Time"
                    value={inputState.endTime}
                    onChange={(newValue) => handleEndTime(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <div className="errorMessage">
                <h1>{error}</h1>
              </div>
              <Button
                type="submit"
                onClick={handleStudentUpdate}
                variant="contained"
              >
                Update Subject Hour
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default UpdateSubjectHourAdmin;
