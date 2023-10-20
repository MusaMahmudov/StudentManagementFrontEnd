import { Autocomplete, Box, Button, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
import { queryKeys } from "../../../../QueryKeys";
const CreateExamType = () => {
  const { examTypeServices } = useService();

  const [newExamType, setExamType] = useState({
    name: null,
  });
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    nameIsValid: true,
  });
  let formValid = true;

  const navigate = useNavigate();

  const handleExamType = ({
    target: { value: inputValue, name: inputName },
  }) => {
    setExamType((prev) => ({ ...prev, [inputName]: inputValue.trim() }));
  };
  const mutate = useMutation(
    () => examTypeServices.createExamType(newExamType),
    {
      onSuccess: () => navigate("/ExamTypes"),
    }
  );

  const handleNewExamType = (e) => {
    e.preventDefault();
    if (
      newExamType.name?.trim() === "" ||
      newExamType.name === null ||
      newExamType.name?.trim().length < 3
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: true }));
    }

    if (formValid) {
      mutate.mutate(newExamType);
    }
  };

  return (
    <div className="update-student">
      <div className="container">
        <AdminGroupTitle
          child1={"Exam Type"}
          child2={"Exam Type / Create Exam Type"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Exam Type Information</h1>
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
                onChange={handleExamType}
                error={enteredValueisValid.nameIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.nameIsValid &&
                  "Name must be minimum 3 length"
                }
              />

              <Button
                type="submit"
                onClick={handleNewExamType}
                variant="contained"
              >
                Create Exam Type
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreateExamType;
