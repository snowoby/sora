export const SetRefreshToken = (token: string) => setToken(token, "refresh");
export const SetAccessToken = (token: string) => setToken(token, "access");
export const GetAccessToken = () => getToken("access");
export const GetRefreshToken = () => getToken("refresh");
export const Logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};
const setToken = (token: string, type: "access" | "refresh") =>
  localStorage.setItem(type, token);

const getToken = (type: "access" | "refresh") => localStorage.getItem(type);
