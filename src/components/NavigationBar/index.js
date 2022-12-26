import { useState } from "react";

import CustomDropdown from "components/Commons/CustomDropdown";

import classes from "./styles.module.scss";

import { Link } from 'react-router-dom';

const NavigationBar = ( {user_role, username, current_route } ) => {
    
    const [ isUserNameClicked, setUserNameClicked ] = useState(false)

    return (
        <div className = {classes.navigationBar}>
            <img src = "logo.png" alt = "logo" width = '50px'/>

            <div className = {classes.navigator}>
                { (user_role === 'Trainer' && current_route === 'My post') ? <div className = {classes.currentRoute}><Link to="">My post</Link></div> : ((user_role === 'Trainer') && <div className={classes.route}> My post </div>) }
                { (current_route === 'Favorites') ? <div className = {classes.currentRoute}> Marketplace </div> : <div className={classes.route}> Favorites </div>}
                { (current_route === 'Marketplace') ? <div className = {classes.currentRoute}> Marketplace </div> : <div className={classes.route}> Marketplace </div>}
            </div>

            <div style={{position: 'relative'}}> 
                <div className = {classes.username} onClick = {() => setUserNameClicked(!isUserNameClicked)}>{username}</div>
                <CustomDropdown optionList = {['My profile', 'Log out']} isOpened = {isUserNameClicked}/>
            </div>
        </div>
    )
}

export default NavigationBar;