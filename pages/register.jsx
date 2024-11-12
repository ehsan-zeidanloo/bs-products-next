import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRegister } from "../services/mutaions";
import styles from "../styles/RegistrationPage.module.css";
import logo from "../assets/Union.jpg";
import Image from "next/image";

function RegistrationPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const { mutate } = useRegister();

  const changeHandler = (e) => {
    e.preventDefault();
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const registerHandler = (e) => {
    e.preventDefault();

    const { username, password, confirmPassword } = form;

    if (!username || !password)
      return alert("username and password is necessary!");
    if (password !== confirmPassword) return alert("password Isn't the Same");

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          console.log(data);
          router.push("/");
        },
        onError: (error) => console.log(error),
      }
    );
  };
  return (
    <>
      <form onSubmit={registerHandler} className={styles.form}>
        <div className={styles.formTitle}>
          <Image src={logo} alt="logo" priority  className={styles.image}  />
          <h3>فرم ثبت نام</h3>
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
        <input
          className={styles.input}
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          value={form.confirmPassword}
          onChange={changeHandler}
        />
        <br />
        <button type="submit">ثبت نام</button>
        <Link href="/" className={styles.link}>
          حساب کاربری دارید
        </Link>
      </form>
    </>
  );
}

export default RegistrationPage;
