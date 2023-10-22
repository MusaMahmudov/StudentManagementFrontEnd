import { Autocomplete, Box, Button, Select, TextField } from "@mui/material";
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
const CreateExam = () => {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken[tokenRoleProperty] !== "Admin") {
        navigate("Error");
      }
    }
  });
  const { examServices, examTypeServices, groupSubjectServices } = useService();
  const { data: examTypeData } = useQuery([queryKeys.getExamTypes], () =>
    examTypeServices.getAllExamTypes(token)
  );

  const { data: groupSubjectData } = useQuery(
    [queryKeys.getGroupSubjects],
    () => groupSubjectServices.getAllGroupSubjects(token)
  );
  const [examTypeInputValue, setExamTypeInputValue] = useState();
  const [groupSubjectInputValue, setGroupSubjectInputValue] = useState();

  const [examDate, setExamDate] = useState();
  const [newExam, setNewExam] = useState({
    name: null,
    date: null,
    examTypeId: null,
    groupSubjectId: null,
    maxScore: null,
  });
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    nameIsValid: true,
    maxScoreIsValid: true,
    dateIsValid: true,
  });
  let formValid = true;

  const handleDate = (date) => {
    console.log(date);
    setNewExam((prev) => ({
      ...prev,
      date: `${date.$y}-${date.$M < 9 ? `0${date.$M + 1}` : `${date.$M + 1}`}-${
        date.$D < 9 ? `0${date.$D}` : `${date.$D}`
      }T18:47:20.116`,
    }));
  };
  console.log(newExam);
  const handleExam = ({ target: { value: inputValue, name: inputName } }) => {
    setNewExam((prev) => ({ ...prev, [inputName]: inputValue.trim() }));
  };
  const mutate = useMutation(() => examServices.createExam(newExam, token), {
    onSuccess: () => navigate("/Exams"),
  });
  console.log(groupSubjectData);

  const handleNewExam = (e) => {
    e.preventDefault();
    if (newExam.name?.trim() === "" || newExam.name === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: true }));
    }
    if (newExam.maxScore?.trim() === "" || newExam.maxScore === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, maxScoreIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, maxScoreIsValid: true }));
    }
    if (newExam.date?.trim() === "" || newExam.date === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, dateIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, dateIsValid: true }));
    }

    if (formValid) {
      mutate.mutate(newExam);
    }
  };

  return (
    <div className="update-student">
      <div className="container">
        <AdminGroupTitle
          child1={"Faculty"}
          child2={"Faculty / Create Faculty"}
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
                required
                size="small"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                onChange={handleExam}
                error={enteredValueisValid.nameIsValid ? "" : "error"}
                helperText={!enteredValueisValid.nameIsValid && "Name required"}
              />
              <TextField
                required
                size="small"
                id="outlined-basic"
                label="Max Score"
                variant="outlined"
                name="maxScore"
                onChange={handleExam}
                type="number"
                error={enteredValueisValid.maxScoreIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.maxScoreIsValid && "Max Score required"
                }
              />

              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                error={enteredValueisValid.dateIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.dateIsValid && "Date  required"
                }
              >
                <DatePicker value={examDate} onChange={handleDate} />
              </LocalizationProvider>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={examTypeData?.data ?? []}
                getOptionLabel={(option) => option.name}
                onChange={(e, newValue) => {
                  setNewExam((prev) => ({
                    ...prev,
                    examTypeId: newValue?.id,
                  }));
                }}
                inputValue={examTypeInputValue}
                onInputChange={(e, newValue) => {
                  setExamTypeInputValue(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Exam type" />
                )}
              />
              <Autocomplete
                aria-required
                disablePortal
                id="combo-box-demo"
                size="small"
                options={groupSubjectData?.data ?? []}
                getOptionLabel={(option) =>
                  `${option.subject.name} - ${option.group.name}`
                }
                onChange={(e, newValue) => {
                  setNewExam((prev) => ({
                    ...prev,
                    groupSubjectId: newValue?.id,
                  }));
                }}
                inputValue={groupSubjectInputValue}
                onInputChange={(e, newValue) => {
                  setGroupSubjectInputValue(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Subject" />
                )}
              />

              <Button type="submit" onClick={handleNewExam} variant="contained">
                Create Faculty
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreateExam;
