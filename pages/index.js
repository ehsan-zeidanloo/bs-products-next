import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLogin } from "../services/mutaions";
import { setCookie } from "../utils/cookie";
import logo from "../assets/Union.jpg";
import styles from "../styles/RegistrationPage.module.css";

function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const { mutate } = useLogin();

  const changeHandler = (e) => {
    e.preventDefault();
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = (e) => {
    e.preventDefault();
    console.log("submit", form);
    const { username, password } = form;

    if (!username || !password)
      return alert("username and password is necessary!");

    mutate(form, {
      onSuccess: (data) => {
        console.log(data);
        setCookie("token", data?.token);
        router.push("/ProductsPage");
      },
      onError: (error) => console.log(error),
    });
  };

  // console.log(mutation);
  return (
    <form onSubmit={loginHandler} className={styles.form}>
      <div className={styles.formTitle}>
        <Image src={logo} alt="logo" priority  />
        <h3>فرم ورود</h3>
      </div>
      <input
        className={styles.input}
        type="text"
        name="username"
        placeholder="username"
        value={form.username}
        onChange={changeHandler}
      />
      <br />
      <input
        className={styles.input}
        type="password"
        name="password"
        placeholder="password"
        value={form.password}
        onChange={changeHandler}
      />
      <br />

      <button type="submit">ورود</button>
      <Link href="/register" className={styles.link}>
        ایجاد حساب کاربری
      </Link>
    </form>
  );
}

export default LoginPage;
