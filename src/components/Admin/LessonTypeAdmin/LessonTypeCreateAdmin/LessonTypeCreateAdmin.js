import { Autocomplete, Box, Button, Select, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
import { TokenContext } from "../../../../Contexts/Token-context";

const CreateLessonType = () => {
  const { lessonTypesServices } = useService();
  const navigate = useNavigate();

  const { token } = useContext(TokenContext);

  const [newLessonType, setNewLessonType] = useState({
    name: null,
  });
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    nameIsValid: true,
  });
  let formValid = true;

  const handleLessonType = ({
    target: { value: inputValue, name: inputName },
  }) => {
    setNewLessonType((prev) => ({ ...prev, [inputName]: inputValue.trim() }));
  };
  const mutate = useMutation(
    () => lessonTypesServices.createLessonType(newLessonType, token),
    {
      onSuccess: () => navigate("/LessonTypes"),
    }
  );

  const handleNewLessonType = (e) => {
    e.preventDefault();
    if (
      newLessonType.name?.trim() === "" ||
      newLessonType.name === null ||
      newLessonType.name?.trim().length < 3
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: true }));
    }

    if (formValid) {
      mutate.mutate(newLessonType);
    }
  };

  return (
    <div className="update-student">
      <div className="container">
        <AdminGroupTitle
          child1={"Lesson Type"}
          child2={"Lesson Type / Create Lesson Type"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Lesson Type Information</h1>
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
                onChange={handleLessonType}
                error={enteredValueisValid.nameIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.nameIsValid &&
                  "Name must be minimum 3 length"
                }
              />

              <Button
                type="submit"
                onClick={handleNewLessonType}
                variant="contained"
              >
                Create Lesson Type
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreateLessonType;
