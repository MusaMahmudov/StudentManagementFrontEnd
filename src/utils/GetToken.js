import jwtDecode from "jwt-decode";

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
};
export const getDecodedToken = () => {
  const token = getToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }
  return null;
};
