import React, { useEffect } from "react";
import { getCookie } from "../utils/cookie";
import { useRouter } from "next/router";

function AuthProvider({ children }) {
  const token = getCookie("token");
  // console.log(token);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  return token ? children : null;
}

export default AuthProvider;
