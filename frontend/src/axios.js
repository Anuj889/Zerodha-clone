import axios from "axios";

axios.defaults.baseURL = "http://localhost:3002";
axios.defaults.withCredentials = true;

export default axios;
