import { memo } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import classes from "./styles.module.scss";
import clsx from 'clsx';

import { Link } from "react-router-dom";
import { routes } from "routers/routes.js";
import { push } from "connected-react-router";
//Image:
import summaryLogo from './finishImage.png';
import { ExercisePlanService } from "services/ExercisePlan";
import { setLoading, setErrorMess, setSuccessMess } from "redux/reducers/Status/actionTypes";

const SetFinish = memo((props) => {

    const { planName, planId } = props;

    const dispatch = useDispatch();

    const censoredAPlan = () => {
        dispatch(setLoading(true));
        ExercisePlanService.censoredAExercisePlan(planId)
            .then(() => {
                dispatch(setSuccessMess("Successfully censored this plan !"));
                dispatch(push(routes.QCList));

            })
            .catch((err) => dispatch(setErrorMess(err)))
            .finally(() => dispatch(setLoading(false)))
    }

    const notCensoredAPlan = () => {
        dispatch(setLoading(true));
        ExercisePlanService.notCensoredAExercisePlan(planId)
            .then(() => {
                dispatch(setSuccessMess("Successfully declined this plan !"));
                dispatch(push(routes.QCList));

            })
            .catch((err) => dispatch(setErrorMess(err)))
            .finally(() => dispatch(setLoading(false)))
    }

    return (
        <div>
            <Button className={clsx(classes.btnReturn, classes.setMargin)}>	<Link to={routes.QCList} className={classes.noDecorBack}>&#60; BACK </Link></Button>
            <div className={classes.summaryBox}>
                <div className={classes.setName}>{planName}</div>
                <div className={classes.setComplete}>SET COMPLETED!</div>

                <img src={summaryLogo} className={classes.image} alt="setImage" />

                <div className={classes.resultBox}>
                    <div className={classes.resultText}>“Strength does not come from physical capacity. It comes from an indomitable will.” - <i>Mahatma Gandhi</i></div>
                </div>

                <div className={classes.flexContent}>
                    <Button onClick={notCensoredAPlan} className={classes.btnDecline}>Decline</Button>
                    <Button onClick={censoredAPlan} className={classes.btnApprove}>Approve</Button>
                </div>
            </div>
        </div>
    )

})

export default SetFinish;