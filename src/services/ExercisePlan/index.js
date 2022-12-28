import axios from "axios";

export class ExercisePlanService {
  static async getAllAvailableExercisePlan(id) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans?status=censored`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async createAExercisePlan(data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans`, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async updateAExercisePlan(id, data) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans/${id}`, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async censoredAExercisePlan(id) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans/${id}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async getAllExercisesOfAPlan(exercisePlanId) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans/${exercisePlanId}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async postExercisesOfAPlan(exercisePlanId, data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans/${exercisePlanId}`, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async updateExercisesOfAPlan(exercisePlanId, data) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans/${exercisePlanId}`, data) // have id in data array
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
