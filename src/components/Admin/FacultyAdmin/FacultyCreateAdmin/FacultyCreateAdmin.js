import { Autocomplete, Box, Button, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
import { queryKeys } from "../../../../QueryKeys";
const CreateFaculty = () => {
  const { facultyServices } = useService();

  const [newFaculty, setNewFaculty] = useState({
    name: null,
  });
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    nameIsValid: true,
  });
  let formValid = true;

  const navigate = useNavigate();

  const handleFaculty = ({
    target: { value: inputValue, name: inputName },
  }) => {
    setNewFaculty((prev) => ({ ...prev, [inputName]: inputValue.trim() }));
  };
  const mutate = useMutation(() => facultyServices.createFaculty(newFaculty), {
    onSuccess: () => navigate("/Faculties"),
  });

  const handleNewFaculty = (e) => {
    e.preventDefault();
    if (
      newFaculty.name?.trim() === "" ||
      newFaculty.name === null ||
      newFaculty.name?.trim().length < 3
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: true }));
    }

    if (formValid) {
      mutate.mutate(newFaculty);
    }
  };

  return (
    <div className="update-student">
      <div className="container">
        <AdminGroupTitle
          child1={"Faculty"}
          child2={"Faculty / Create Faculty"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Faculty Information</h1>
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
                onChange={handleFaculty}
                error={enteredValueisValid.nameIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.nameIsValid &&
                  "Name must be minimum 3 length"
                }
              />

              <Button
                type="submit"
                onClick={handleNewFaculty}
                variant="contained"
              >
                Create Faculty
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreateFaculty;
