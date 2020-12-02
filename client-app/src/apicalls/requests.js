import axios from "axios";
axios.defaults.baseURL = "https://localhost:44322/api";

const responseBody = (response) => response;
const handleError = (err) => err.response;

const requests = {
  get: (url, params) =>
    axios.get(url, { params }).then(responseBody).catch(handleError),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

export const Tasks = {
  list: (params) => requests.get("/tasks", params),
  details: (id) => requests.get(`/tasks/${id}`),
  addTask: (task) => requests.post("/tasks", task),
  deleteTask: (id) => requests.delete(`/tasks/${id}`),
};
