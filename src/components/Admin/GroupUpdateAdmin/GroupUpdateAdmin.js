import {
  Autocomplete,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./groupUpdateAdmin.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useReducer, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../hooks";
import { queryKeys } from "../../../QueryKeys";
import { updateStudentReducer } from "../../../Reducers/UpdateStudentReducer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { updateTeacherReduce } from "../../../Reducers/UpdateTeacherReducer";
import { AdminGroupTitle } from "../../../UI/Common/AdminGroupTitle";
import { updateGroupReducer } from "../../../Reducers/UpdateGroupReducer";
import { type } from "@testing-library/user-event/dist/type";
import { TokenContext } from "../../../Contexts/Token-context";
const UpdateGroupAdmin = () => {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const { Id } = useParams();
  const [error, setError] = useState();
  const [studentsDefaultValue, setStudentsDefaultValue] = useState([]);
  const { groupServices, facultyServices, studentServices } = useService();
  const {
    data: facultyData,
    isError,
    isLoading: facultyIsLoading,
  } = useQuery([queryKeys.getFaculties], () =>
    facultyServices.getAllFaculties(token)
  );
  const studentQuery = useQuery([queryKeys.getStudentsQuery], () =>
    studentServices.getStudentForGroupUpdate(Id, token)
  );

  const groupQuery = useQuery([queryKeys.getGroupQuery], () =>
    groupServices.getGroupByIdForUpdate(Id, token)
  );
  const [facultyError, setFacultyError] = useState();
  if (isError) {
    setFacultyError("Something get wrong");
  }

  const [inputState, dispatch] = useReducer(updateGroupReducer, {});
  const mutate = useMutation(
    () => groupServices.updateGroup(Id, inputState, token),
    { onSuccess: () => navigate("/Groups") }
  );
  const handleGroupUpdate = (e) => {
    e.preventDefault();
    mutate.mutate(Id, inputState, token);
  };
  useEffect(() => {
    if (
      mutate.isError &&
      mutate.error.response.data.message &&
      mutate.error.response.status != "500"
    ) {
      setError(mutate.error.response.data.message);
    }
  }, [mutate]);
  useEffect(() => {
    dispatch({
      type: "init",
      payload: groupQuery.data?.data,
    });

    const students = studentQuery.data?.data.filter((student) =>
      groupQuery.data?.data.studentsId.some(
        (studentId) => studentId === student.id
      )
    );
    console.log(students, "studentsasdads");
  }, [groupQuery.isSuccess, studentQuery.isSuccess, facultyData]);
  if (groupQuery.isLoading || studentQuery.isLoading || facultyIsLoading) {
    return <h1>...Is Loading</h1>;
  }
  console.log(studentQuery.data?.data, "student");

  console.log("inputState", inputState);
  return (
    <div className="update-group">
      <div className="container">
        <AdminGroupTitle
          child1={"Update Group"}
          child2={"Group / Updaete Group"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Group Information</h1>
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
                defaultValue={groupQuery.data?.data.name}
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
                label="Year"
                variant="outlined"
                defaultValue={groupQuery.data?.data.year}
                onChange={(e) =>
                  dispatch({
                    type: "year",
                    payload: e.target.value,
                  })
                }
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={facultyData?.data ?? []}
                getOptionLabel={(option) => option.name}
                defaultValue={
                  facultyData?.data.find(
                    (item) => item.id === groupQuery.data?.data.facultyId
                  ) || null
                }
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Faculty" />
                )}
                onChange={(e, newValue) => {
                  dispatch({
                    type: "facultyId",
                    payload: newValue ? newValue.id : null,
                  });
                }}
              />
              {studentQuery.data && (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={studentQuery.data?.data ?? null}
                  getOptionLabel={(option) => option.fullName}
                  name="studentsId"
                  defaultValue={[
                    ...studentQuery.data?.data.filter((student) =>
                      groupQuery.data?.data.studentsId.some(
                        (studentId) => studentId === student.id
                      )
                    ),
                  ]}
                  onChange={(e, newValue) => {
                    if (newValue) {
                      dispatch({
                        type: "studentsId",
                        payload: newValue.map((student) => student.id),
                      });
                    } else {
                      dispatch({
                        type: "studentsId",
                        payload: [],
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Students"
                      placeholder="Students"
                    />
                  )}
                />
              )}
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
              <div className="errorMessage">
                <h1>{error}</h1>
              </div>
              <Button
                type="submit"
                onClick={handleGroupUpdate}
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
export default UpdateGroupAdmin;
