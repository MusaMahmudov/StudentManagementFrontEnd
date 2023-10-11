import "./loginpage.scss";
import loginPageImage from "../../assets/images/loginImage.jpg";

const loginPage = () => {
  return (
    <div className="page-container">
      <div className="login-page-image">
        <img src={loginPageImage}></img>
      </div>
    </div>
  );
};
export default loginPage;
