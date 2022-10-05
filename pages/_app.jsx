import "../styles/styles.css";
import Layout from "../components/Layout/Layout";
import wrapper from "../redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_USER } from "../redux/types";
import Cookies from "js-cookie";
import callService from "../function/callService";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  useEffect(() => {
    async function getUserProfile() {
      if (token) {
        const userData = await callService(
          "GET",
          `${process.env.domainAPI}/auth/profile/`,
          null,
          { token }
        );
        if (userData.status === 200) {
          dispatch({ type: UPDATE_USER, data: userData.data.data });
        }
      }
    }
    getUserProfile();
  }, [token]);

  function getLayout(_component) {
    if (Component.getLayout) {
      return Component.getLayout(_component);
    }
    return <Layout>{_component}</Layout>;
  }

  return getLayout(<Component {...pageProps} />);
}

export default wrapper.withRedux(MyApp);
