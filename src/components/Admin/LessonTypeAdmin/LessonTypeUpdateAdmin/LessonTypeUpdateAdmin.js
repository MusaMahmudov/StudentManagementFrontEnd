import { Box, Button, TextField } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";

import { AdminExamTypeTitle } from "../../../../UI/Common/AdminExamTypeTitle";
import { queryKeys } from "../../../../QueryKeys";
import { TokenContext } from "../../../../Contexts/Token-context";
const UpdateLessonTypeAdmin = () => {
  const { token } = useContext(TokenContext);

  const { lessonTypesServices } = useService();
  const { Id } = useParams();
  const navigate = useNavigate();
  const lessonTypeQuery = useQuery([queryKeys.GetLessonTypeById], () =>
    lessonTypesServices.getLessonTypeByIdForUpdate(Id, token)
  );
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    nameIsValid: true,
  });
  let formValid = true;
  const [inputState, setInputState] = useState(lessonTypeQuery.data?.data);
  const [error, setError] = useState();
  const mutate = useMutation(
    () => lessonTypesServices.updateLessonType(Id, inputState, token),
    {
      onSuccess: () => navigate("/LessonTypes"),
      onError: () => setError("Something went wrong"),
    }
  );
  const handleLessonTypeUpdate = (e) => {
    e.preventDefault();
    if (
      inputState.name?.trim() === "" ||
      inputState.name === null ||
      inputState.name?.trim().length < 3
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: true }));
    }
    if (formValid) {
      mutate.mutate();
    }
  };
  if (lessonTypeQuery.isLoading) {
    return <h1>...isLoading</h1>;
  }
  if (lessonTypeQuery.isError) {
    return <h1>Lesson type not found</h1>;
  }
  console.log("input State", inputState);
  return (
    <div className="update-student">
      <div className="container">
        <AdminExamTypeTitle
          child1={"Lesson Type"}
          child2={"Lesson Type / Update Lesson Type"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Lesson Type Information</h1>
          </div>
          <div className="inputs">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "43ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                size="small"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                defaultValue={lessonTypeQuery.data?.data.name}
                onChange={(e) =>
                  setInputState((prev) => ({
                    ...prev,
                    name: e.target.value.trim(),
                  }))
                }
                error={enteredValueisValid.nameIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.nameIsValid &&
                  "Name must be minimum 3 length"
                }
              />

              <Button
                type="submit"
                onClick={handleLessonTypeUpdate}
                variant="contained"
              >
                Update Lesson Type
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default UpdateLessonTypeAdmin;
