import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useReducer, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { queryKeys } from "../../../../QueryKeys";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
import { updateGroupSubjectReducer } from "../../../../Reducers/UpdateGroupSubjectReducer";
import { TokenContext } from "../../../../Contexts/Token-context";
import AddIcon from "@mui/icons-material/Add";

const UpdateGroupSubjectAdmin = () => {
  const { token } = useContext(TokenContext);
  const { Id } = useParams();
  const {
    groupSubjectServices,
    teacherServices,
    groupServices,
    subjectServices,
    teacherRoleServices,
  } = useService();
  const groupSubjectQuery = useQuery([queryKeys.getGroupSubjects], () =>
    groupSubjectServices.getGroupSubjectByIdForUpdate(Id)
  );

  const teacherQuery = useQuery([queryKeys.getTeachers], () =>
    teacherServices.getTeachersForGroupSubject(token)
  );
  const teacherRoleQuery = useQuery([queryKeys.getTeacherRoles], () =>
    teacherRoleServices.getAllTeacherRoles(token)
  );
  const { data: groupData } = useQuery([queryKeys.getGroupsQuery], () =>
    groupServices.getAllGroups(token)
  );
  const { data: subjectData } = useQuery([queryKeys.getSubjects], () =>
    subjectServices.getAllSubjects(token)
  );
  const [teachers, setTeachers] = useState([]);
  const [teacherError, setTeacherError] = useState();
  if (teacherQuery.isError) {
    setTeacherError("Something get wrong");
  }
  const handleAddTeacher = () => {
    setEnteredValueIsValid((prev) => ({
      ...prev,
      teacherRoleIsValid: [...prev.teacherRoleIsValid, true],
    }));
    const newTeacher = {
      teacherId: "",
      roleId: "",
    };
    setTeachers((prev) => [...prev, newTeacher]);
  };
  const handleRemoveTeacher = () => {
    if (
      enteredValueisValid.teacherRoleIsValid.length > 0 &&
      teachers.length > 0
    ) {
      setEnteredValueIsValid((prev) => ({
        ...prev,
        teacherRoleIsValid: [...prev.teacherRoleIsValid.slice(0, -1)],
      }));

      setTeachers((prev) => [...prev.slice(0, -1)]);
      teacherRoleQuery.refetch();
      teacherQuery.refetch();
    }
  };

  const handleTeacherChange = (index, event, newValue, id) => {
    const updatedTeachers = [...teachers];
    if (newValue?.fullName) {
      updatedTeachers[index]["teacherId"] = newValue.id;
    } else if (newValue?.name) {
      updatedTeachers[index]["roleId"] = newValue.id;
    } else if (!newValue) {
      updatedTeachers[index][id] = "";
    }
    setTeachers(updatedTeachers);
  };

  const navigate = useNavigate();
  console.log(teacherQuery.data?.data);

  const [subjectInputValue, setSubjectInputValue] = useState(
    groupSubjectQuery.data?.data.subject
  );
  console.log(groupSubjectQuery.data);
  const [groupInputValue, setGroupInputValue] = useState(
    groupSubjectQuery.data?.data.group
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
    teacherRoleIsValid: [],
  });
  const [inputState, dispatch] = useReducer(updateGroupSubjectReducer, {});
  const mutate = useMutation(
    () => groupSubjectServices.updateGroupSubject(Id, inputState, token),
    {
      onSuccess: () => navigate("/GroupSubjects"),
    }
  );
  useEffect(() => {
    inputState.teacherRole = teachers;
  }, [teachers]);
  useEffect(() => {
    dispatch({
      type: "init",
      payload: groupSubjectQuery.data?.data,
    });
  }, [groupSubjectQuery.isSuccess]);

  useEffect(() => {
    if (mutate.isError && mutate.error.response.data.message) {
      setErrors(mutate.error.response.data.message);
    }
  }, [mutate]);
  const handleGroupSubjectUpdate = (e) => {
    e.preventDefault();
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
  };
  if (groupSubjectQuery.isLoading) {
    return <h1>... Is Loading</h1>;
  }
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
                type="number"
                size="small"
                id="outlined-basic"
                label="Credits"
                variant="outlined"
                name="credits"
                defaultValue={groupSubjectQuery.data?.data.credits}
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
                defaultValue={groupSubjectQuery.data?.data.hours}
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
                defaultValue={groupSubjectQuery.data?.data.totalWeeks}
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
                defaultValue={groupSubjectQuery.data?.data.semester}
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
                defaultValue={groupSubjectQuery.data?.data.year}
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
              {inputState.teacherRole?.map((teacher, index) => (
                <div key={index}>
                  <h1>Teacher {index + 1}</h1>
                  <Autocomplete
                    disablePortal
                    label={`Teacher ${index + 1}`}
                    id="teacherId"
                    options={teacherQuery.data?.data ?? []}
                    getOptionLabel={(option) => option.fullName}
                    onChange={(e, newValue) =>
                      handleTeacherChange(index, e, newValue, "teacherId")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Teacher"
                        error={
                          enteredValueisValid.teacherRoleIsValid[index]
                            ? ""
                            : "error"
                        }
                      />
                    )}
                  />
                  <Autocomplete
                    label={`Teacher ${index + 1} Role`}
                    id="roleId"
                    sx={{ marginBottom: 2, marginTop: 2 }}
                    options={teacherRoleQuery.data?.data ?? []}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, newValue) =>
                      handleTeacherChange(index, e, newValue, "roleId")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Role"
                        error={
                          enteredValueisValid.teacherRoleIsValid[index]
                            ? ""
                            : "error"
                        }
                      />
                    )}
                  />
                </div>
              ))}
              <Box display={"flex"} justifyContent={"space-between"}>
                <Button
                  color="primary"
                  variant="contained"
                  aria-label="add"
                  onClick={handleAddTeacher}
                >
                  <AddIcon />
                  Add Teacher
                </Button>
                {teachers.length > 0 && (
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleRemoveTeacher()}
                  >
                    Delete Teacher
                  </Button>
                )}
              </Box>
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
