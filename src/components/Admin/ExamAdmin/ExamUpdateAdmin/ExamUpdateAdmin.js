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
import { useEffect, useReducer, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";
import { queryKeys } from "../../../../QueryKeys";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { updateExamReducer } from "../../../../Reducers/UpdateExamReducer";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
const UpdateExamAdmin = () => {
  const { examServices, examTypeServices, groupSubjectServices } = useService();
  const { data: examTypeData, isError } = useQuery(
    [queryKeys.getExamTypes],
    () => examTypeServices.getAllExamTypes()
  );
  const { data: groupSubjectsData } = useQuery(
    [queryKeys.getGroupSubjects],
    () => groupSubjectServices.getAllGroupSubjects()
  );

  const [examTypeError, setExamTypeError] = useState();
  if (isError) {
    setExamTypeError("Something get wrong");
  }

  const navigate = useNavigate();
  console.log(examTypeData);
  const { state: examData } = useLocation();
  const [groupSubjectInputValue, setGroupSubjectInputValue] = useState(
    examData?.groupSubject.id
  );
  const [examTypeInputValue, setExamTypeInputValue] = useState(
    examData?.examType
  );
  const handleDate = (date) => {
    console.log(date);
    dispatch({
      type: "date",
      payload: `${date.$y}-${date.$M}-${date.$D}T18:47:20.116`,
    });
  };
  console.log(examData);

  const [currentExamTypeId, setCurrentExamTypeId] = useState(
    examTypeData?.data.find((ExamType) => ExamType.name === examData.examType)
      .id
  );
  const [currentGroupSubjectId, setCurrentGroupSubjectId] = useState(
    groupSubjectsData?.data.find(
      (groupSubject) => groupSubject.id === examData.groupSubject.id
    ).id
  );

  console.log("currentExamType", currentExamTypeId);

  const [inputState, dispatch] = useReducer(updateExamReducer, {
    name: examData?.name,
    date: examData?.date,
    examTypeId: currentExamTypeId,
    groupSubjectId: currentGroupSubjectId,
    maxScore: examData.maxScore,
  });
  const mutate = useMutation(() =>
    examServices.updateExam(examData.id, inputState)
  );
  const handleExamUpdate = () => {
    mutate.mutate();
    navigate("/Exams");
  };
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
                defaultValue={examData.name}
                onChange={(e) =>
                  dispatch({
                    type: "name",
                    payload: e.target.value,
                  })
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Max Score"
                variant="outlined"
                defaultValue={examData.maxScore}
                onChange={(e) =>
                  dispatch({
                    type: "maxScore",
                    payload: e.target.value,
                  })
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(inputState.date)}
                  defaultValue={dayjs(examData.date)}
                  onChange={handleDate}
                />
              </LocalizationProvider>

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={examTypeData?.data ?? []}
                getOptionLabel={(option) => option.name}
                inputValue={examTypeInputValue}
                onInputChange={(e, newValue) => {
                  setExamTypeInputValue(newValue);
                }}
                value={
                  examTypeData?.data.find(
                    (item) => item.id === examData.examType
                  ) || null
                }
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Exam Type" />
                )}
                onChange={(e, newValue) =>
                  dispatch({
                    type: "examTypeId",
                    payload: newValue ? newValue.id : null,
                  })
                }
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
                      (examData.groupSubject && examData.groupSubject.id)
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
              />
              {/* <TextField
                  size="small"
                  id="outlined-basic"
                  label="User Id"
                  variant="outlined"
                  defaultValue={groupData.appUser?.id}
                  onChange={(e) =>
                    dispatch({
                      type: "appUserId",
                      payload: e.target.value.trim(),
                    })
                  }
                /> */}

              <Button
                type="submit"
                onClick={() => handleExamUpdate()}
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
