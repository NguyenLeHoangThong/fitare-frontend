import classes from "./styles.module.scss";

const NavigationBar = ( {user_role, username, current_route } ) => {
    return (
        <div className = {classes.navigationBar}>
            <img src = "logo.png" alt = "logo" width = '50px'/>
            <div className = {classes.navigator}>
                { (user_role === 'Trainer') && <div> My post </div>}
                <div> Favorites </div>
                { (current_route === 'Marketplace') ? <div className = {classes.currentRoute}> Marketplace </div> : <div> Marketplace </div>}
            </div>
            <div className = {classes.username}> {username} </div>
        </div>
    )
}

export default NavigationBar;