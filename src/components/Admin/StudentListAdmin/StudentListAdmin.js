import { useQuery } from "react-query";
import useService from "../../../hooks";
import "./studentListAdmin.scss";
import { queryKeys } from "../../../QueryKeys";
import { StudentListTable } from "../../../UI/Tables/StudentListTable";
import { Box, Button, Fab, TextField, createTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getDecodedToken } from "../../../utils/TokenServices";
import { tokenRoleProperty } from "../../../utils/TokenProperties";
import { searchTextFieldDesign } from "../../../UI/TextFieldDesign/TextFieldDesign";

const StudentAdminPage = () => {
  const decodedToken = getDecodedToken();
  const role = decodedToken[tokenRoleProperty];
  const navigate = useNavigate();
  const [fullNameSearch, setFullNameSearch] = useState("");
  const [idSearch, setIdSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [mainGroupSearch, setMainGroupSearch] = useState("");

  return (
    <div className="student-list-admin">
      <div className="container">
        <section className="title">
          <div className="title-left">
            <h1>Students</h1>
          </div>
          <div className="title-right">
            <h1>Student / All Students</h1>
          </div>
        </section>
        <section className="search-part">
          <TextField
            size="small"
            id="outlined-basic"
            label="Search  by Full Name..."
            variant="outlined"
            sx={{
              background: "white",
              width: searchTextFieldDesign.textField.width,
            }}
            onChange={(event) => setFullNameSearch(event.target.value)}
          />
          <TextField
            size="small"
            id="outlined-basic"
            label="Search  by Id..."
            variant="outlined"
            sx={{
              background: "white",
              width: searchTextFieldDesign.textField.width,
            }}
            onChange={(event) => setIdSearch(event.target.value)}
          />
          <TextField
            size="small"
            id="outlined-basic"
            label="Search  by Email..."
            variant="outlined"
            sx={{
              background: "white",
              width: searchTextFieldDesign.textField.width,
            }}
            onChange={(event) => setEmailSearch(event.target.value)}
          />
          <TextField
            size="small"
            id="outlined-basic"
            label="Search  by Main Group..."
            variant="outlined"
            sx={{
              background: "white",
              width: searchTextFieldDesign.textField.width,
            }}
            onChange={(event) => setMainGroupSearch(event.target.value)}
          />
        </section>
        <section className="students">
          <div className="students-list">
            <div className="students-list-title">
              <div>
                <h1>Students</h1>
              </div>
              <div className="buttons">
                <div className="buttons">
                  <Fab
                    onClick={() => navigate("CreateStudent")}
                    color="primary"
                    aria-label="add"
                    sx={{ zIndex: 10 }}
                    disabled={role !== "Admin" ? true : false}
                  >
                    <AddIcon />
                  </Fab>
                  {/* <Button variant="contained" startIcon={<AddIcon />}></Button> */}
                </div>
              </div>
            </div>
            <div className="students-list-info">
              <StudentListTable
                role={role}
                fullNameSearch={fullNameSearch}
                idSearch={idSearch}
                emailSearch={emailSearch}
                mainGroupSearch={mainGroupSearch}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default StudentAdminPage;
