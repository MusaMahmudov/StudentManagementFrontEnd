import { Autocomplete, Box, Button, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
const CreateSubjectAdmin = () => {
  const { subjectServices } = useService();

  const [newSubject, setNewSubject] = useState({
    name: null,
  });
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    nameIsValid: true,
  });
  let formValid = true;

  const navigate = useNavigate();

  const handleSubject = ({
    target: { value: inputValue, name: inputName },
  }) => {
    setNewSubject((prev) => ({ ...prev, [inputName]: inputValue.trim() }));
  };
  const mutate = useMutation(() => subjectServices.createSubject(newSubject), {
    onSuccess: () => navigate("/Subjects"),
  });

  const handleNewSubject = (e) => {
    e.preventDefault();
    if (newSubject.name?.trim() === "" || newSubject.name === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: true }));
    }

    if (formValid) {
      mutate.mutate(newSubject);
    }
  };

  return (
    <div className="update-student">
      <div className="container">
        <AdminGroupTitle
          child1={"Subject"}
          child2={"Subject / Create Subject"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Subject Form</h1>
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
                onChange={handleSubject}
                error={enteredValueisValid.nameIsValid ? "" : "error"}
                helperText={!enteredValueisValid.nameIsValid && "Name required"}
              />

              <Button
                type="submit"
                onClick={handleNewSubject}
                variant="contained"
              >
                Create Subject
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreateSubjectAdmin;
