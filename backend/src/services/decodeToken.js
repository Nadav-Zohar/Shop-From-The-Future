import { jwtDecode } from "jwt-decode";
export const tokenDecoded = (token) => {
  return jwtDecode(token);
};
