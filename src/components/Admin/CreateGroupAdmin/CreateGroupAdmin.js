import { Autocomplete, Box, Button, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { AdminGroupTitle } from "../../../UI/Common/AdminGroupTitle";
import { queryKeys } from "../../../QueryKeys";
import { ConstructionOutlined } from "@mui/icons-material";
const CreateGroupAdmin = () => {
  const { studentServices, groupServices, facultyServices } = useService();
  const { data: studentData } = useQuery([queryKeys.getStudentsQuery], () =>
    studentServices.getAllStudents()
  );
  console.log("students", studentData);
  const [newGroup, setNewGroup] = useState({});

  console.log("NewGroup", newGroup);
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    nameIsValid: true,
    yearIsValid: true,
    facultyIdIsValid: true,
  });
  let formValid = true;

  const navigate = useNavigate();
  const { data: facultyData } = useQuery([queryKeys.getFaculties], () =>
    facultyServices.getAllFaculties()
  );
  const [facultyInputValue, setFacultyInputValue] = useState();
  const handleGroup = ({ target: { value: inputValue, name: inputName } }) => {
    setNewGroup((prev) => ({ ...prev, [inputName]: inputValue.trim() }));
    console.log(newGroup);
  };
  const mutate = useMutation(() => groupServices.createGroup(newGroup), {
    onSuccess: () => navigate("/Groups"),
  });

  console.log(enteredValueisValid);
  const handleNewGroup = (e) => {
    e.preventDefault();
    if (newGroup.name?.trim() === "" || newGroup.name === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: true }));
    }

    if (newGroup.year?.trim() === "" || newGroup.year === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, yearIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, yearIsValid: true }));
    }

    if (newGroup.facultyId?.trim() === "" || newGroup.facultyId === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, facultyIdIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, facultyIdIsValid: true }));
    }

    if (formValid) {
      mutate.mutate(newGroup);
    }
  };
  console.log(newGroup);

  return (
    <div className="update-student">
      <div className="container">
        <AdminGroupTitle child1={"Group"} child2={"Group / Create Group"} />
        <section className="form">
          <div className="form-title">
            <h1>Group Information</h1>
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
                size="small"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                onChange={handleGroup}
                error={enteredValueisValid.nameIsValid ? "" : "error"}
                helperText={!enteredValueisValid.nameIsValid && "Name required"}
              />
              <TextField
                type="number"
                size="small"
                id="outlined-basic"
                label="Year"
                variant="outlined"
                name="year"
                onChange={handleGroup}
                error={enteredValueisValid.yearIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.yearIsValid && "Year  required"
                }
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={facultyData?.data ?? []}
                getOptionLabel={(option) => option.name}
                onChange={(e, newValue) => {
                  setNewGroup((prev) => ({ ...prev, facultyId: newValue?.id }));
                }}
                inputValue={facultyInputValue}
                onInputChange={(e, newValue) => {
                  setFacultyInputValue(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Faculty" />
                )}
              />
              {studentData && (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={studentData?.data ?? null}
                  getOptionLabel={(option) => option.fullName}
                  name="studentsId"
                  onChange={(e, newValue) => {
                    if (newValue) {
                      setNewGroup((prev) => ({
                        ...prev,
                        studentsId: newValue.map((group) => group.id),
                      }));
                    } else {
                      setNewGroup((prev) => ({
                        ...prev,
                        studentsId: [],
                      }));
                    }
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Students"
                      placeholder="Students"
                    />
                  )}
                />
              )}

              <Button
                type="submit"
                onClick={handleNewGroup}
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
export default CreateGroupAdmin;
