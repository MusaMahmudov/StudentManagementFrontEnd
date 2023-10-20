import { Autocomplete, Box, Button, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
import { queryKeys } from "../../../../QueryKeys";
const CreateGroupSubjectAdmin = () => {
  const { groupServices, subjectServices, groupSubjectServices } = useService();
  const { data: subjectData } = useQuery([queryKeys.getSubjects], () =>
    subjectServices.getAllSubjects()
  );
  const [error, setErrors] = useState("");
  const [newGroupSubject, setNewGroupSubject] = useState({
    groupId: null,
    subjectId: null,
    teacherRole: [],
    credits: null,
    hours: null,
    totalWeeks: null,
  });
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    groupIdIsValid: true,
    subjectIdIsValid: true,
    creditsIsValid: true,
    hoursIsValid: true,
    totalWeeksIsValid: true,
  });
  let formValid = true;

  const navigate = useNavigate();
  const { data: groupData } = useQuery([queryKeys.getGroupsQuery], () =>
    groupServices.getAllGroups()
  );
  const [subjectInputValue, setSubjectInputValue] = useState();
  const [groupInputValue, setGroupInputValue] = useState();

  const handleGroupSubject = ({
    target: { value: inputValue, name: inputName },
  }) => {
    setNewGroupSubject((prev) => ({ ...prev, [inputName]: inputValue.trim() }));
    console.log(newGroupSubject);
  };
  const mutate = useMutation(
    () => groupSubjectServices.createGroupSubject(newGroupSubject),
    {
      onSuccess: () => navigate("/GroupSubjects"),
    }
  );
  useEffect(() => {
    if (mutate.isError && mutate.error.response.data.message) {
      setErrors(mutate.error.response.data.message);
    }
  }, [mutate]);
  console.log("mutate", mutate);
  //   if (mutate.isError && mutate.error.response.data.message) {
  //     setErrors(mutate.error.response.data.message);
  //   }
  console.log(enteredValueisValid);
  const handleNewGroupSubject = (e) => {
    e.preventDefault();
    if (
      newGroupSubject.groupId?.trim() === "" ||
      newGroupSubject.groupId === null
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, groupIdIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, groupIdIsValid: true }));
    }
    if (
      newGroupSubject.subjectId?.trim() === "" ||
      newGroupSubject.subjectId === null
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, subjectIdIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, subjectIdIsValid: true }));
    }

    if (
      newGroupSubject.credits?.trim() === "" ||
      newGroupSubject.credits === null
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, creditsIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, creditsIsValid: true }));
    }

    if (
      newGroupSubject.hours?.trim() === "" ||
      newGroupSubject.hours === null
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, hoursIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, hoursIsValid: true }));
    }
    if (
      newGroupSubject.totalWeeks?.trim() === "" ||
      newGroupSubject.totalWeeks === null
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, totalWeeksIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, totalWeeksIsValid: true }));
    }
    mutate.mutate(newGroupSubject);
  };
  console.log(newGroupSubject);

  return (
    <div className="update-student">
      <div className="container">
        <AdminGroupTitle
          child1={"Group Subject"}
          child2={" Create subject for group"}
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
                onChange={handleGroupSubject}
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
                onChange={handleGroupSubject}
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
                onChange={handleGroupSubject}
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
                options={subjectData?.data ?? []}
                getOptionLabel={(option) => option.name}
                onChange={(e, newValue) => {
                  setNewGroupSubject((prev) => ({
                    ...prev,
                    subjectId: newValue?.id,
                  }));
                }}
                inputValue={subjectInputValue}
                onInputChange={(e, newValue) => {
                  setSubjectInputValue(newValue);
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
                options={groupData?.data ?? []}
                getOptionLabel={(option) => option.name}
                onChange={(e, newValue) => {
                  setNewGroupSubject((prev) => ({
                    ...prev,
                    groupId: newValue?.id,
                  }));
                }}
                inputValue={groupInputValue}
                onInputChange={(e, newValue) => {
                  setGroupInputValue(newValue);
                }}
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
                onClick={handleNewGroupSubject}
                variant="contained"
              >
                Create Group
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreateGroupSubjectAdmin;
