import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";

import { AdminExamTypeTitle } from "../../../../UI/Common/AdminExamTypeTitle";
import { TokenContext } from "../../../../Contexts/Token-context";
const UpdateTeacherRoleAdmin = () => {
  const { token } = useContext(TokenContext);

  const { teacherRoleServices } = useService();

  const navigate = useNavigate();

  const { state: teacherRoleData } = useLocation();
  const [inputState, setInputState] = useState(teacherRoleData);
  const mutate = useMutation(() =>
    teacherRoleServices.updateTeacherRole(inputState.id, inputState, token)
  );
  const handleTeacherRoleUpdate = () => {
    mutate.mutate();
    navigate("/TeacherRoles");
  };

  console.log("input State", inputState);
  return (
    <div className="update-student">
      <div className="container">
        <AdminExamTypeTitle
          child1={"Teacher Role"}
          child2={"Teacher Role / Update Teacher Role"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Teacher Role Information</h1>
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
                label="Name"
                variant="outlined"
                defaultValue={teacherRoleData.name}
                onChange={(e) =>
                  setInputState((prev) => ({ ...prev, name: e.target.value }))
                }
              />

              <Button
                type="submit"
                onClick={() => handleTeacherRoleUpdate()}
                variant="contained"
              >
                Update Teacher Role
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default UpdateTeacherRoleAdmin;
