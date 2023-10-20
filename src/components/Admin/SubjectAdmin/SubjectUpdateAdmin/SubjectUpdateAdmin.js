import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { AdminExamTypeTitle } from "../../../../UI/Common/AdminExamTypeTitle";
import { queryKeys } from "../../../../QueryKeys";
import { Tune } from "@mui/icons-material";
const UpdateSubjectAdmin = () => {
  const { subjectServices } = useService();
  const navigate = useNavigate();
  const { Id } = useParams();
  const [inputState, setInputState] = useState({});
  const subjectQuery = useQuery([queryKeys.getSubjects], () =>
    subjectServices.getSubjectById(Id)
  );
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    nameIsValid: true,
  });
  useEffect(() => {
    if (subjectQuery.isSuccess) {
      setInputState(subjectQuery.data?.data);
    }
  }, [subjectQuery.data, subjectQuery.isSuccess]);
  const mutate = useMutation(
    () => subjectServices.updateSubject(inputState.id, inputState),
    { onSuccess: () => navigate("/Subjects") }
  );
  if (subjectQuery.isLoading) {
    return <h1>...Loading</h1>;
  }

  const handleFacultyUpdate = (e) => {
    e.preventDefault();
    if (inputState.name === null || inputState.name.length < 3) {
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: true }));
    }

    mutate.mutate();
  };

  console.log("input State", inputState);
  return (
    <div className="update-student">
      <div className="container">
        <AdminExamTypeTitle
          child1={"Subject"}
          child2={"Subject / Update Subject"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Subject Information</h1>
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
                defaultValue={subjectQuery.data?.data.name}
                onChange={(e) =>
                  setInputState((prev) => ({ ...prev, name: e.target.value }))
                }
                error={enteredValueisValid.nameIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.nameIsValid &&
                  "Name must be minimum 3 length"
                }
              />

              <Button
                type="submit"
                onClick={(e) => handleFacultyUpdate(e)}
                variant="contained"
              >
                Update Subject
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default UpdateSubjectAdmin;
