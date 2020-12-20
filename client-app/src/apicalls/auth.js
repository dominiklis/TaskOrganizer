import axios from "axios";
axios.defaults.baseURL = "https://localhost:44322/api";

const tokenKey = "TaskOrganizerUserToken";
const expirationDateKey = "TaskOrganizerUserTokenExpirationDate";

const handleError = (err) => {
  if (err.response) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
  } else if (err.request) {
    console.log(err.request);
  } else {
    console.log("Error", err.message);
  }

  return err;
};

export const Auth = {
  signup: (userInfo) =>
    axios
      .post("/users/signup", userInfo)
      .then((response) => response)
      .catch(handleError),

  signin: (userInfo) => {
    const res = axios
      .post("/users/signin", userInfo)
      .then((response) => {
        localStorage.setItem(tokenKey, response.data.token);
        localStorage.setItem(expirationDateKey, response.data.expiration);
        return response;
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error", err.message);
        }
        return err;
      });

    return res;
  },

  signOut: () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(expirationDateKey);
  },
};

export const CheckUser = () => {
  let exp = new Date(localStorage.getItem(expirationDateKey));
  let now = new Date(Date.now());

  if (localStorage.getItem(tokenKey) != null && now < exp) {
    return true;
  }
  return false;
};

export const GetToken = () => {
  return localStorage.getItem(tokenKey);
};
