import axios from "axios";

const instance = axios.create({
  baseURL: "https://reactapp-e2c26.firebaseio.com/"
});

export default instance;
