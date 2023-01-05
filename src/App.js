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
            .then(async (res) => {
              dispatch(setUserReducer(res));
              if (res?.type === UserTypes.TRAINER) {
                await Promise.all([TrainerProfileService.getTrainerProfile(res?.id), TrainerProfileService.getTrainerCreatedPlans(res?.id), ExercisePlanService.getTrainerFavoriteExercisesPlan(res?.id)])
                  .then((results) => {
                    const [trainerProfile, plans, favoritePlans] = results;
                    dispatch(setTrainerReducer(trainerProfile))
                    dispatch(setTrainerCreatedPlans(plans))
                    dispatch(setTrainerFavoritePlans(favoritePlans))
                  })
                  .catch((error) => dispatch(setErrorMess(error)))
              }
              else if (res?.type === UserTypes.TRAINEE) {
                await Promise.all([TraineeProfileService.getTraineeProfile(res?.id), ExercisePlanService.getTraineeFavoriteExercisesPlan(res?.id)])
                  .then((results) => {
                    const [traineeProfile, favoritePlans] = results;
                    dispatch(setTraineeReducer(traineeProfile));
                    dispatch(setTraineeFavoritePlans(favoritePlans));
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
