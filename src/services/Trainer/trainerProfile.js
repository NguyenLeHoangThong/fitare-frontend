import axios from "axios";

export class TrainerProfileService {
  static async getTrainerProfile(id) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/trainers/${id}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
