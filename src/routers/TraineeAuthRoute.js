import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { routes } from "./routes";


const TraineeAuthRoute = ({
    path,
    render,
    ...rest
}) => {

    // @ts-ignore
    const { user } = useSelector((state) => state?.user);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!user) {
                    return (
                        <Redirect
                            to={{
                                pathname: routes.login,
                            }}
                        />
                    );
                }
                return render(props);
            }}
        />
    );
};

export default TraineeAuthRoute;
