import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AdminStudentTitle } from "../../../../UI/Common/AdminStudentTitle";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import useService from "../../../../hooks";
import { useMutation, useQuery } from "react-query";
import { queryKeys } from "../../../../QueryKeys";
import { DeleteButton } from "../../../../UI/Buttons/ActionButtons";
import { useContext, useEffect } from "react";
import { TokenContext } from "../../../../Contexts/Token-context";
import jwtDecode from "jwt-decode";
import { tokenRoleProperty } from "../../../../utils/TokenProperties";
const DeleteUserAdmin = () => {
  const { token } = useContext(TokenContext);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken[tokenRoleProperty] !== "Admin") {
        navigate("Error");
      }
    }
  });
  const { Id } = useParams();
  const navigate = useNavigate();
  const { userServices } = useService();
  const userQuery = useQuery([queryKeys.getUsers], () =>
    userServices.getUserById(Id, token)
  );
  const mutate = useMutation((Id) => userServices.deleteUser(Id, token), {
    onSuccess: () => navigate("/Users"),
  });

  if (userQuery.isLoading) {
    return <h1>Is Loading...</h1>;
  }
  if (userQuery.isError) {
    return <h1>{userQuery.error.response.data.message}</h1>;
  }

  return (
    <div className="student-details">
      <div className="container">
        <AdminStudentTitle
          child1={"User details"}
          child2={" User / User Details"}
        />
        <section className="profile">
          <div className="details">
            <div className="personal-details">
              <div className="card">
                <h1>Details:</h1>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Id</h1>
                    <p>{userQuery.data?.data.id}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>User Name</h1>
                    <p>{userQuery.data?.data.userName}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Email</h1>
                    <p>{userQuery.data?.data.email}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Student Name</h1>
                    <p>{userQuery.data?.data.studentName ?? "No Student"}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Teacher Name</h1>
                    <p>{userQuery.data?.data.teacherName ?? "No Teacher"}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Roles</h1>
                    <p>
                      {userQuery.data?.data.roles?.map((role) => `${role}   `)}
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div className="action">
            <DeleteButton onClick={() => mutate.mutate(Id)}>
              Delete User
            </DeleteButton>
          </div>
        </section>
      </div>
    </div>
  );
};
export default DeleteUserAdmin;
