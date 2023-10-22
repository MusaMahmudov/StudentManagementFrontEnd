import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useReducer, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { queryKeys } from "../../../../QueryKeys";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
import { updateGroupSubjectReducer } from "../../../../Reducers/UpdateGroupSubjectReducer";
import { TokenContext } from "../../../../Contexts/Token-context";
const UpdateGroupSubjectAdmin = () => {
  const { token } = useContext(TokenContext);

  const {
    groupSubjectServices,
    teacherServices,
    groupServices,
    subjectServices,
  } = useService();
  const { data: teacherData, isError } = useQuery([queryKeys.getTeachers], () =>
    teacherServices.getAllTeachers(token)
  );
  const { data: groupData } = useQuery([queryKeys.getGroupsQuery], () =>
    groupServices.getAllGroups(token)
  );
  const { data: subjectData } = useQuery([queryKeys.getSubjects], () =>
    subjectServices.getAllSubjects(token)
  );

  const [teacherError, setTeacherError] = useState();
  if (isError) {
    setTeacherError("Something get wrong");
  }

  const navigate = useNavigate();
  console.log(teacherData);
  const { state: groupSubjectData } = useLocation();

  const [teacherInputValue, setTeacherInputValue] = useState(
    groupSubjectData?.teachers
  );
  const [subjectInputValue, setSubjectInputValue] = useState(
    groupSubjectData?.subject
  );
  console.log(groupSubjectData);
  const [groupInputValue, setGroupInputValue] = useState(
    groupSubjectData?.group
  );
  let formValid = true;
  const [error, setErrors] = useState();
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    groupIdIsValid: true,
    subjectIdIsValid: true,
    creditsIsValid: true,
    hoursIsValid: true,
    totalWeeksIsValid: true,
    semesterIsValid: true,
    YearIsValid: true,
  });
  const [inputState, dispatch] = useReducer(updateGroupSubjectReducer, {
    groupId: groupSubjectData?.group.id,
    subjectId: groupSubjectData?.subject.id,
    teacherRole: [],
    totalWeeks: groupSubjectData.totalWeeks,
    hours: groupSubjectData.hours,
    credits: groupSubjectData.credits,
    semester: groupSubjectData.semester,
    year: groupSubjectData.year,
  });
  const mutate = useMutation(() =>
    groupSubjectServices.updateGroupSubject(
      groupSubjectData.id,
      inputState,
      token
    )
  );
  useEffect(() => {
    if (mutate.isError && mutate.error.response.data.message) {
      setErrors(mutate.error.response.data.message);
    }
  }, [mutate]);
  const handleGroupSubjectUpdate = (e) => {
    if (inputState.groupId === "" || inputState.groupId === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, groupIdIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, groupIdIsValid: true }));
    }
    if (inputState.subjectId === "" || inputState.subjectId === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, subjectIdIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, subjectIdIsValid: true }));
    }

    if (
      inputState.credits < 1 ||
      inputState.credits > 50 ||
      inputState.credits === null
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, creditsIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, creditsIsValid: true }));
    }

    if (
      inputState.hours < 1 ||
      inputState.hours > 200 ||
      inputState.hours === null
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, hoursIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, hoursIsValid: true }));
    }
    if (
      inputState.totalWeeks < 1 ||
      inputState.totalWeeks > 50 ||
      inputState.totalWeeks === null
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, totalWeeksIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, totalWeeksIsValid: true }));
    }
    if (inputState.semester === "" || inputState.semester === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, semesterIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, semesterIsValid: true }));
    }
    if (
      inputState.year > new Date().getFullYear() ||
      inputState.year < 2010 ||
      inputState.year === null
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, YearIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, YearIsValid: true }));
    }

    // for (let prop in enteredValueisValid) {
    //   if (!enteredValueisValid[prop]) {
    //     formValid = false;
    //     break;
    //   }
    // }
    mutate.mutate();
    navigate("/GroupSubjects");
  };
  console.log("inputState", inputState);
  return (
    <div className="update-group">
      <div className="container">
        <AdminGroupTitle
          child1={"Update Group's Subject"}
          child2={"Group's Subject / Update Group's Subject"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Information</h1>
          </div>
          <div className="inputs">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "65ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                type="number"
                size="small"
                id="outlined-basic"
                label="Credits"
                variant="outlined"
                name="credits"
                defaultValue={groupSubjectData.credits}
                onChange={(e) => {
                  dispatch({
                    type: "credits",
                    payload: e.target.value,
                  });
                }}
                error={enteredValueisValid.creditsIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.creditsIsValid &&
                  "Credits must be between 1 and 50"
                }
              />
              <TextField
                type="number"
                size="small"
                id="outlined-basic"
                label="Hours"
                variant="outlined"
                name="hours"
                defaultValue={groupSubjectData.hours}
                onChange={(e) => {
                  dispatch({
                    type: "hours",
                    payload: e.target.value,
                  });
                }}
                error={enteredValueisValid.hoursIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.hoursIsValid &&
                  "Hours  must be between 1 and 200"
                }
              />
              <TextField
                type="number"
                size="small"
                id="outlined-basic"
                label="Total weeks"
                variant="outlined"
                name="totalWeeks"
                defaultValue={groupSubjectData.totalWeeks}
                onChange={(e) => {
                  dispatch({
                    type: "totalWeeks",
                    payload: e.target.value,
                  });
                }}
                error={enteredValueisValid.totalWeeksIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.totalWeeksIsValid &&
                  "Total weeks  must be between 1 and 50"
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Semester"
                variant="outlined"
                name="semester"
                defaultValue={groupSubjectData.semester}
                onChange={(e) => {
                  dispatch({
                    type: "semester",
                    payload: e.target.value,
                  });
                }}
                error={enteredValueisValid.semesterIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.semesterIsValid && "Semester required"
                }
              />
              <TextField
                type="number"
                size="small"
                id="outlined-basic"
                label="Year"
                variant="outlined"
                name="year"
                defaultValue={groupSubjectData.year}
                onChange={(e) => {
                  dispatch({
                    type: "year",
                    payload: e.target.value,
                  });
                }}
                error={enteredValueisValid.YearIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.YearIsValid &&
                  `Year must be between 2010 and ${new Date().getFullYear()}`
                }
              />
              <Autocomplete
                disablePortal
                id="combo-box-subject"
                size="small"
                defaultValue={subjectInputValue}
                onInputChange={(e, newValue) => {
                  setSubjectInputValue(newValue);
                }}
                options={subjectData?.data ?? []}
                getOptionLabel={(option) => option.name}
                onChange={(e, newValue) => {
                  dispatch({
                    type: "subjectId",
                    payload: newValue?.id,
                  });
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Subject" />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-group"
                size="small"
                defaultValue={groupInputValue}
                onInputChange={(e, newValue) => {
                  setGroupInputValue(newValue);
                }}
                options={groupData?.data ?? []}
                getOptionLabel={(option) => option.name}
                onChange={(e, newValue) => {
                  dispatch({
                    type: "groupId",
                    payload: newValue?.id,
                  });
                }}
                // inputValue={groupInputValue}
                // onInputChange={(e, newValue) => {
                //   setGroupInputValue(newValue);
                // }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Group" />
                )}
              />
              <div className="errorMessage">
                <p>{error}</p>
              </div>
              <Button
                type="submit"
                onClick={handleGroupSubjectUpdate}
                variant="contained"
              >
                Update
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default UpdateGroupSubjectAdmin;
