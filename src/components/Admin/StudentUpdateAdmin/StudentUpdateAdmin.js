import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./studentUpdateAdmin.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../hooks";
import { queryKeys } from "../../../QueryKeys";
import { updateStudentReducer } from "../../../Reducers/UpdateStudentReducer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
const UpdateStudentAdmin = () => {
  const { groupServices, studentServices } = useService();
  const groupQuery = useQuery([queryKeys.getGroupsQuery], () =>
    groupServices.getAllGroups()
  );
  const navigate = useNavigate();

  const { state: studentData } = useLocation();
  const [newBirthday, setNewBirthday] = useState(studentData.date0fBirth);
  const [inputState, dispatch] = useReducer(updateStudentReducer, studentData);
  const mutate = useMutation(() =>
    studentServices.updateStudent(inputState.id, inputState)
  );
  const handleStudentUpdate = () => {
    mutate.mutate();
    navigate("/Students");
  };
  const handleBirthday = (date) => {
    dispatch({
      type: "dateOfBirth",
      payload: `${date.$Y}-${date.$M}-${date.$D}T18:47:20.116`,
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
                defaultValue={studentData.fullName}
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
                label="Year Of Graduation"
                variant="outlined"
                defaultValue={studentData.yearOfGraduation}
                onChange={(e) =>
                  dispatch({
                    type: "yearOfGraduation",
                    payload: e.target.value,
                  })
                }
              />

              <TextField
                size="small"
                id="outlined-basic"
                label="Education Degree"
                variant="outlined"
                defaultValue={studentData.educationDegree}
                onChange={(e) =>
                  dispatch({
                    type: "educationDegree",
                    payload: e.target.value,
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
                label="Form Of Education"
                variant="outlined"
                defaultValue={studentData.formOfEducation}
                onChange={(e) =>
                  dispatch({
                    type: "formOfEducation",
                    payload: e.target.value,
                  })
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Type Of Payment"
                variant="outlined"
                defaultValue={studentData.typeOfPayment}
                onChange={(e) =>
                  dispatch({
                    type: "typeOfPayment",
                    payload: e.target.value,
                  })
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Home Phone Number"
                variant="outlined"
                defaultValue={studentData.homePhoneNumber}
                onChange={(e) =>
                  dispatch({
                    type: "homePhoneNumber",
                    payload: e.target.value,
                  })
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                defaultValue={studentData.phoneNumber}
                onChange={(e) =>
                  dispatch({
                    type: "phoneNumber",
                    payload: e.target.value,
                  })
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                defaultValue={studentData.email}
                onChange={(e) =>
                  dispatch({
                    type: "email",
                    payload: e.target.value,
                  })
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="AppUserId"
                variant="outlined"
                defaultValue={studentData.appUser?.id}
                onChange={(e) =>
                  dispatch({
                    type: "appUser",
                    payload: e.target.value,
                  })
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={newBirthday}
                  defaultValue={dayjs(newBirthday)}
                  onChange={handleBirthday}
                />
              </LocalizationProvider>

              <Select
                multiple
                native
                defaultValue={studentData.groups}
                label="Groups"
                inputProps={{
                  id: "select-multiple-native",
                }}
                onChange={(e) =>
                  dispatch({
                    type: "groups",
                    payload: e.target.value,
                  })
                }
              >
                {groupQuery.data?.data.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </Select>
              <Button
                type="submit"
                onClick={() => handleStudentUpdate()}
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
export default UpdateStudentAdmin;
