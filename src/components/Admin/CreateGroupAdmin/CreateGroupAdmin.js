import { Autocomplete, Box, Button, Select, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import useService from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { AdminGroupTitle } from "../../../UI/Common/AdminGroupTitle";
import { queryKeys } from "../../../QueryKeys";
import { ConstructionOutlined } from "@mui/icons-material";
import { TokenContext } from "../../../Contexts/Token-context";
import jwtDecode from "jwt-decode";
import { tokenRoleProperty } from "../../../utils/TokenProperties";
const CreateGroupAdmin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { token } = useContext(TokenContext);
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken[tokenRoleProperty] !== "Admin") {
      navigate("Error");
    }
  }
  const { studentServices, groupServices, facultyServices } = useService();
  const { data: studentData, isLoading: isLoadingStudents } = useQuery(
    [queryKeys.getStudentsQuery],
    () => studentServices.getAllStudents(token)
  );
  const [newGroup, setNewGroup] = useState({
    name: "",
    year: "",
    facultyId: "",
    studentsId: [],
  });

  console.log("NewGroup", newGroup);
  const [enteredValueisValid, setEnteredValueIsValid] = useState({
    nameIsValid: true,
    yearIsValid: true,
    facultyIdIsValid: true,
  });
  let formValid = true;

  const { data: facultyData } = useQuery([queryKeys.getFaculties], () =>
    facultyServices.getAllFaculties(token)
  );
  const [facultyInputValue, setFacultyInputValue] = useState();
  const handleGroup = ({ target: { value: inputValue, name: inputName } }) => {
    setNewGroup((prev) => ({ ...prev, [inputName]: inputValue.trim() }));
    console.log(newGroup);
  };

  const mutate = useMutation(() => groupServices.createGroup(newGroup, token), {
    onSuccess: () => navigate("/Groups"),
  });
  useEffect(() => {
    if (
      mutate.isError &&
      mutate.error.response.data.message &&
      mutate.error.response.status != "500"
    ) {
      setError(mutate.error.response.data.message);
    }
  }, [mutate]);

  console.log(enteredValueisValid);
  const handleNewGroup = (e) => {
    e.preventDefault();
    if (newGroup.name?.trim() === "" || newGroup.name === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, nameIsValid: true }));
    }

    if (
      newGroup.year?.trim() === "" ||
      newGroup.year === null ||
      newGroup.year > 10 ||
      newGroup.year < 1
    ) {
      setEnteredValueIsValid((prev) => ({ ...prev, yearIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, yearIsValid: true }));
    }

    if (newGroup.facultyId?.trim() === "" || newGroup.facultyId === null) {
      setEnteredValueIsValid((prev) => ({ ...prev, facultyIdIsValid: false }));
      formValid = false;
    } else {
      formValid = true;
      setEnteredValueIsValid((prev) => ({ ...prev, facultyIdIsValid: true }));
    }

    if (formValid) {
      mutate.mutate(newGroup);
    }
  };
  if (isLoadingStudents) {
    return <h1>... Is Loading</h1>;
  }

  return (
    <div className="update-student">
      <div className="container">
        <AdminGroupTitle child1={"Group"} child2={"Group / Create Group"} />
        <section className="form">
          <div className="form-title">
            <h1>Group Information</h1>
          </div>
          <div className="inputs">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "65ch" },
                display: "flex",
                flexDirection: "column",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                size="small"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                onChange={handleGroup}
                error={enteredValueisValid.nameIsValid ? "" : "error"}
                helperText={!enteredValueisValid.nameIsValid && "Name required"}
              />
              <TextField
                type="number"
                size="small"
                id="outlined-basic"
                label="Year"
                variant="outlined"
                name="year"
                onChange={handleGroup}
                error={enteredValueisValid.yearIsValid ? "" : "error"}
                helperText={
                  !enteredValueisValid.yearIsValid &&
                  "Year must be between 1 and 10"
                }
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={facultyData?.data ?? []}
                getOptionLabel={(option) => option.name}
                onChange={(e, newValue) => {
                  setNewGroup((prev) => ({ ...prev, facultyId: newValue?.id }));
                }}
                inputValue={facultyInputValue}
                onInputChange={(e, newValue) => {
                  setFacultyInputValue(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Faculty" />
                )}
              />
              {studentData && (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={studentData?.data ?? null}
                  getOptionLabel={(option) => option.fullName}
                  name="studentsId"
                  onChange={(e, newValue) => {
                    if (newValue) {
                      setNewGroup((prev) => ({
                        ...prev,
                        studentsId: newValue.map((group) => group.id),
                      }));
                    } else {
                      setNewGroup((prev) => ({
                        ...prev,
                        studentsId: [],
                      }));
                    }
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Students"
                      placeholder="Students"
                    />
                  )}
                />
              )}
              <div className="errorMessage">
                <h1>{error}</h1>
              </div>

              <Button
                type="submit"
                onClick={handleNewGroup}
                variant="contained"
              >
                Create Group
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreateGroupAdmin;
