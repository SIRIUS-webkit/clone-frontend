/* eslint-disable no-console */
import axios from "axios";

export default async function callService(method, url, data, headers) {
  const response = await axios({
    method,
    headers,
    url,
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
    });

  return response;
}
