import axios from "axios";

export class TraineeProfileService {
  static async getTraineeProfile(id) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/trainees/${id}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async postTraineeProfile(data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/trainees`, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
