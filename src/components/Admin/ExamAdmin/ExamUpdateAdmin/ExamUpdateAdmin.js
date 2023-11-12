import { Autocomplete, Box, Button, TextField } from "@mui/material";
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
const UpdateExamAdmin = () => {
  const { token } = useContext(TokenContext);
  const { examServices, examTypeServices, groupSubjectServices } = useService();
  const [error, setError] = useState();
  const {
    data: examTypeData,
    isError,
    isLoading: examTypeIsLoading,
  } = useQuery([queryKeys.getExamTypes], () =>
    examTypeServices.getAllExamTypes(token)
  );
  const { data: groupSubjectsData, isLoading: groupSubjectIsLoading } =
    useQuery([queryKeys.getGroupSubjects], () =>
      groupSubjectServices.getAllGroupSubjectsForExamForUpdate(token)
    );
  const { Id } = useParams();
  const examQuery = useQuery([queryKeys.getExamById], () =>
    examServices.getExamByIdForUpdate(Id, token)
  );
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    nameIsValid: true,
    maxScoreIsValid: true,
    dateIsValid: true,
  });
  const navigate = useNavigate();

  const handleDate = (date) => {
    dispatch({
      type: "date",
      payload: dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSS"),
    });
  };

  const [inputState, dispatch] = useReducer(updateExamReducer, {});

  const mutate = useMutation(
    () => examServices.updateExam(Id, inputState, token),
    {
      onSuccess: () => navigate("/Exams"),
    }
  );
  useEffect(() => {
    if (
      mutate.isError &&
      mutate.error.response.data.message &&
      mutate.error.response.status != "500"
    ) {
      setError(mutate.error.response.data.message);
    }
  }, [mutate]);

  const handleExamUpdate = (e) => {
    e.preventDefault();
    setError("");

    if (
      inputState.name === "" ||
      inputState.groupId === null ||
      inputState.name.trim().length < 3
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: true }));
    }
    if (
      inputState.maxScore === "" ||
      inputState.subjectId === null ||
      inputState.maxScore < 0
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, maxScoreIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, maxScoreIsValid: true }));
    }

    if (inputState.date === "" || inputState.credits === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, dateIsValid: false }));
    } else {
      setEnteredValueIsValid((prev) => ({ ...prev, dateIsValid: true }));
    }

    mutate.mutate();
  };
  useEffect(() => {
    if (examQuery.isSuccess) {
      dispatch({
        type: "init",
        payload: examQuery.data?.data,
      });
    }
  }, [examQuery.isSuccess]);
  if (examQuery.isLoading || examTypeIsLoading || groupSubjectIsLoading) {
    return <h1>...Is Loading</h1>;
  }
  if (examQuery.isError) {
    return <h1>Something went wrong</h1>;
  }
  console.log("inputState", inputState);
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
              <TextField
                size="small"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                defaultValue={examQuery.data?.data.name}
                onChange={(e) =>
                  dispatch({
                    type: "name",
                    payload: e.target.value,
                  })
                }
                error={enteredValueisValid.nameIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.nameIsValid &&
                  "Name must be minimum 3 length"
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Max Score"
                variant="outlined"
                defaultValue={examQuery.data?.data.maxScore}
                onChange={(e) =>
                  dispatch({
                    type: "maxScore",
                    payload: e.target.value,
                  })
                }
                error={enteredValueisValid.maxScoreIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.maxScoreIsValid &&
                  "Max score must be more than zero"
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(inputState.date)}
                  defaultValue={dayjs(examQuery.data?.data.date)}
                  onChange={handleDate}
                />
              </LocalizationProvider>
              <h1 className="errorMessage">
                {enteredValueisValid.dateIsValid ? "" : "Date is required"}
              </h1>
              <Autocomplete
                disablePortal
                id="combo-box-mainGroup"
                size="small"
                options={examTypeData?.data ?? []}
                getOptionLabel={(option) => option.name}
                defaultValue={examTypeData?.data.find(
                  (examType) => examType.id === examQuery.data?.data.examTypeId
                )}
                onChange={(e, newValue) => {
                  dispatch({
                    type: "examTypeId",
                    payload: newValue?.id,
                  });
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Exam Type" />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-mainGroup"
                size="small"
                options={groupSubjectsData?.data ?? []}
                getOptionLabel={(option) =>
                  `${option.subjectName} - ${option.groupName}`
                }
                defaultValue={groupSubjectsData?.data.find(
                  (groupSubject) =>
                    groupSubject.id === examQuery.data?.data.groupSubjectId
                )}
                onChange={(e, newValue) => {
                  dispatch({
                    type: "groupSubjectId",
                    payload: newValue?.id,
                  });
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Group Subject" />
                )}
              />
              <h1 className="errorMessage">{error}</h1>
              <Button
                type="submit"
                onClick={handleExamUpdate}
                variant="contained"
              >
                Update Exam
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default UpdateExamAdmin;
