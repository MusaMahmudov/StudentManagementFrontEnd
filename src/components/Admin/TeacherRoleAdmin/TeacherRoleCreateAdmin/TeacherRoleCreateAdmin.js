import { Autocomplete, Box, Button, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
const CreateTeacherRoleAdmin = () => {
  const { teacherRoleServices } = useService();

  const [newTeacherRole, setNewTeacherRole] = useState({
    name: null,
  });
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    nameIsValid: true,
  });
  let formValid = true;

  const navigate = useNavigate();

  const handleTeacherRole = ({
    target: { value: inputValue, name: inputName },
  }) => {
    setNewTeacherRole((prev) => ({ ...prev, [inputName]: inputValue.trim() }));
  };
  const mutate = useMutation(
    () => teacherRoleServices.createTeacherRole(newTeacherRole),
    {
      onSuccess: () => navigate("/TeacherRoles"),
    }
  );

  const handleNewTeacherRole = (e) => {
    e.preventDefault();
    if (newTeacherRole.name?.trim() === "" || newTeacherRole.name === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: true }));
    }

    if (formValid) {
      mutate.mutate(newTeacherRole);
    }
  };

  return (
    <div className="update-student">
      <div className="container">
        <AdminGroupTitle
          child1={"Teacher Role"}
          child2={"Teacher Role / Create Teacher Role"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Teacher Role Form</h1>
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
                onChange={handleTeacherRole}
                error={enteredValueisValid.nameIsValid ? "" : "error"}
                helperText={!enteredValueisValid.nameIsValid && "Name required"}
              />

              <Button
                type="submit"
                onClick={handleNewTeacherRole}
                variant="contained"
              >
                Create Teacher Role
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreateTeacherRoleAdmin;
