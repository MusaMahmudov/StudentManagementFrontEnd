import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Query, useMutation, useQueries, useQuery } from "react-query";
import useService from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { queryKeys } from "../../../../QueryKeys";
import { TokenContext } from "../../../../Contexts/Token-context";
import jwtDecode from "jwt-decode";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
import { red } from "@mui/material/colors";
const CreateExamResult = () => {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const [error, setError] = useState();
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken[tokenRoleProperty] !== "Admin") {
        navigate("Error");
      }
    }
  });
  const { examServices, examResultServices, studentServices } = useService();
  const { data: examData, isLoading: isLoaExam } = useQuery(
    [queryKeys.getExams],
    () => examServices.getAllExams(token)
  );

  const { data: studentData, isLoading: isLoaStudent } = useQuery(
    [queryKeys.getStudentsQuery],
    () => studentServices.getAllStudentsForCreateOrUpdateForExamResult(token)
  );
  const [studentInputValue, setStudentInputValue] = useState();
  const [examInputValue, setExamInputValue] = useState();
  const [maxScore, setMaxScore] = useState();

  const [newExamResult, setNewExamResult] = useState({
    studentId: null,
    examId: null,
    score: null,
  });
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    studentIdIsValid: true,
    examIdIsValid: true,
    scoreIsValid: true,
  });
  let formValid = true;
  useEffect(() => {
    let exam;
    if (newExamResult.examId) {
      exam = examData?.data.find((exam) => exam.id === newExamResult.examId);
      setMaxScore(exam.maxScore);
    } else {
      setMaxScore(null);
    }
  }, [newExamResult.examId]);
  const handleExamResult = ({
    target: { value: inputValue, name: inputName },
  }) => {
    setNewExamResult((prev) => ({ ...prev, [inputName]: inputValue.trim() }));
  };
  const mutate = useMutation(
    () => examResultServices.createExamResult(newExamResult, token),
    {
      onSuccess: () => navigate("/ExamResults"),
      onError: (error) => setError(error),
    }
  );
  console.log(studentData?.data);
  const handleNewExamResult = (e) => {
    e.preventDefault();

    if (
      newExamResult.studentId?.trim() === "" ||
      newExamResult.studentId === null
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, studentIdIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, studentIdIsValid: true }));
    }

    if (newExamResult.examId?.trim() === "" || newExamResult.examId === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, examIdIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, examIdIsValid: true }));
    }
    if (
      newExamResult.score === null ||
      newExamResult.score === "" ||
      newExamResult.score < 0 ||
      newExamResult.score > maxScore
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, scoreIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, scoreIsValid: true }));
    }
    if (formValid) {
      mutate.mutate(newExamResult);
    }
  };
  if (isLoaExam || isLoaStudent) {
    return <h1>... Is Loading</h1>;
  }
  console.log(newExamResult);
  return (
    <div className="update-student">
      <div className="container">
        <AdminGroupTitle
          child1={"Exam's Result"}
          child2={"Exam's Result / Create Exam's Result"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Exam's Result Information</h1>
          </div>
          <div className="inputs">
            <Box
              display={"flex"}
              flexDirection={"column"}
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "65ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={studentData?.data ?? []}
                getOptionLabel={(option) =>
                  `${option.fullName} - ${
                    option.groupName ? option.groupName : "No Group"
                  }`
                }
                onChange={(e, newValue) => {
                  setNewExamResult((prev) => ({
                    ...prev,
                    studentId: newValue?.id,
                  }));
                }}
                inputValue={studentInputValue}
                onInputChange={(e, newValue) => {
                  setStudentInputValue(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Student"
                    error={enteredValueisValid.studentIdIsValid ? "" : "error"}
                    helperText={
                      !enteredValueisValid.studentIdIsValid &&
                      `Student is required`
                    }
                  />
                )}
              />
              <Autocomplete
                aria-required
                disablePortal
                id="combo-box-demo"
                size="small"
                options={examData?.data ?? []}
                getOptionLabel={(option) =>
                  `  ${option.name} -   ${option.groupSubject.subjectName} - ${option.groupSubject.groupName}`
                }
                onChange={(e, newValue) => {
                  setNewExamResult((prev) => ({
                    ...prev,
                    examId: newValue?.id,
                  }));
                }}
                inputValue={examInputValue}
                onInputChange={(e, newValue) => {
                  setExamInputValue(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Exam"
                    error={enteredValueisValid.examIdIsValid ? "" : "error"}
                    helperText={
                      !enteredValueisValid.examIdIsValid && `Exam is required`
                    }
                  />
                )}
              />
              <TextField
                required
                size="small"
                id="outlined-basic"
                label="Score"
                variant="outlined"
                name="score"
                onChange={handleExamResult}
                type="number"
                error={enteredValueisValid.scoreIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.scoreIsValid && maxScore
                    ? `Score must be between 0 and ${maxScore}`
                    : "Score must be more than 0"
                }
              />
              {maxScore ? (
                <div>
                  <Alert variant="filled" severity="warning">
                    Max Score of exam - {maxScore}
                  </Alert>
                </div>
              ) : (
                ""
              )}
              {error?.response?.data?.message ? (
                <Alert variant="filled" severity="error">
                  {error.response?.data?.message}
                </Alert>
              ) : (
                ""
              )}

              <div>
                <Button
                  type="submit"
                  onClick={handleNewExamResult}
                  variant="contained"
                >
                  Create Exam Result
                </Button>
              </div>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreateExamResult;
