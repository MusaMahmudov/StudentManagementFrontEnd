import {
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
import { AdminExamTypeTitle } from "../../../../UI/Common/AdminExamTypeTitle";
const UpdateExamTypeAdmin = () => {
  const { examTypeServices } = useService();

  const navigate = useNavigate();

  const { state: examTypeData } = useLocation();
  const [inputState, setInputState] = useState(examTypeData);
  const mutate = useMutation(() =>
    examTypeServices.updateExamType(inputState.id, inputState)
  );
  const handleExamTypeUpdate = () => {
    mutate.mutate();
    navigate("/ExamTypes");
  };

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
            <h1>Student Information</h1>
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
                label="Full Name"
                variant="outlined"
                defaultValue={examTypeData.name}
                onChange={(e) =>
                  setInputState((prev) => ({ ...prev, name: e.target.value }))
                }
              />

              <Button
                type="submit"
                onClick={() => handleExamTypeUpdate()}
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
