import { useState } from "react";
import { Link } from 'react-router-dom';

import { routes } from "routers/routes";

import CustomDropdown from "components/Commons/CustomDropdown";

import classes from "./styles.module.scss";


const NavigationBar = ( {user_role, username, current_route } ) => {
    
    const [ isUserNameClicked, setUserNameClicked ] = useState(false)

    return (
        <div className = {classes.navigationBar}>
            <img src = "logo.png" alt = "logo" width = '50px'/>

            <div className = {classes.navigator}>
                { (user_role === 'Trainer' && current_route === 'My post') ? <div className = {classes.route + classes.active}>My post</div> : ((user_role === 'Trainer') && <div className={classes.route}><Link to = {routes.default}>My post</Link></div>) }
                { (current_route === 'Favorites') ? <div className = {classes.route + ' ' + classes.active}> Favorites </div> : <div className={classes.route}><Link to = {routes.default}>Favorites</Link></div>}
                { (current_route === 'Marketplace') ? <div className = {classes.route + ' ' + classes.active}> Marketplace </div> : <div className={classes.route}><Link to = {routes.default}>My post</Link></div>}
            </div>

            <div style={{position: 'relative'}}> 
                <div className = {classes.username} onClick = {() => setUserNameClicked(!isUserNameClicked)}>{username}</div>
                
                <CustomDropdown 
                    optionList = {
                        {
                            'My profile': routes.default,
                            'Log out': routes.login
                        }
                    } 
                    isOpened = {isUserNameClicked}
                />
            </div>
        </div>
    )
}

export default NavigationBar;