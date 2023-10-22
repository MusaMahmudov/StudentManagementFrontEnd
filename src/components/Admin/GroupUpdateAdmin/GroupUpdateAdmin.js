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

  const { groupServices, facultyServices } = useService();
  const { data: facultyData, isError } = useQuery(
    [queryKeys.getFaculties],
    () => facultyServices.getAllFaculties(token)
  );
  const [facultyError, setFacultyError] = useState();
  if (isError) {
    setFacultyError("Something get wrong");
  }

  const navigate = useNavigate();
  console.log(facultyData);
  const { state: groupData } = useLocation();
  const [facultyInputValue, setFacultyInputValue] = useState(
    groupData?.facultyName
  );
  console.log(groupData);
  const currectFacultyId = facultyData?.data.find(
    (faculty) => faculty.name === groupData.facultyName
  ).id;

  const [inputState, dispatch] = useReducer(updateGroupReducer, {
    name: groupData?.name,
    year: groupData?.year,
    studentsId: [],
    facultyId: currectFacultyId,
  });
  const mutate = useMutation(
    () => groupServices.updateGroup(groupData.id, inputState, token)
    // { onSuccess: () => navigate("/Groups") }
  );
  const handleGroupUpdate = () => {
    mutate.mutate();
    navigate("/Groups");
  };
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
                defaultValue={groupData.name}
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
                defaultValue={groupData.year}
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
                inputValue={facultyInputValue}
                onInputChange={(e, newValue) => {
                  setFacultyInputValue(newValue);
                }}
                value={
                  facultyData?.data.find(
                    (item) => item.id === groupData.facultyId
                  ) || null
                }
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Faculty" />
                )}
                onChange={(e, newValue) =>
                  dispatch({
                    type: "facultyId",
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
                onClick={() => handleGroupUpdate()}
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
