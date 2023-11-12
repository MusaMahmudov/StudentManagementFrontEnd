import { useQuery } from "react-query";
import useService from "../../../../hooks";
import { queryKeys } from "../../../../QueryKeys";
import { Button, Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ExamResultListTable } from "../../../../UI/Tables/ExamResultTable";
import { getDecodedToken } from "../../../../utils/TokenServices";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
import { searchTextFieldDesign } from "../../../../UI/TextFieldDesign/TextFieldDesign";

const ExamResultListAdmin = () => {
  const navigate = useNavigate();
  const decodedToken = getDecodedToken();
  const role = decodedToken[tokenRoleProperty];
  const [groupNameSearch, setGroupNameSearch] = useState("");
  const [subjectNameSearch, setSubjectNameSearch] = useState("");
  const [examTypeSearch, setExamTypeSearch] = useState("");
  const [studentFullNameSearch, setStudentFullNameSearch] = useState("");

  return (
    <div className="student-list-admin">
      <div className="container">
        <section className="title">
          <div className="title-left">
            <h1>Exams' Results</h1>
          </div>
          <div className="title-right">
            <h1>Exams' Results / All Exams' Results</h1>
          </div>
        </section>
        <section className="search-part">
          <TextField
            size="small"
            id="outlined-basic"
            label="Search  by Group Name..."
            variant="outlined"
            sx={{
              background: "white",
              width: searchTextFieldDesign.textField.width,
            }}
            onChange={(event) => setGroupNameSearch(event.target.value)}
          />
          <TextField
            size="small"
            id="outlined-basic"
            label="Search  by Subject Name..."
            variant="outlined"
            sx={{
              background: "white",
              width: searchTextFieldDesign.textField.width,
            }}
            onChange={(event) => setSubjectNameSearch(event.target.value)}
          />
          <TextField
            size="small"
            id="outlined-basic"
            label="Search  by Exam Type..."
            variant="outlined"
            sx={{
              background: "white",
              width: searchTextFieldDesign.textField.width,
            }}
            onChange={(event) => setExamTypeSearch(event.target.value)}
          />
          <TextField
            size="small"
            id="outlined-basic"
            label="Search  by Student's Full Name..."
            variant="outlined"
            sx={{
              background: "white",
              width: searchTextFieldDesign.textField.width,
            }}
            onChange={(event) => setStudentFullNameSearch(event.target.value)}
          />
        </section>
        <section className="students">
          <div className="students-list">
            <div className="students-list-title">
              <div>
                <h1>Exam Results</h1>
              </div>
              <div className="buttons">
                <Fab
                  onClick={() => navigate("CreateExamResult")}
                  color="primary"
                  aria-label="add"
                  sx={{ zIndex: 10 }}
                  disabled={role !== "Admin" ? true : false}
                >
                  <AddIcon />
                </Fab>
              </div>
            </div>
            <div className="students-list-info">
              <ExamResultListTable
                groupNameSearch={groupNameSearch}
                examTypeSearch={examTypeSearch}
                subjectNameSearch={subjectNameSearch}
                studentFullNameSearch={studentFullNameSearch}
                role={role}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default ExamResultListAdmin;
