import { Autocomplete, Box, Button, Select, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
import { queryKeys } from "../../../../QueryKeys";
import { TokenContext } from "../../../../Contexts/Token-context";
import jwtDecode from "jwt-decode";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
const CreateGroupSubjectAdmin = () => {
  const { groupServices, subjectServices, groupSubjectServices } = useService();
  const { token } = useContext(TokenContext);
  const { data: subjectData } = useQuery([queryKeys.getSubjects], () =>
    subjectServices.getAllSubjects(token)
  );
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken[tokenRoleProperty] !== "Admin") {
        navigate("Error");
      }
    }
  }, []);
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
    semesterIsValid: true,
    YearIsValid: true,
  });
  let formValid = true;

  const navigate = useNavigate();
  const { data: groupData } = useQuery([queryKeys.getGroupsQuery], () =>
    groupServices.getAllGroups(token)
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
    () => groupSubjectServices.createGroupSubject(newGroupSubject, token),
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
      newGroupSubject.credits < 1 ||
      newGroupSubject.credits > 50 ||
      newGroupSubject.credits === null
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, creditsIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, creditsIsValid: true }));
    }

    if (
      newGroupSubject.hours < 1 ||
      newGroupSubject.hours > 200 ||
      newGroupSubject.hours === null
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, hoursIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, hoursIsValid: true }));
    }
    if (
      newGroupSubject.totalWeeks < 1 ||
      newGroupSubject.totalWeeks > 50 ||
      newGroupSubject.totalWeeks === null
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, totalWeeksIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, totalWeeksIsValid: true }));
    }
    if (newGroupSubject.semester === "" || newGroupSubject.semester === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, semesterIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, semesterIsValid: true }));
    }
    if (
      newGroupSubject.year > new Date().getFullYear() ||
      newGroupSubject.year < 2010 ||
      newGroupSubject.year === null
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, YearIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, YearIsValid: true }));
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
              <TextField
                size="small"
                id="outlined-basic"
                label="Semester"
                variant="outlined"
                name="semester"
                onChange={handleGroupSubject}
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
                onChange={handleGroupSubject}
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