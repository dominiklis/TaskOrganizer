import axios from "axios";
axios.defaults.baseURL = "https://localhost:44322/api";

const responseBody = (response) => response;
const handleError = (err) => err.response;

const requests = {
  get: (url, params) =>
    axios.get(url, { params }).then(responseBody).catch(handleError),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  patch: (url, patchDoc) => axios.patch(url, patchDoc),
  delete: (url) => axios.delete(url).then(responseBody),
};

export const Tasks = {
  list: (params) => requests.get("/tasks", params),
  details: (id) => requests.get(`/tasks/${id}`),
  add: (task) => requests.post("/tasks", task),
  put: (id, task) => requests.put(`/tasks/${id}`, task),
  patch: (id, patchDoc) => requests.patch(`/tasks/${id}`, patchDoc),
  delete: (id) => requests.delete(`/tasks/${id}`),
};
