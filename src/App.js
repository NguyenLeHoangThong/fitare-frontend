import './App.scss';
import Routers from 'routers';
import { ConnectedRouter } from "connected-react-router";
import AppStatus from "components/AppStatus";
import firebaseApp from "services/Firebase";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { UserService } from "services/User/user";
import { setUserReducer } from "redux/reducers/User/actionTypes";
import { setTraineeReducer } from "redux/reducers/Trainee/actionTypes";
import { setTrainerReducer, setTrainerCreatedPlans, setTrainerFavoritePlans } from "redux/reducers/Trainer/actionTypes";
import { TrainerProfileService } from "services/Trainer/trainerProfile";
import { TraineeProfileService } from "services/Trainee/traineeProfile";
import { ExercisePlanService } from "services/ExercisePlan";
import { setLoading, setErrorMess } from "redux/reducers/Status/actionTypes";
import { UserTypes } from "models/User";
import { setTraineeFavoritePlans } from "redux/reducers/Trainee/actionTypes";

function App({ history, dispatch }) {

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    dispatch(setLoading(true));
    new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          UserService.getUserData(user?.uid)
            .then((res) => {
              dispatch(setUserReducer(res));
              if (res?.type === UserTypes.TRAINER) {
                TrainerProfileService.getTrainerProfile(res?.id)
                  .then((trainerProfile) => {
                    dispatch(setTrainerReducer(trainerProfile))
                  })
                  .catch((error) => dispatch(setErrorMess(error)))

                TrainerProfileService.getTrainerCreatedPlans(res?.id)
                  .then((plans) => {
                    dispatch(setTrainerCreatedPlans(plans))
                  })
                  .catch((error) => dispatch(setErrorMess(error)))

                ExercisePlanService.getTrainerFavoriteExercisesPlan(res?.id)
                  .then((favoritePlans) => {
                    dispatch(setTrainerFavoritePlans(favoritePlans))
                  })
                  .catch((error) => dispatch(setErrorMess(error)))
              }
              else if (res?.type === UserTypes.TRAINEE) {
                TraineeProfileService.getTraineeProfile(res?.id)
                  .then((traineeProfile) => {
                    dispatch(setTraineeReducer(traineeProfile))
                  })
                  .catch((error) => dispatch(setErrorMess(error)))

                ExercisePlanService.getTraineeFavoriteExercisesPlan(res?.id)
                  .then((favoritePlans) => {
                    dispatch(setTraineeFavoritePlans(favoritePlans))
                  })
                  .catch((error) => dispatch(setErrorMess(error)))
              }
              else if (res?.type === UserTypes.QUALITY_CONTROLLER) {

              }
              else if (res?.type === UserTypes.ADMIN) {

              }
              else {
                dispatch(setErrorMess("Not found user type !"));
              }
              resolve(res);
            })
        }
        else {
          resolve("Not authentication");
        }
      })
    })
      .finally(() => {
        dispatch(setLoading(false));
      })

  }, [dispatch])

  return (
    <ConnectedRouter history={history}>
      <AppStatus />

      <div className="pageSection">
        {
          <Routers />
        }
      </div>
    </ConnectedRouter>
  );
}

export default App;
