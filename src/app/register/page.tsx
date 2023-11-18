"use client";

import Header from "@/components/Header";
import { axiosInstance } from "@/services/api";
import "../../styles/login.css";

import { useRouter } from "next/navigation";
export default function Register() {
  const navigation = useRouter();
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axiosInstance.post("/auth/signup", {
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
        name: event.currentTarget.inputName.value,
      });

      navigation.push("/");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <Header props="Register" />
      <div className="message">
        <h1>
          <strong>Register</strong>
        </h1>
      </div>
      <div className="login">
        <form action="" onSubmit={handleSignUp}>
          <div className="Login-input">
            <label htmlFor="inputName">Name</label>
            <input
              type="text"
              name="name"
              id="inputName"
              placeholder="Insert your Name"
            />
          </div>

          <div className="Login-input">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="email"
              name="email"
              id="inputEmail"
              placeholder="Insert your email"
            />
          </div>

          <div className="Login-input">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              name="password"
              id="inputPassword"
              placeholder="Insert your password"
            />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}
