import Axios from "axios";

const BASE_URL = "http://localhost:8080";

const token = localStorage.getItem("token");

export const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
