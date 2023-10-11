import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./studentUpdateAdmin.scss";
import { useLocation, useParams } from "react-router-dom";
import { useReducer, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../hooks";
import { queryKeys } from "../../../QueryKeys";
import { updateStudentReducer } from "../../../Reducers/UpdateStudentReducer";

const UpdateStudentAdmin = () => {
  const { groupServices, studentServices } = useService();
  const groupQuery = useQuery([queryKeys.getGroupsQuery], () =>
    groupServices.getAllGroups()
  );
  const { state } = useLocation();
  const [inputState, dispatch] = useReducer(updateStudentReducer, { ...state });

  console.log(inputState);
  const mutate = useMutation(() =>
    studentServices.updateStudent(inputState.id, inputState)
  );
  const handleStudentUpdate = () => {
    mutate.mutate();
  };
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
                defaultValue={inputState.fullName}
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
                defaultValue={state.yearOfGraduation}
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
                defaultValue={inputState.educationDegree}
                onChange={(e) =>
                  dispatch({
                    type: "educationDegree",
                    payload: e.target.value,
                  })
                }
              />

              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={state.gender}
                label="Age"
                onChange={(e) =>
                  dispatch({
                    type: "gender",
                    payload: e.target.value,
                  })
                }
              >
                <MenuItem value={inputState.gender}>
                  {inputState.gender}
                </MenuItem>
                <MenuItem
                  value={inputState.gender == "Male" ? "Female" : "Male"}
                >
                  {inputState.gender == "Male" ? "Female" : "Male"}
                </MenuItem>
              </Select>

              <TextField
                size="small"
                id="outlined-basic"
                label="Form Of Education"
                variant="outlined"
                defaultValue={state.formOfEducation}
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
                defaultValue={state.typeOfPayment}
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
                defaultValue={state.homePhoneNumber}
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
                defaultValue={state.phoneNumber}
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
                defaultValue={state.email}
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
                defaultValue={state.appUser?.id}
                onChange={(e) =>
                  dispatch({
                    type: "appUser",
                    payload: e.target.value,
                  })
                }
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Date Of Birth"
                variant="outlined"
                defaultValue={state.dateOfBirth}
                onChange={(e) =>
                  dispatch({
                    type: "dateOfBirth",
                    payload: e.target.value,
                  })
                }
              />

              <Select
                multiple
                native
                defaultValue={state.groups}
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
              <Button onClick={() => handleStudentUpdate()} variant="contained">
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
