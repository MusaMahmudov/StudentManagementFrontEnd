import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { queryKeys } from "../../../../QueryKeys";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
import { updateGroupSubjectReducer } from "../../../../Reducers/UpdateGroupSubjectReducer";
const UpdateGroupSubjectAdmin = () => {
  const {
    groupSubjectServices,
    teacherServices,
    groupServices,
    subjectServices,
  } = useService();
  const { data: teacherData, isError } = useQuery([queryKeys.getTeachers], () =>
    teacherServices.getAllTeachers()
  );
  const { data: groupData } = useQuery([queryKeys.getGroupsQuery], () =>
    groupServices.getAllGroups()
  );
  const { data: subjectData } = useQuery([queryKeys.getSubjects], () =>
    subjectServices.getAllSubjects()
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
  });
  const [inputState, dispatch] = useReducer(updateGroupSubjectReducer, {
    groupId: groupSubjectData?.group.id,
    subjectId: groupSubjectData?.subject.id,
    teacherRole: [],
    totalWeeks: groupSubjectData.totalWeeks,
    hours: groupSubjectData.hours,
    credits: groupSubjectData.credits,
  });
  const mutate = useMutation(() =>
    groupSubjectServices.updateGroupSubject(groupSubjectData.id, inputState)
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

    if (inputState.credits === "" || inputState.credits === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, creditsIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, creditsIsValid: true }));
    }

    if (inputState.hours === "" || inputState.hours === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, hoursIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, hoursIsValid: true }));
    }
    if (inputState.totalWeeks === "" || inputState.totalWeeks === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, totalWeeksIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, totalWeeksIsValid: true }));
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
                  !enteredValueisValid.creditsIsValid && "Credits required"
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
                  !enteredValueisValid.hoursIsValid && "Hours  required"
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
                  "Total weeks  required"
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
