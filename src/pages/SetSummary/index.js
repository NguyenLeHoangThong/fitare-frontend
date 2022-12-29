import { memo, useMemo, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import classes from "./styles.module.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import clsx from 'clsx'
import { setLoading, setErrorMess } from "redux/reducers/Status/actionTypes";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { push } from "connected-react-router";
import { routes } from "routers/routes.js";
import { ExercisePlanService } from "services/ExercisePlan";
import { getBMITypes, getMuscleGroupTypes, getDurationTypes, getLevelTypes, difficultyFormatArray } from "utils/exercisePlan";

//Image:
import summaryLogo from './summaryImage.png';
const SetSummary = memo((props) => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const [plan, setPlan] = useState(null);

    useEffect(() => {
        dispatch(setLoading(true));
        ExercisePlanService.getOneAvailableExercisePlan(id)
            .then((res) => {
                if (!res) {
                    dispatch(push("/plans"));
                }
                setPlan(res);
            })
            .catch((err) => {
                dispatch(setErrorMess(err))
                dispatch(push("/plans"))
            })
            .finally(() => dispatch(setLoading(false)))

    }, [dispatch])

    return (
        <div>
            <Button className={clsx(classes.btnReturn, classes.setMargin)}><Link to={routes.plans} className={classes.noDecorBack}>&#60; ALL EXERCISE </Link>	</Button>
            <div className={classes.summaryBox}>
                <div className={classes.setName}>{plan?.name}</div>
                <div className={classes.setCreator}>Set Creator: {plan?.trainerFirstName} {plan?.trainerLastName}</div>

                <Row className={classes.infoBox}>
                    <Col xs={12} md={4} className={classes.flexCenter}>
                        <img src={summaryLogo} className={classes.image} alt="setImage" />
                    </Col>
                    <Col xs={12} md={5} className={classes.flexCenter}>
                        <div className={classes.description}>Description: {plan?.description}</div>
                    </Col>
                    <Col xs={12} md={3} className={clsx(classes.flexCenter, classes.leftColumn)}>

                        {
                            plan?.level && (
                                <div className={clsx(classes.tagBox, classes.flexCol)}>
                                    <div>Difficulty</div>
                                    <div className={classes.flexRow}>
                                        {
                                            difficultyFormatArray(plan?.level).map((item, index) => (
                                                <div key={index} className={clsx(classes.diffNode, item ? classes.on : classes.off)}></div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }

                        {
                            plan?.muscleGroup && plan?.muscleGroup?.length && (
                                <div className={classes.tagBox}>
                                    {plan.muscleGroup.join(', ')}
                                </div>
                            )
                        }

                        {
                            plan?.bmi && (
                                <div className={classes.tagBox}>
                                    BMI {getBMITypes(plan?.bmi)?.description}
                                </div>
                            )
                        }

                        {
                            plan?.hours && (
                                <div className={classes.tagBox}>
                                    {getDurationTypes(plan?.hours)?.name}{" "}
                                    Mins
                                </div>
                            )
                        }
                    </Col>
                </Row>

                <div className={classes.flexContent}>
                    <Button className={classes.btnFavorites}>ADD TO FAVORITES</Button>
                    <Button type="submit" className={classes.btnStart} ><Link to={`/plans-content/${id}`} className={classes.noDecorStart}>START SET</Link></Button>
                </div>
            </div>
        </div>
    )

})

export default SetSummary;