import { memo } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import classes from "./styles.module.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import clsx from 'clsx'

//Image:
import summaryLogo from './finishImage.png';

const SetContent = memo((props) => {
    return (
        <div>
            <Button className={clsx(classes.btnReturn, classes.setMargin)}>	&#60; PREVIOUS EXERCISE </Button>
            <div className={classes.summaryBox}>
                <div className={classes.setName}>EXERCISE-PLAN-NAME</div>
                <div className={classes.setComplete}>SET COMPLETED!</div>

                <img src={summaryLogo} className={classes.image} alt="setImage" />

                <div className={classes.resultBox}>
                    <div className={classes.resultText}>DAILY STREAK: 30 DAYS  </div>
                    <div className={classes.resultText}>Expected Calorie Burns: 100cal  </div>
                    <div className={classes.resultText}>Inspiring Quotes </div>
                </div>

                <Button className={classes.btnFinish}>FINISH</Button>

            </div>
        </div>
    )

})

export default SetContent;