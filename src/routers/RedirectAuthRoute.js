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
                if (user) {
                    return (
                        <Redirect
                            to={{
                                pathname: routes.plans,
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
