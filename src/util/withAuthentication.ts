import { redirect } from "react-router-dom";
import { getCookies } from "../services";

const withAuthentication = () => {
  const token = getCookies("token");
  if (token) return redirect("/menu");
  else return null;
};

export default withAuthentication;
