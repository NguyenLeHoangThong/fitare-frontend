import { memo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import classes from "./styles.module.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import clsx from 'clsx'
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import { setLoading, setErrorMess } from "redux/reducers/Status/actionTypes";
import { ExercisePlanService } from "services/ExercisePlan";
import { getBMITypes, getMuscleGroupTypes, getDurationTypes, getLevelTypes, difficultyFormatArray } from "utils/exercisePlan";
import { GrClose } from 'react-icons/gr';
import { bmiTypes, muscleGroupTypes, durationTypes, levelTypes } from "models/ExercisePlan";
import { Link } from "react-router-dom";
import { routes } from "routers/routes.js";

const Plans = memo((props) => {

    const [defaultContent, setDefaultContent] = useState([]);
    const [content, setContent] = useState([]);

    const [searchValue, setSearchValue] = useState("");

    const handleChangeSearch = (value) => {
        setSearchValue(value);
    }

    useEffect(() => {

        const renderArray = [...defaultContent]
            .filter((i5) => {
                if (!searchValue) {
                    return true;
                }
                else {
                    return i5.name.toLowerCase().includes(searchValue.toLowerCase());
                }
            })

        setContent(renderArray);

    }, [searchValue])

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        ExercisePlanService.getAllUncensoredExercisePlan()
            .then((res) => {
                setDefaultContent(res);
                setContent(res);
            })
            .catch((err) => dispatch(setErrorMess(err)))
            .finally(() => dispatch(setLoading(false)));
    }, [dispatch]);

    return (
        <div>
            <NavigationBar />
            <Row className={classes.Box}>

                <Col xs={12} className={clsx(classes.flex)}>
                    <Container className={classes.planBox}>
                        <div className={classes.search}>
                            <Form className="d-flex" >
                                <Form.Control
                                    type="text"
                                    placeholder="Search by name"
                                    aria-label="Search"
                                    value={searchValue}
                                    onChange={(e) => handleChangeSearch(e.target.value)}
                                />
                            </Form>
                        </div>

                        <Row className={classes.boxExercisePlan}>

                            {
                                content?.length ? content.map((plan) => (
                                    <Col md={4} key={plan?.id}>
                                        <div className={classes.exercisePlan}>
                                            <div className={classes.titleExer}>{plan?.name}</div>
                                            <div className={classes.details}>
                                                {
                                                    plan?.bmi && (
                                                        <div className={classes.inforBox}>
                                                            <div className={clsx(classes.infor, classes.bmi)}>
                                                                BMI {getBMITypes(plan?.bmi)?.description}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    plan?.muscleGroup && plan?.muscleGroup?.length && (
                                                        <div className={classes.inforBox}>
                                                            <div className={clsx(classes.infor, classes.muscle)}>
                                                                {plan.muscleGroup.join(', ')}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    plan?.hours && (
                                                        <div className={classes.inforBox}>
                                                            <div className={clsx(classes.infor, classes.durationTime)}>
                                                                {getDurationTypes(plan?.hours)?.name}
                                                            </div>
                                                            <div className={clsx(classes.infor, classes.durationUnit)}>
                                                                MINS
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    plan?.level && (
                                                        <div className={classes.inforBox}>
                                                            <div className={clsx(classes.infor, classes.intensity)}>
                                                                <div className={classes.name}>
                                                                    DIFFICULTY
                                                                </div>
                                                                <div className={classes.level}>
                                                                    {
                                                                        difficultyFormatArray(plan?.level).map((item, index) => (
                                                                            <div key={index} className={clsx(classes.diffNode, item ? classes.on : classes.off)}></div>
                                                                        ))
                                                                    }
                                                                </div>
                                                                {/* <div className={classes.txt}>
                                                                    Suitable for beginners
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>

                                            <div className={classes.creatorName}>
                                                {plan?.trainerFirstName} {plan?.trainerLastName}
                                            </div>
                                            <div className={classes.flexRow}>

                                                <div className={classes.btn}>
                                                    <Link to={`/censored/plan/${plan?.id}`} className={classes.btnSelect}>Select</Link>
                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                ))
                                    :
                                    null
                            }
                        </Row>
                    </Container>


                </Col>
            </Row>
            <Footer />
        </div>
    )
})

export default Plans;