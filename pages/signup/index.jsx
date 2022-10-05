import React, { useState } from "react";
import callService from "../../function/callService";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

function Signup() {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  const signupService = async () => {
    if (
      !inputData.email &&
      !inputData.password &&
      !inputData.confirmpassword &&
      !inputData.name
    ) {
      setErrMsg("All the fields are required!");
      return null;
    }
    if (inputData.password !== inputData.confirmpassword) {
      setErrMsg("Password and confirm password do not match!");
      return null;
    }

    const signUpData = await callService(
      "POST",
      `${process.env.domainAPI}/auth/signup`,
      inputData,
      { token: null }
    );
    if (signUpData.status === 200) {
      Cookies.set("token", signUpData.data.token);
      router.push("/");
    } else {
      setErrMsg(signUpData.data.message);
    }
  };

  return (
    <div className="login-container">
      <form>
        <label htmlFor="name">Username</label>
        <br />
        <input
          type="text"
          name="name"
          value={inputData.username}
          onChange={handleChange}
          style={{ width: "100%", height: "30px", marginBottom: "10px" }}
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          name="email"
          value={inputData.email}
          onChange={handleChange}
          style={{ width: "100%", height: "30px", marginBottom: "10px" }}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          name="password"
          value={inputData.password}
          onChange={handleChange}
          style={{ width: "100%", height: "30px", marginBottom: "10px" }}
        />
        <br />
        <label htmlFor="confirmpassword">Confirm password</label>
        <br />
        <input
          type="password"
          name="confirmpassword"
          value={inputData.confirmpassword}
          onChange={handleChange}
          style={{ width: "100%", height: "30px", marginBottom: "10px" }}
        />
        <br />
        <button type="button" onClick={() => signupService()}>
          Signup
        </button>
        <p style={{ color: "red" }}>{errMsg}</p>
      </form>
    </div>
  );
}

export default Signup;
