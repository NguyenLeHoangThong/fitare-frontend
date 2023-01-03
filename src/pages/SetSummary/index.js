import { memo, useMemo, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import classes from "./styles.module.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import clsx from 'clsx'
import { setLoading, setErrorMess } from "redux/reducers/Status/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { push } from "connected-react-router";
import { routes } from "routers/routes.js";
import { ExercisePlanService } from "services/ExercisePlan";
import { getBMITypes, getMuscleGroupTypes, getDurationTypes, getLevelTypes, difficultyFormatArray } from "utils/exercisePlan";
import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import SetContent from "./components/SetContent";
import { setTraineeFavoritePlans } from "redux/reducers/Trainee/actionTypes";
import { setTrainerFavoritePlans } from "redux/reducers/Trainer/actionTypes";

//Image:
import summaryLogo from './summaryImage.png';
import { setSuccessMess } from './../../redux/reducers/Status/actionTypes';
const SetSummary = memo((props) => {

    const { user } = useSelector((state) => state.user);
    const traineeInformation = useSelector((state) => state.trainee);
    const trainerInformation = useSelector((state) => state.trainer);

    const dispatch = useDispatch();
    const { id } = useParams();
    const [plan, setPlan] = useState(null);
    const [isStartSet, setIsStartSet] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [disableFavoriteBtn, setDisableFavoriteBtn] = useState(false);

    useEffect(() => {
        dispatch(setLoading(true));
        ExercisePlanService.getOneAvailableExercisePlan(id)
            .then((res) => {
                if (!res) {
                    dispatch(push(routes.plans));
                }
                setPlan(res);
                ExercisePlanService.getAllExercisesOfAPlan(id)
                    .then((ex) => {
                        setExercises(ex);
                    })
                    .catch((err) => {
                        dispatch(setErrorMess(err))
                    })
            })
            .catch((err) => {
                dispatch(setErrorMess(err))
                dispatch(push(routes.plans))
            })
            .finally(() => dispatch(setLoading(false)))

    }, [dispatch])

    useEffect(() => {
        if (user?.type === "TRAINER") {
            if (trainerInformation.favoritePlans.find((item) => item.id === Number(id))) {
                setDisableFavoriteBtn(true);
            }
        }
        else if (user?.type === "TRAINEE") {
            if (traineeInformation.favoritePlans.find((item) => item.id === Number(id))) {
                setDisableFavoriteBtn(true);

            }
        }
    }, [dispatch, traineeInformation?.favoritePlans, trainerInformation?.favoritePlans])

    const handleStartSet = () => {
        setIsStartSet(true);

        if (user?.type === "TRAINEE") {
            if (!traineeInformation.favoritePlans.find((item) => item.id === Number(id))) {
                // create
                ExercisePlanService.postTraineeFavoriteExercisesPlan(user?.id, id, {
                    status: "IN_PROGRESS"
                })
                    .then((res) => {
                        dispatch(setTraineeFavoritePlans([...traineeInformation.favoritePlans, {
                            ...plan,
                            status: "IN_PROGRESS"
                        }]))
                        dispatch(setSuccessMess("Successfully start exercise plan !!!"))
                    })
                    .catch((error) => dispatch(setErrorMess(error)))
            }
            else {
                //put
                ExercisePlanService.updateTraineeFavoriteExercisesPlan(user?.id, id, {
                    status: "IN_PROGRESS"
                })
                    .then((res) => {
                        const newExercisePlans = [...traineeInformation.favoritePlans].map((item) => {
                            if (item.id === Number(id)) {
                                return ({
                                    ...item,
                                    status: "IN_PROGRESS"
                                })
                            }
                            else return item
                        });
                        dispatch(setTraineeFavoritePlans(newExercisePlans))
                        dispatch(setSuccessMess("Successfully start exercise plan !!!"))
                    })
                    .catch((error) => dispatch(setErrorMess(error)))
            }
        }
        else if (user?.type === "TRAINER") {
            if (!trainerInformation.favoritePlans.find((item) => item.id === Number(id))) {
                // create
                ExercisePlanService.postTrainerFavoriteExercisesPlan(user?.id, id, {
                    status: "IN_PROGRESS"
                })
                    .then((res) => {
                        dispatch(setTrainerFavoritePlans([...trainerInformation.favoritePlans, {
                            ...plan,
                            status: "IN_PROGRESS"
                        }]))
                        dispatch(setSuccessMess("Successfully start exercise plan !!!"))
                    })
                    .catch((error) => dispatch(setErrorMess(error)))
            }
            else {
                //put
                ExercisePlanService.updateTrainerFavoriteExercisesPlan(user?.id, id, {
                    status: "IN_PROGRESS"
                })
                    .then((res) => {
                        const newExercisePlans = [...trainerInformation.favoritePlans].map((item) => {
                            if (item.id === Number(id)) {
                                return ({
                                    ...item,
                                    status: "IN_PROGRESS"
                                })
                            }
                            else return item
                        });
                        dispatch(setTrainerFavoritePlans(newExercisePlans))
                        dispatch(setSuccessMess("Successfully start exercise plan !!!"))
                    })
                    .catch((error) => dispatch(setErrorMess(error)))
            }
        }
    }

    const handleFinishPlan = () => {
        dispatch(setLoading(true));
        if (user?.type === "TRAINEE") {
            ExercisePlanService.updateTraineeFavoriteExercisesPlan(user?.id, id, {
                status: "DONE"
            })
                .then((res) => {
                    const newExercisePlans = [...traineeInformation.favoritePlans].map((item) => {
                        if (item.id === Number(id)) {
                            return ({
                                ...item,
                                status: "DONE"
                            })
                        }
                        else return item
                    });

                    dispatch(setTraineeFavoritePlans(newExercisePlans));
                    dispatch(push(routes.plans));
                })
                .catch((error) => dispatch(setErrorMess(error)))
                .finally(() => dispatch(setLoading(false)))

        }
        else if (user?.type === "TRAINER") {
            ExercisePlanService.updateTrainerFavoriteExercisesPlan(user?.id, id, {
                status: "DONE"
            })
                .then((res) => {
                    const newExercisePlans = [...trainerInformation.favoritePlans].map((item) => {
                        if (item.id === Number(id)) {
                            return ({
                                ...item,
                                status: "DONE"
                            })
                        }
                        else return item
                    });

                    dispatch(setTrainerFavoritePlans(newExercisePlans));
                    dispatch(push(routes.plans));
                })
                .catch((error) => dispatch(setErrorMess(error)))
                .finally(() => dispatch(setLoading(false)))
        }
    }

    const handleAddFavorite = () => {
        dispatch(setLoading(true));
        if (user?.type === "TRAINEE") {
            ExercisePlanService.postTraineeFavoriteExercisesPlan(user?.id, id, {
                status: "TODO"
            })
                .then((res) => {
                    dispatch(setTraineeFavoritePlans([...traineeInformation.favoritePlans, {
                        ...plan,
                        status: "TODO"
                    }]))
                    dispatch(setSuccessMess("Successfully add to exercise plans !!!"))
                })
                .catch((error) => dispatch(setErrorMess(error)))
                .finally(() => dispatch(setLoading(false)))
        }
        else if (user?.type === "TRAINER") {
            ExercisePlanService.postTrainerFavoriteExercisesPlan(user?.id, id, {
                status: "TODO"
            })
                .then((res) => {
                    dispatch(setTrainerFavoritePlans([...trainerInformation.favoritePlans, {
                        ...plan,
                        status: "TODO"
                    }]))
                    dispatch(setSuccessMess("Successfully add to exercise plans !!!"))
                })
                .catch((error) => dispatch(setErrorMess(error)))
                .finally(() => dispatch(setLoading(false)))
        }
    }

    const handleBackSet = () => {
        setIsStartSet(false);
    }

    return (
        <>
            <NavigationBar />


            {
                !isStartSet ? (
                    <div>
                        <Button className={clsx(classes.btnReturn, classes.setMargin)}><Link to={routes.plans} className={classes.noDecorBack}>&#60; BACK </Link></Button>
                        <div className={classes.summaryBox}>
                            <div className={classes.setName}>{plan?.name}</div>
                            <div className={classes.setCreator}>Set Creator: {plan?.trainerFirstName} {plan?.trainerLastName}</div>

                            <Row className={classes.infoBox}>
                                <Col xs={12} md={4} className={classes.flexCenter}>
                                    <img src={plan?.bannerImageUrl || summaryLogo} className={classes.image} alt="setImage" />
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
                                <Button onClick={() => handleAddFavorite()} className={classes.btnFavorites} disabled={disableFavoriteBtn}>ADD TO FAVORITES</Button>
                                <Button type="button" className={classes.btnStart} onClick={handleStartSet}>START SET</Button>
                            </div>
                        </div>
                    </div>
                )
                    :
                    (
                        <SetContent handleFinishPlan={handleFinishPlan} exercises={exercises} maxStep={exercises.length} handleBackSet={handleBackSet} />
                    )
            }
            <Footer />
        </>
    )

})

export default SetSummary;