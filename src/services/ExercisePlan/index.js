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

  static async getAllUncensoredExercisePlan(id) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans?status=uncensored`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async getOneAvailableExercisePlan(id) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans/${id}?status=censored`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async getOneNotAvailableExercisePlan(id) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans/${id}?status=uncensored`)
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
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans/${id}/censored`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async notCensoredAExercisePlan(id) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans/${id}/not-censored`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async deleteAExercisePlan(id) {
    return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans/${id}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async getAllExercisesOfAPlan(exercisePlanId) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans/${exercisePlanId}/exercises`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async postExercisesOfAPlan(exercisePlanId, data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans/${exercisePlanId}/exercises`, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async updateExercisesOfAPlan(exercisePlanId, data) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/exerciseplans/${exercisePlanId}/exercises`, data) // have id in data array
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async postTraineeFavoriteExercisesPlan(userId, exercisePlanId, data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/trainees/${userId}/exerciseplans/${exercisePlanId}`, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async postTrainerFavoriteExercisesPlan(userId, exercisePlanId, data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/trainers/${userId}/exerciseplans/${exercisePlanId}`, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async updateTraineeFavoriteExercisesPlan(userId, exercisePlanId, data) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/trainees/${userId}/exerciseplans/${exercisePlanId}`, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async updateTrainerFavoriteExercisesPlan(userId, exercisePlanId, data) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/trainers/${userId}/exerciseplans/${exercisePlanId}`, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async getTraineeFavoriteExercisesPlan(userId) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/trainees/${userId}/exerciseplans`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async getTrainerFavoriteExercisesPlan(userId) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/trainers/${userId}/exerciseplans`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
