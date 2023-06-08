import { login as Login } from "@/Redux/user/userSlice";
import { store } from "@/Redux/store";

type Body = {
  username: String;
  password: String;
};

export const login = async (body: Body) => {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error("unable to login");

  const data = await response.json();
  console.log(data);
  store.dispatch(Login(data));

  return data;
};

export const register = async (body: Body) => {
  const response = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error("unable to register");

  const data = await response.json();
  console.log(data);
  store.dispatch(Login(data));

  return data;
};
