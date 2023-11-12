import { Button, Fab, TextField } from "@mui/material";
import "./teacherListAdmin.scss";
import { StudentListTable } from "../../../UI/Tables/StudentListTable";
import { Navigate, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { AdminTeacherTitle } from "../../../UI/Common/AdminTeacherTitle";
import { TeacherListTable } from "../../../UI/Tables/TeacherListTable";
import { useContext, useState } from "react";
import { queryKeys } from "../../../QueryKeys";
import { TokenContext } from "../../../Contexts/Token-context";
import useService from "../../../hooks";
import { useQuery } from "react-query";
import { getDecodedToken } from "../../../utils/TokenServices";
import { tokenRoleProperty } from "../../../utils/TokenProperties";
import { searchTextFieldDesign } from "../../../UI/TextFieldDesign/TextFieldDesign";

const TeacherListAdmin = () => {
  const navigate = useNavigate();
  const decodedToken = getDecodedToken();
  const role = decodedToken[tokenRoleProperty];
  const [fullNameSearch, setFullNameSearch] = useState("");
  const [idSearch, setIdSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [mobileNumberSearch, setMobileNumberSearch] = useState("");

  return (
    <div className="teacher-list-admin">
      <div className="container">
        <AdminTeacherTitle
          child1={"Teachers"}
          child2={"Teachers / All Teachers"}
        />
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
            label="Search  by Mobile Number..."
            variant="outlined"
            sx={{
              background: "white",
              width: searchTextFieldDesign.textField.width,
            }}
            onChange={(event) => setMobileNumberSearch(event.target.value)}
          />
        </section>
        <section className="teachers">
          <div className="teachers-list">
            <div className="teachers-list-title">
              <div>
                <h1>Teachers</h1>
              </div>

              <div className="buttons">
                <Fab
                  onClick={() => navigate("CreateTeacher")}
                  disabled={role !== "Admin" ? true : false}
                  color="primary"
                  aria-label="add"
                  sx={{ zIndex: 10 }}
                >
                  <AddIcon />
                </Fab>
              </div>
            </div>
            <div className="teachers-list-info">
              <TeacherListTable
                fullNameSearch={fullNameSearch}
                idSearch={idSearch}
                emailSearch={emailSearch}
                mobileNumberSearch={mobileNumberSearch}
                role={role}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default TeacherListAdmin;
