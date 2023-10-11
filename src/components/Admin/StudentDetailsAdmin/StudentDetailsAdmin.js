import { useLocation, useParams } from "react-router-dom";
import "./studentDetailsAdmin.scss";

const StudentDetailsAdmin = () => {
  const { state } = useLocation();
  console.log(state);

  return <h1></h1>;
};
export default StudentDetailsAdmin;
