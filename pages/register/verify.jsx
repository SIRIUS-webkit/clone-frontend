import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import callService from "../../function/callService";

function verify() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    async function activateEmail() {
      if (token) {
        const activateResult = await callService(
          "GET",
          `${process.env.domainAPI}/auth/activate/`,
          null,
          { token: token }
        );

        if (activateResult.status === 200) {
          Cookies.set("token", token);
          setTimeout(() => {
            router.push("/");
          }, 5000);
        }
      }
    }
    activateEmail();
  }, [token]);

  return (
    <div>
      <h2>Your account was successfully activated!</h2>
      <button>Go Home</button>
      <h1>go to home page after 5s</h1>
    </div>
  );
}

export default verify;
