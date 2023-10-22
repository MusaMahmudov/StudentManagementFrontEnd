import {
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
const UpdateExamAdmin = () => {
  const { token } = useContext(TokenContext);
  const { examServices, examTypeServices, groupSubjectServices } = useService();
  const { data: examTypeData, isError } = useQuery(
    [queryKeys.getExamTypes],
    () => examTypeServices.getAllExamTypes(token)
  );
  const { data: groupSubjectsData } = useQuery(
    [queryKeys.getGroupSubjects],
    () => groupSubjectServices.getAllGroupSubjects(token)
  );
  const { Id } = useParams();
  const examQuery = useQuery([queryKeys.getExamById], () =>
    examServices.getExamByIdForUpdate(Id, token)
  );

  const [examTypeError, setExamTypeError] = useState();
  if (isError) {
    setExamTypeError("Something get wrong");
  }
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    nameIsValid: true,
    maxScoreIsValid: true,
    dateIsValid: true,
  });
  const navigate = useNavigate();
  const [groupSubjectInputValue, setGroupSubjectInputValue] = useState();
  const [examTypeInputValue, setExamTypeInputValue] = useState();
  console.log("examtype", examTypeInputValue);
  const handleDate = (date) => {
    console.log(date);
    dispatch({
      type: "date",
      payload: `${date.$y}-${date.$M < 10 ? `0${date.$M}` : `${date.$M}`}-${
        date.$D < 10 ? `0${date.$D}` : `${date.$D}`
      }T18:47:20.116`,
    });
  };
  console.log("exam Data", examQuery.data?.data);

  const [inputState, dispatch] = useReducer(updateExamReducer, {});
  // name: examQuery.data?.data?.name,
  //   date: examQuery.data?.data?.date,
  //   examTypeId: examQuery.data?.data.examType?.id,
  //   groupSubjectId: examQuery.data?.data.groupSubject?.id,
  //   maxScore: examQuery.data?.data.maxScore,
  const mutate = useMutation(
    () => examServices.updateExam(Id, inputState, token),
    {
      onSuccess: () => navigate("/Exams"),
    }
  );
  const handleExamUpdate = (e) => {
    e.preventDefault();
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
    console.log("succsse");
    if (examQuery.isSuccess) {
      setGroupSubjectInputValue(() => {
        return groupSubjectsData?.data.find(
          (item) => item.id === examQuery.data?.data.groupSubjectId
        );
      });
      setExamTypeInputValue(() => {
        return examTypeData?.data.find(
          (item) => item.id === examQuery.data?.data.examTypeId
        );
      });
      dispatch({
        type: "init",
        payload: examQuery.data?.data,
      });
    }
  }, [examQuery.isSuccess]);
  if (examQuery.isLoading) {
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
                onChange={(e, newValue) => {
                  dispatch({
                    type: "examTypeId",
                    payload: newValue?.id,
                  });
                }}
                inputValue={examTypeInputValue}
                onInputChange={(e, newValue) => {
                  setExamTypeInputValue(newValue);
                }}
                value={examTypeInputValue}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Exam Type" />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-mainGroup"
                size="small"
                defaultValue={groupSubjectInputValue}
                options={groupSubjectsData?.data ?? []}
                getOptionLabel={(option) =>
                  `${option.subject.name} - ${option.group.name}`
                }
                onChange={(e, newValue) => {
                  dispatch({
                    type: "groupSubjectId",
                    payload: newValue?.id,
                  });
                }}
                inputValue={groupSubjectInputValue}
                onInputChange={(e, newValue) => {
                  setGroupSubjectInputValue(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Group Subject" />
                )}
              />
              {/* <Autocomplete
                disablePortal
                id="combo-box-subject"
                size="small"
                defaultValue={examTypeData}
                onInputChange={(e, newValue) => {
                  setGroupSubjectInputValue(newValue.id);
                }}
                options={groupSubjectsData?.data ?? []}
                getOptionLabel={(option) => option.subject.name}
                onChange={(e, newValue) => {
                  dispatch({
                    type: "subjectId",
                    payload: newValue?.id,
                  });
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Exam's type" />
                )}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={groupSubjectsData?.data ?? []}
                getOptionLabel={(option) =>
                  `${option.subject.name} - ${option.group.name}`
                } // Fixed the concatenation issue
                inputValue={groupSubjectInputValue}
                onInputChange={(e, newValue) => {
                  setGroupSubjectInputValue(newValue);
                }}
                value={
                  groupSubjectsData?.data.find(
                    (item) =>
                      item.id ===
                      (examQuery.data?.data.groupSubject &&
                        examQuery.data?.data.groupSubject.id)
                  ) || null
                }
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Subject"
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
                onChange={(e, newValue) =>
                  dispatch({
                    type: "groupSubjectId",
                    payload: newValue ? newValue.id : null,
                  })
                }
              /> */}

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
