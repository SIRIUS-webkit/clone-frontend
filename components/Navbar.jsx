import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { USER_LOGOUT } from "../redux/types";
import Link from "next/link";

function Navbar() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const logout = () => {
    // setIsOpen(false);
    if (token) {
      Cookies.remove("token");
      dispatch({ type: USER_LOGOUT });
      if (router.pathname === "/") {
        router.reload();
      } else {
        router.push("/");
      }
    }
  };
  return (
    <div className="nav-header">
      <div>
        <Link href="/">
          <h1>LOGO</h1>
        </Link>
      </div>
      <div className="nav-item">
        <h3 style={{ marginRight: "20px" }}>{user.name}</h3>
        <div>
          {!user.name ? (
            <>
              <button
                type="button"
                onClick={() => router.push("/login")}
                style={{ marginRight: "20px" }}
              >
                Login
              </button>
              <button type="button" onClick={() => router.push("/signup")}>
                Signup
              </button>
            </>
          ) : (
            <button type="button" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
