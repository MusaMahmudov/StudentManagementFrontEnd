import {
  Alert,
  Autocomplete,
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
import { updateExamReducer } from "../../../../Reducers/UpdateExamReducer";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
import { TokenContext } from "../../../../Contexts/Token-context";
import { updateExamResultReducer } from "../../../../Reducers/UpdateExamResultReducer";
const UpdateExamResultAdmin = () => {
  const { token } = useContext(TokenContext);
  const [maxScore, setMaxScore] = useState();
  const { examServices, examResultServices, studentServices } = useService();
  const [error, setError] = useState();
  const [inputState, dispatch] = useReducer(updateExamResultReducer, {});
  const { Id } = useParams();
  const examResultQuery = useQuery([queryKeys.getExamResultById], () =>
    examResultServices.getExamResultByIdForUpdate(Id, token)
  );

  const { data: studentData, isLoadingStudent } = useQuery(
    [queryKeys.getStudentsQuery],
    () => studentServices.getAllStudentsForCreateOrUpdateForExamResult(token)
  );
  const {
    data: examData,
    isError: isErrorExam,
    isLoadingExam,
    isSuccess: examDataIsSuccess,
  } = useQuery([queryKeys.getExams], () => examServices.getAllExams(token));
  console.log(examResultQuery.data?.data, "examResult");

  const [examError, setExamError] = useState();
  if (isErrorExam) {
    setExamError("Something went wrong");
  }
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    studentIdIsValid: true,
    examIdIsValid: true,
    scoreIsValid: true,
  });
  const navigate = useNavigate();
  const [examInputValue, setExamInputValue] = useState();
  const [studentInputValue, setStudentInputValue] = useState();
  console.log("examtype", examInputValue);

  console.log("exam Data", examResultQuery.data?.data);
  useEffect(() => {
    let exam;
    if (inputState.examId) {
      exam = examData?.data.find((exam) => exam.id === inputState.examId);
      setMaxScore(exam.maxScore);
    } else {
      setMaxScore(null);
    }
  }, [examDataIsSuccess]);
  useEffect(() => {
    let exam;
    if (inputState.examId && examDataIsSuccess) {
      exam = examData?.data.find((exam) => exam.id === inputState.examId);
      setMaxScore(exam.maxScore);
    } else {
      setMaxScore(null);
    }
  }, [inputState.examId]);

  const mutate = useMutation(
    () => examResultServices.updateExamResult(Id, inputState, token),
    {
      onSuccess: () => navigate("/ExamResults"),
      onError: (error) => setError(error),
    }
  );
  const handleExamResultUpdate = (e) => {
    e.preventDefault();
    if (inputState.studentId?.trim() === "" || inputState.studentId === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, studentIdIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, studentIdIsValid: true }));
    }

    if (inputState.examId?.trim() === "" || inputState.examId === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, examIdIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, examIdIsValid: true }));
    }
    if (
      inputState.score === null ||
      inputState.score === "" ||
      inputState.score < 0 ||
      inputState.score > maxScore
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, scoreIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, scoreIsValid: true }));
    }

    mutate.mutate();
  };
  useEffect(() => {
    if (examResultQuery.isSuccess) {
      setStudentInputValue(() => {
        return studentData?.data.find(
          (item) => item.id === examResultQuery.data?.data.studentId
        );
      });
      setExamInputValue(() => {
        return examData?.data.find(
          (item) => item.id === examResultQuery.data?.data.examId
        );
      });
      dispatch({
        type: "init",
        payload: examResultQuery.data?.data,
      });
    }
  }, [examResultQuery.isSuccess]);
  if (examResultQuery.isLoading) {
    return <h1>...Is Loading</h1>;
  }
  if (examResultQuery.isError) {
    return <h1>Something went wrong</h1>;
  }
  console.log("inputState", inputState);
  console.log("students", studentData?.data);

  return (
    <div className="update-group">
      <div className="container">
        <AdminGroupTitle
          child1={"Update Exam"}
          child2={"Exam / Updaete Exam"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Exam Information</h1>
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
                id="combo-box-mainGroup"
                size="small"
                options={studentData?.data ?? []}
                getOptionLabel={(option) =>
                  `  ${option.fullName} -   ${option.groupName} `
                }
                onChange={(e, newValue) => {
                  dispatch({
                    type: "studentId",
                    payload: newValue?.id,
                  });
                }}
                inputValue={studentInputValue}
                onInputChange={(e, newValue) => {
                  setStudentInputValue(newValue);
                }}
                value={studentInputValue}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Student" />
                )}
              />
              {/* <Autocomplete
                value={examInputValue}
                disablePortal
                id="combo-box-mainGroup"
                size="small"
                defaultValue={examInputValue}
                onInputChange={(e, newValue) => {
                  setExamInputValue(newValue);
                }}
                options={examData?.data ?? []}
                getOptionLabel={(option) =>
                  `${option.examType} - ${option.groupSubject.subjectName} - ${option.groupSubject.groupName}`
                }
                onChange={(e, newValue) => {
                  dispatch({
                    type: "examId",
                    payload: newValue?.id,
                  });
                }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Exam" />}
              /> */}
              <Autocomplete
                disablePortal
                id="combo-box-subject"
                size="small"
                defaultValue={examInputValue}
                onInputChange={(e, newValue) => {
                  setExamInputValue(newValue);
                }}
                options={examData?.data ?? []}
                getOptionLabel={(option) =>
                  `${option.examType} - ${option.groupSubject.subjectName} - ${option.groupSubject.groupName}`
                }
                onChange={(e, newValue) => {
                  dispatch({
                    type: "examId",
                    payload: newValue?.id,
                  });
                }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Exam" />}
              />
              <TextField
                required
                size="small"
                id="outlined-basic"
                label="Score"
                variant="outlined"
                name="score"
                defaultValue={examResultQuery.data?.data.score}
                onChange={(e, newValue) => {
                  dispatch({
                    type: "score",
                    payload: e.target.value,
                  });
                }}
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

              <Button
                type="submit"
                onClick={handleExamResultUpdate}
                variant="contained"
              >
                Update Exam's Result
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default UpdateExamResultAdmin;
