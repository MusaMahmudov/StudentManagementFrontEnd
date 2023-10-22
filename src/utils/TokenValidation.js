import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { tokenRoleProperty } from "./TokenProperties";

// export const ValidateToken = (token) => {
//   const navigate = useNavigate();
//   console.log("asd");
//   if (token) {
//     console.log("wtf");
//     const decodedToken = jwtDecode(token);
//     if (decodedToken[tokenRoleProperty] !== "Admin") {
//       navigate("ErrorPage");
//     }
//   } else {
//     console.log("wtf");

//     navigate("SignIn", { replace: true });
//   }
// };
export const ValidateToken = ({ token }) => {
  const navigate = useNavigate();
  console.log("asd");
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken[tokenRoleProperty] !== "Admin") {
      navigate("ErrorPage");
    }
  } else {
    navigate("ErrorPage");
  }
};
