import { Cookie } from "@mui/icons-material";
import jwtDecode from "jwt-decode";
import { Cookies, useCookies } from "react-cookie";

export const getToken = () => {
  const cookies = new Cookies();
  const token = cookies.get("tokenAdmin") || cookies.get("tokenModerator");
  if (token) {
    return token;
  }
  return null;
};
export const getDecodedToken = () => {
  const token = getToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }
  return null;
};
export const getExpireDateToken = () => {
  const cookies = new Cookies();
  var expireDate =
    cookies.get("expireDateModerator") || cookies.get("expireDateAdmin");

  if (expireDate) {
    return expireDate;
  }
  return null;
};
export const removeToken = () => {
  const cookie = new Cookies();
  var token = getToken();
  if (token) {
    cookie.remove(cookie.get("tokenAdmin") ? "tokenAdmin" : "tokenModerator");
    return true;
  }
  return false;
};
export const removeExpireDate = () => {
  const cookie = new Cookies();
  const token = getToken();
  if (token) {
    cookie.remove(
      cookie.get("tokenAdmin") ? "expireDateAdmin" : "expireDateModerator"
    );
    return true;
  }
  return false;
};
