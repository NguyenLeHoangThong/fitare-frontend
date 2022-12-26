import { memo, useMemo } from "react";
import { Form, Button } from "react-bootstrap";
import classes from "./styles.module.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import clsx from 'clsx'
import { setLoading } from "redux/reducers/Status/actionTypes";

import { Link } from "react-router-dom";
import { routes } from "routers/routes.js";

//Image:
import summaryLogo from './summaryImage.png';
const SetSummary = memo((props) => {

    return (
        <div>
            <Button className={clsx(classes.btnReturn, classes.setMargin)}><Link to={routes.selectPlan} className={classes.noDecorBack}>&#60; ALL EXERCISE </Link>	</Button>
            <div className={classes.summaryBox}>
                <div className={classes.setName}>EXERCISE-PLAN-NAME</div>
                <div className={classes.setCreator}>Set Creator: Creator-name</div>

                <Row className={classes.infoBox}>
                    <Col xs={12} md={4} className={classes.flexCenter}>
                        <img src={summaryLogo} className={classes.image} alt="setImage" />
                    </Col>
                    <Col xs={12} md={5} className={classes.flexCenter}>
                        <div className={classes.description}>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod libero ut rhoncus efficitur. Duis congue porttitor dui quis scelerisque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi vel consequat augue, sed cursus odio.</div>
                    </Col>
                    <Col xs={12} md={3} className={clsx(classes.flexCenter, classes.leftColumn)}>
                        <div className={clsx(classes.tagBox, classes.flexCol)}>
                            <div>Difficulty</div>
                            <div className={classes.flexRow}>
                                {

                                }
                                <div className={clsx(classes.diffNode, classes.on)}></div>
                                <div className={clsx(classes.diffNode, classes.on)}></div>
                                <div className={clsx(classes.diffNode, classes.off)}></div>
                                <div className={clsx(classes.diffNode, classes.off)}></div>
                                <div className={clsx(classes.diffNode, classes.off)}></div>
                            </div>
                        </div>
                        <div className={classes.tagBox}> Chest, Shoulder, Leg</div>
                        <div className={classes.tagBox}> BMI &#60; 18.5</div>
                        <div className={classes.tagBox}> 18 Hours</div>
                    </Col>
                </Row>

                <div className={classes.flexContent}>
                    <Button className={classes.btnFavorites}>ADD TO FAVORITES</Button>
                    <Button type="submit" className={classes.btnStart} ><Link to={routes.setContent} className={classes.noDecorStart}>START SET</Link></Button>
                </div>
            </div>
        </div>
    )

})

export default SetSummary;