import { memo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import classes from "./styles.module.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import clsx from 'clsx'
import { ExercisePlanService } from "services/ExercisePlan";
import { Link, useParams } from "react-router-dom";
import { routes } from "routers/routes.js";
import { setLoading, setErrorMess } from "redux/reducers/Status/actionTypes";
import { push } from "connected-react-router";
import SetFinish from "./components/SetFinish";
import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";

//Image:
import summaryLogo from './summaryImage.png';

const SetContent = memo((props) => {

    const { id } = useParams();

    const [exercises, setExercises] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [maxStep, setMaxStep] = useState(0);
    const [showFinishAllSet, setShowFinishAllSet] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        ExercisePlanService.getAllExercisesOfAPlan(id)
            .then((res) => {
                setExercises(res);
                setMaxStep(res?.length);
            })
            .catch((err) => {
                dispatch(setErrorMess(err))
                dispatch(push("/plans"))
            })
            .finally(() => dispatch(setLoading(false)))
    }, [dispatch])

    const handleFinishSet = () => {
        if (currentStep + 1 === maxStep) {
            setShowFinishAllSet(true);
            // api finish
        }
        else {
            setCurrentStep((step) => step + 1);
        }
    }

    const handleReturnSet = () => {
        setCurrentStep((step) => step - 1);
    }

    return (
        <>
            <NavigationBar />
            {
                showFinishAllSet ? (
                    <SetFinish planName={exercises[currentStep]?.exercisePlanName} />
                )
                    : (
                        <div>
                            <Button className={clsx(classes.btnReturn, classes.setMargin)}>	<Link to={`/plans-summary/${id}`} className={classes.noDecorBack}>&#60; BACK TO SUMMARY</Link> </Button>
                            {
                                exercises?.length ? (
                                    <div className={classes.summaryBox}>
                                        <div className={classes.setName}>{exercises[currentStep]?.exercisePlanName}</div>
                                        <div className={classes.setExercise}>{exercises[currentStep]?.name}</div>

                                        <img src={exercises[currentStep]?.bannerImageUrl || summaryLogo} className={classes.image} alt="setImage" />

                                        <Row className={classes.infoBox}>
                                            <Col xs={12} md={8} className={classes.flexCenter}>
                                                <div className={classes.instruction}>Instruction: {exercises[currentStep]?.instruction}</div>
                                            </Col>
                                            <Col xs={12} md={4} className={clsx(classes.flexCenter)}>
                                                {/* <div className={classes.tagBox}> 4 SETS X 18 REPS</div> */}
                                                {
                                                    exercises[currentStep]?.tutorialVideoUrl ? (
                                                        <Button href={exercises[currentStep]?.tutorialVideoUrl} className={classes.btnVideo} target="_blank" rel="noopener noreferrer">Video Tutorial</Button>
                                                    ) : null
                                                }
                                            </Col>
                                        </Row>

                                        <div className={classes.flexContent}>
                                            <Button className={classes.btnFavorites} disabled={currentStep <= 0} onClick={() => handleReturnSet()}>RETURN</Button>
                                            <div className={classes.pageNumberBox}> {currentStep + 1}/{maxStep} </div>
                                            <Button className={classes.btnFinish} onClick={() => handleFinishSet()}>FINISH</Button>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                    )}
            <Footer />
        </>
    )

})

export default SetContent;