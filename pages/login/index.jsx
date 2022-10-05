import React, { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import callService from "../../function/callService";

function Login() {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  const loginService = async () => {
    if (!inputData.email && !inputData.password) {
      setErrMsg("All the inputs are required!");
      return null;
    }
    const loginData = await callService(
      "POST",
      `${process.env.domainAPI}/auth/signin/`,
      inputData,
      { token: null }
    );
    if (loginData.status === 200) {
      Cookies.set("token", loginData.data.token);
      router.push("/");
    } else {
      setErrMsg(loginData.data.message);
    }
  };

  return (
    <div className="login-container">
      <form>
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
        <button type="button" onClick={() => loginService()}>
          Login
        </button>
        <p style={{ color: "red" }}>{errMsg}</p>
      </form>
    </div>
  );
}

export default Login;
