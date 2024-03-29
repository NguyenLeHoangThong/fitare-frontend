import axios from "axios";

export class UserService {
  static async getUserData(uid) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/users?uid=${uid}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async postUserData(data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
