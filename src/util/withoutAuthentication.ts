import { redirect } from "react-router-dom";
import { getCookies } from "../services";

const withoutAuthentication = () => {
  const token = getCookies("token");
  if (!token) return redirect("/sign-in");
  else return null;
};

export default withoutAuthentication;
