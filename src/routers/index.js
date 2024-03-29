import { Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { routes } from './routes';
import LoadingScreen from "components/LoadingScreen";
import Default from "pages/Default";
import Login from "pages/Login";
import Register from "pages/Register";
import SetSummary from "pages/SetSummary";
import Plans from "pages/Plans";
import FavoritePlans from "pages/FavoritePlans";
import MyPlans from "pages/MyPlans";
import QCList from "pages/QCList";
import QCSummary from "pages/QCSummary";
import EditExercisePlan from "pages/EditExercisePlan";
import SetExercisePlan from "pages/SetExercisePlan";
import TraineeAuthRoute from "./TraineeAuthRoute";
import TrainerAuthRoute from "./TrainerAuthRoute";
import QualityControllerRoute from "./QualityControllerRoute";
import RedirectAuthRoute from "./RedirectAuthRoute";


const Routers = () =>   {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Switch>
                {/* <Route path={routes.default} exact render={(props) => <Default {...props} />} /> */}
                <RedirectAuthRoute path={routes.login} exact render={(props) => <Login {...props} />} />
                <RedirectAuthRoute path={routes.register} exact render={(props) => <Register {...props} />} />
                
                <QualityControllerRoute path={routes.QCList} exact render={(props) => <QCList {...props} />} />
                <QualityControllerRoute path={routes.QCSummary} exact render={(props) => <QCSummary {...props} />} />

                <TraineeAuthRoute path={routes.plans} exact render={(props) => <Plans {...props} />} />
                <TraineeAuthRoute path={routes.setSummary} exact render={(props) => <SetSummary {...props} />} />
                <TraineeAuthRoute path={routes.favoritePlans} exact render={(props) => <FavoritePlans {...props} />} />

                <TrainerAuthRoute path={routes.myPlans} exact render={(props) => <MyPlans {...props} />} />
                <TrainerAuthRoute path={routes.setExercisePlan} exact render={(props) => <SetExercisePlan {...props} />} />
                <TrainerAuthRoute path={routes.editExercisePlan} exact render={(props) => <EditExercisePlan {...props} />} />
                
                
                <Route><Redirect to={routes.login} /></Route>
            </Switch>
        </Suspense>
    )
}


export default Routers;