import { memo } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import classes from "./styles.module.scss";
import clsx from 'clsx';

import { Link } from "react-router-dom";
import { routes } from "routers/routes.js";

//Image:
import summaryLogo from './finishImage.png';

const SetFinish = memo((props) => {

    const { planName } = props;

    return (
        <div>
            <Button className={clsx(classes.btnReturn, classes.setMargin)}>	<Link to={routes.plans} className={classes.noDecorBack}>&#60; PREVIOUS EXERCISES </Link></Button>
            <div className={classes.summaryBox}>
                <div className={classes.setName}>{planName}</div>
                <div className={classes.setComplete}>SET COMPLETED!</div>

                <img src={summaryLogo} className={classes.image} alt="setImage" />

                <div className={classes.resultBox}>
                    {/*<div className={classes.resultText}>DAILY STREAK: 30 DAYS  </div>*/}
                    <div className={classes.resultText}>Expected Calorie Burns: 100cal  </div>
                    <div className={classes.resultText}>Inspiring Quotes </div>
                </div>

                <div className={classes.flexContent}>
                    <Button className={classes.btnFavorites}>RETURN</Button>
                    <Button className={classes.btnApprove}>Approve</Button>
                    <Button className={classes.btnDecline}>Decline</Button>
                </div>
            </div>
        </div>
    )

})

export default SetFinish;