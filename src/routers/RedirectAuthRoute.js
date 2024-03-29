import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { routes } from "./routes";


const RedirectAuthRoute = ({
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
                if (user && user?.type !== "QUALITY_CONTROLLER") {
                    return (
                        <Redirect
                            to={{
                                pathname: routes.plans,
                            }}
                        />
                    );
                }
                else if (user && user?.type == "QUALITY_CONTROLLER") {
                    return (
                        <Redirect
                            to={{
                                pathname: routes.QCList,
                            }}
                        />
                    );
                }
                return render(props);
            }}
        />
    );
};

export default RedirectAuthRoute;
