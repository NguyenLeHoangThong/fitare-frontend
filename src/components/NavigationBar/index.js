import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { routes } from "routers/routes";
import classes from "./styles.module.scss";
import clsx from "clsx";
import { UserTypes } from "models/User";
import logo from './logo.png';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import firebaseApp from "services/Firebase";
import { getAuth, signOut } from "firebase/auth";
import { setUserLogoutReducer } from "redux/reducers/User/actionTypes";
import { setTraineeLogoutReducer } from "redux/reducers/Trainee/actionTypes";
import { setTrainerLogoutReducer } from "redux/reducers/Trainer/actionTypes";
import { push } from "connected-react-router";
import { setLoading, setErrorMess, setSuccessMess } from "redux/reducers/Status/actionTypes";

const NavigationBar = () => {
    // @ts-ignore
    const user = useSelector((state) => state?.user?.user);
    // @ts-ignore
    const router = useSelector((state) => state?.router);

    const dispatch = useDispatch();

    const handleLogOut = () => {
        const auth = getAuth(firebaseApp);
        dispatch(setLoading(true));
        signOut(auth)
            .then(() => {
                dispatch(setUserLogoutReducer());
                dispatch(setTraineeLogoutReducer());
                dispatch(setTrainerLogoutReducer());
                dispatch(push("/login"));
                dispatch(setSuccessMess("Sign out successfully!"));
            })
            .catch((error) => dispatch(setErrorMess(error)))
            .finally(() => dispatch(setLoading(false)));
    }

    return (
        <div className={classes.navigationBar}>
            <img src={logo} alt="logo" width='50px' />

            {
                user ? (
                    <div className={classes.navigator}>
                        {
                            (user?.type === UserTypes.TRAINER && router?.location?.pathname === routes.myPlans)
                                ?
                                <div className={clsx(classes.route, classes.active)}>My posts</div>
                                :
                                (user?.type === UserTypes.TRAINER
                                    ?
                                    <div className={classes.route}>
                                        <Link to={routes.myPlans}>My posts</Link>
                                    </div>
                                    :
                                    null
                                )
                        }
                        {(router?.location?.pathname === routes.favoritePlans) ? <div className={clsx(classes.route, classes.active)}> <Link to={routes.favoritePlans}>Favorites</Link> </div> : <div className={classes.route}><Link to={routes.favoritePlans}>Favorites</Link></div>}
                        {(router?.location?.pathname === routes.plans) ? <div className={clsx(classes.route, classes.active)}> Marketplace </div> : <div className={classes.route}><Link to={routes.plans}>Marketplace</Link></div>}
                    </div>
                ) : null
            }
            {
                user?.email ? (
                    <div className={classes.username}>
                        <DropdownButton title={user?.email} drop="down">
                            <Dropdown.Item className={classes.dropdown}>
                                <div className={classes.dropdownItem}>My profile</div>
                                <div className={classes.dropdownItem} onClick={() => handleLogOut()}>Log out</div>
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                )
                    :
                    <div></div>
            }

        </div>
    )
}

export default NavigationBar;