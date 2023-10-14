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
import useService from "../../../hooks";
import { queryKeys } from "../../../QueryKeys";
import { updateStudentReducer } from "../../../Reducers/UpdateStudentReducer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { updateTeacherReduce } from "../../../Reducers/UpdateTeacherReducer";
const UpdateTeacherAdmin = () => {
  const { teacherServices } = useService();

  const navigate = useNavigate();

  const { state: teacherData } = useLocation();
  console.log(teacherData);
  const [newBirthday, setNewBirthday] = useState();
  const [inputState, dispatch] = useReducer(updateTeacherReduce, teacherData);
  const mutate = useMutation(() =>
    teacherServices.updateTeacher(inputState.id, inputState)
  );
  const handleTeacherUpdate = () => {
    mutate.mutate();
    navigate("/Teachers");
  };
  const handleBirthday = (date) => {
    console.log(date);
    dispatch({
      type: "dateOfBirth",
      payload: `${date.$y}-${date.$M}-${date.$D}T18:47:20.116`,
    });
  };
  console.log(inputState);
  return (
    <div className="update-student">
      <div className="container">
        <section className="title">
          <div className="title-left">
            <h1>Update Student</h1>
          </div>
          <div className="title-right">
            <h1>Student/Update Student</h1>
          </div>
        </section>
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
                defaultValue={teacherData.fullName}
                onChange={(e) =>
                  dispatch({
                    type: "fullName",
                    payload: e.target.value,
                  })
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="eMail"
                variant="outlined"
                defaultValue={teacherData.eMail}
                onChange={(e) =>
                  dispatch({
                    type: "eMail",
                    payload: e.target.value,
                  })
                }
              />

              <TextField
                size="small"
                id="outlined-basic"
                label="User Id"
                variant="outlined"
                defaultValue={teacherData.appUser?.id}
                onChange={(e) =>
                  dispatch({
                    type: "appUserId",
                    payload: e.target.value.trim(),
                  })
                }
              />

              {/* <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={studentData?.data.gender}
                    label="Age"
                    onChange={(e) =>
                      dispatch({
                        type: "gender",
                        payload: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={studentData?.data.gender}>
                      {inputState.gender}
                    </MenuItem>
                    <MenuItem
                      value={inputState.gender == "Male" ? "Female" : "Male"}
                    >
                      {inputState.gender == "Male" ? "Female" : "Male"}
                    </MenuItem>
                  </Select> */}

              <TextField
                size="small"
                id="outlined-basic"
                label="Home Phone Number"
                variant="outlined"
                defaultValue={teacherData.address}
                onChange={(e) =>
                  dispatch({
                    type: "address",
                    payload: e.target.value,
                  })
                }
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(inputState.dateOfBirth)}
                  defaultValue={dayjs(teacherData.dateOfBirth)}
                  onChange={handleBirthday}
                />
              </LocalizationProvider>

              <Button
                type="submit"
                onClick={() => handleTeacherUpdate()}
                variant="contained"
              >
                Update student
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default UpdateTeacherAdmin;
