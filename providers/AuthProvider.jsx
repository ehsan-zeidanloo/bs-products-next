import React from "react";
import { getCookie } from "../utils/cookie";
import Router from "next/router";

function AuthProvider({ children }) {
  const token = getCookie("token");
  // console.log(token);

  if (!token) return <Router href="/login" />;
  return children;
}

export default AuthProvider;
