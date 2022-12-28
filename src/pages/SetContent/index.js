import { memo } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import classes from "./styles.module.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import clsx from 'clsx'


import { Link } from "react-router-dom";
import { routes } from "routers/routes.js";


//Image:
import summaryLogo from './summaryImage.png';

const SetContent = memo((props) => {
    return (
        <div>
            <Button className={clsx(classes.btnReturn, classes.setMargin)}>	<Link to={routes.setSummary} className={classes.noDecorBack}>&#60; ALL EXERCISE</Link> </Button>
            <div className={classes.summaryBox}>
                <div className={classes.setName}>EXERCISE-PLAN-NAME</div>
                <div className={classes.setExercise}>PUSH UP</div>

                <img src={summaryLogo} className={classes.image} alt="setImage" />

                <Row className ={classes.infoBox}>
                    <Col xs={12} md={8} className={classes.flexCenter}> 
                        <div className={classes.instruction}>Instruction: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod libero ut rhoncus efficitur. Duis congue porttitor dui quis scelerisque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi vel consequat augue, sed cursus odio.</div>
                    </Col>
                    <Col xs={12} md={4} className={clsx(classes.flexCenter) }>
                        <div className={classes.tagBox}> 4 SETS X 18 REPS</div>
                        <Button href="https://google.com" className={classes.btnVideo} target="_blank" rel="noopener noreferrer">Video Tutorial</Button>
                    </Col>
                </Row>

                <div className={classes.flexContent}>
                    <Button className={classes.btnFavorites}>RETURN</Button>
                    <div className={classes.pageNumberBox}> 1/4 </div>
                    <Button className={classes.btnFinish}><Link to={routes.setFinish} className={classes.noDecorStart}>FINISH</Link></Button>
                   </div>
            </div>
        </div>
    )

})

export default SetContent;