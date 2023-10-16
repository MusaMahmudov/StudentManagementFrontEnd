import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import useService from "../../../../hooks";

import { AdminExamTypeTitle } from "../../../../UI/Common/AdminExamTypeTitle";
const UpdateSubjectAdmin = () => {
  const { subjectServices } = useService();

  const navigate = useNavigate();

  const { state: subjectData } = useLocation();
  const [inputState, setInputState] = useState(subjectData);
  const mutate = useMutation(() =>
    subjectServices.updateSubject(inputState.id, inputState)
  );
  const handleFacultyUpdate = () => {
    mutate.mutate();
    navigate("/Subjects");
  };

  console.log("input State", inputState);
  return (
    <div className="update-student">
      <div className="container">
        <AdminExamTypeTitle
          child1={"Subject"}
          child2={"Subject / Update Subject"}
        />
        <section className="form">
          <div className="form-title">
            <h1>Subject Information</h1>
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
                defaultValue={subjectData.name}
                onChange={(e) =>
                  setInputState((prev) => ({ ...prev, name: e.target.value }))
                }
              />

              <Button
                type="submit"
                onClick={() => handleFacultyUpdate()}
                variant="contained"
              >
                Update Subject
              </Button>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};
export default UpdateSubjectAdmin;
