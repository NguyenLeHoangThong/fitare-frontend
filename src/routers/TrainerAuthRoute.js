import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { routes } from "./routes";


const TrainerAuthRoute = ({
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
                if (!user || user.type !== "TRAINER") {
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

export default TrainerAuthRoute;
