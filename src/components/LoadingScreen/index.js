import classes from "./styles.module.scss";

const LoadingScreen = () => {
    return (
        <div className={classes.overlay}>
            <div className={classes.overlay__inner}>
                <div className={classes.overlay__content}><span className={classes.spinner}></span></div>
            </div>
        </div>
    )
}

export default LoadingScreen;