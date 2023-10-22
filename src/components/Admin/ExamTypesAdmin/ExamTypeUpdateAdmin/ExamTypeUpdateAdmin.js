import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useReducer, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { queryKeys } from "../../../../QueryKeys";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { AdminExamTypeTitle } from "../../../../UI/Common/AdminExamTypeTitle";
import { TRUE } from "sass";
import { TokenContext } from "../../../../Contexts/Token-context";
const UpdateExamTypeAdmin = () => {
  const { token } = useContext(TokenContext);
  const { examTypeServices } = useService();
  const navigate = useNavigate();
  const { Id } = useParams();
  const {
    data: examTypeData,
    isLoading,
    isError,
  } = useQuery([queryKeys.getExamTypes], () =>
    examTypeServices.getExamTypeByIdForUpdate(Id, token)
  );
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    nameIsValid: true,
  });
  let formValid = true;
  const [inputState, setInputState] = useState(examTypeData?.data);
  const mutate = useMutation(
    () => examTypeServices.updateExamType(Id, inputState, token),
    { onSuccess: () => navigate("/ExamTypes") }
  );
  const handleExamTypeUpdate = (e) => {
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
  if (isLoading) {
    return <h1>...Is Loading</h1>;
  }
  if (isError) {
    return <h1 className="errorMessage">Exam's type not found</h1>;
  }

  console.log("input State", inputState);
  return (
    <div className="update-student">
      <div className="container">
        <AdminExamTypeTitle
          child1={"Exam Type"}
          child2={"Exam Type / Update Exam Type"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Information</h1>
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
                defaultValue={examTypeData?.data.name}
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
                onClick={handleExamTypeUpdate}
                variant="contained"
              >
                Update Exam Type
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default UpdateExamTypeAdmin;
