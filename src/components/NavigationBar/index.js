import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { routes } from "routers/routes";
import CustomDropdown from "components/Commons/CustomDropdown";
import classes from "./styles.module.scss";
import clsx from "clsx";
import { UserTypes } from "models/User";

const NavigationBar = () => {

    const [isUserNameClicked, setUserNameClicked] = useState(false)

    // @ts-ignore
    const user = useSelector((state) => state?.user);
    // @ts-ignore
    const router = useSelector((state) => state?.router);

    return (
        <div className={classes.navigationBar}>
            <img src="logo.png" alt="logo" width='50px' />

            <div className={classes.navigator}>
                {(user?.type === UserTypes.TRAINER && router?.location?.pathname === '/myplans') ? <div className={clsx(classes.route, classes.active)}>My post</div> : ((user?.type === 'TRAINER') && <div className={classes.route}><Link to={routes.default}>My post</Link></div>)}
                {(router?.location?.pathname === '/myfavorites') ? <div className={clsx(classes.route, classes.active)}> Favorites </div> : <div className={classes.route}><Link to={routes.default}>Favorites</Link></div>}
                {(router?.location?.pathname === '/plans') ? <div className={clsx(classes.route, classes.active)}> Marketplace </div> : <div className={classes.route}><Link to={routes.default}>My post</Link></div>}
            </div>

            {
                user?.email ? (
                    <div style={{ position: 'relative' }}>
                        <div className={classes.username} onClick={() => setUserNameClicked(!isUserNameClicked)}>{user?.email}</div>

                        <CustomDropdown
                            optionList={
                                {
                                    'My profile': routes.default,
                                    'Log out': routes.login
                                }
                            }
                            isOpened={isUserNameClicked}
                        />
                    </div>
                )
                    :
                    <div></div>
            }

        </div>
    )
}

export default NavigationBar;