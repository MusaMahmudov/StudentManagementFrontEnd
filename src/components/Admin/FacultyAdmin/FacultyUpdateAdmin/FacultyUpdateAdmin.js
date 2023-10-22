import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";

import { AdminExamTypeTitle } from "../../../../UI/Common/AdminExamTypeTitle";
import { queryAllByAltText } from "@testing-library/react";
import { queryKeys } from "../../../../QueryKeys";
import { TokenContext } from "../../../../Contexts/Token-context";
const UpdateFacultyAdmin = () => {
  const { token } = useContext(TokenContext);

  const { facultyServices } = useService();
  const { Id } = useParams();
  const navigate = useNavigate();
  const facultyQuery = useQuery([queryKeys.getFacultyById], () =>
    facultyServices.getFacultyByIdForUpdate(Id, token)
  );
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    nameIsValid: true,
  });
  let formValid = true;
  const [inputState, setInputState] = useState(facultyQuery.data?.data);
  const [error, setError] = useState();
  const mutate = useMutation(
    () => facultyServices.updateFaculty(Id, inputState, token),
    {
      onSuccess: () => navigate("/Faculties"),
      onError: () => setError("Something went wrong"),
    }
  );
  const handleFacultyUpdate = (e) => {
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
  if (facultyQuery.isLoading) {
    return <h1>...isLoading</h1>;
  }
  if (facultyQuery.isError) {
    return <h1>Faculty not found</h1>;
  }
  console.log("input State", inputState);
  return (
    <div className="update-student">
      <div className="container">
        <AdminExamTypeTitle
          child1={"Faculty"}
          child2={"Faculty / Update Faculty"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Faculty Information</h1>
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
                defaultValue={facultyQuery.data?.data.name}
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
                onClick={handleFacultyUpdate}
                variant="contained"
              >
                Update Faculty
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default UpdateFacultyAdmin;
