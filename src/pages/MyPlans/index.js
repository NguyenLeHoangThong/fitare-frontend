import { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    const { createdPlans } = useSelector((state) => state?.trainer)

    const [bmiFilters, setBmiFilters] = useState([]);
    const [muscleFilters, setMuscleFilters] = useState([]);
    const [durationFilters, setDurationFilters] = useState([]);
    const [levelFilters, setLevelFilters] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const handleChangeSearch = (value) => {
        setSearchValue(value);
    }

    const DropdownChoice = (value, name, handleClickBtn, index) => {

        return (
            <div className={classes.dropdownChoice} key={index}>
                <div className={classes.content}>
                    {name}
                </div>
                <Button onClick={() => handleClickBtn(value)} type="button" className={classes.icon}>
                    <GrClose />
                </Button>
            </div>
        )
    }

    useEffect(() => {

        const renderArray = [...defaultContent]
            .filter((i1) => {
                if (bmiFilters?.length > 0) {
                    return bmiFilters.findIndex((f1) => i1.bmi === f1.value) !== -1
                }
                else {
                    return true;
                }
            })
            .filter((i2) => {
                if (muscleFilters?.length > 0) {
                    if (!i2?.muscleGroup || !i2?.muscleGroup?.length) {
                        return false;
                    }
                    return i2?.muscleGroup.some(r => muscleFilters.map((item) => item?.value).indexOf(r) >= 0)
                }
                else {
                    return true;
                }
            })
            .filter((i3) => {
                if (durationFilters?.length > 0) {
                    return durationFilters.findIndex((f3) => i3.hours === f3.value) !== -1
                }
                else {
                    return true;
                }
            })
            .filter((i4) => {
                if (levelFilters?.length > 0) {
                    return levelFilters.findIndex((f4) => i4.level === f4.value) !== -1
                }
                else {
                    return true;
                }
            })
            .filter((i5) => {
                if (!searchValue) {
                    return true;
                }
                else {
                    return i5.name.toLowerCase().includes(searchValue.toLowerCase());
                }
            })

        setContent(renderArray);

    }, [bmiFilters, muscleFilters, durationFilters, levelFilters, searchValue])

    const dispatch = useDispatch();

    useEffect(() => {
        setDefaultContent(createdPlans);
        setContent(createdPlans);
    }, [dispatch]);

    const handleAddFilterBMI = (value) => {
        if (bmiFilters.findIndex((item) => item.value === value.value) === -1) {
            setBmiFilters([...bmiFilters, value]);
        }
    };

    const handleRemoveFilterBMI = (value) => {
        setBmiFilters([...bmiFilters].filter((item) => item.value !== value.value));
    };

    const handleAddFilterMuscle = (value) => {
        if (muscleFilters.findIndex((item) => item.value === value.value) === -1) {
            setMuscleFilters([...muscleFilters, value]);
        }
    };

    const handleRemoveFilterMuscle = (value) => {
        setMuscleFilters([...muscleFilters].filter((item) => item.value !== value.value));
    };

    const handleAddFilterDuration = (value) => {
        if (durationFilters.findIndex((item) => item.value === value.value) === -1) {
            setDurationFilters([...durationFilters, value]);
        }
    };

    const handleRemoveFilterDuration = (value) => {
        setDurationFilters([...durationFilters].filter((item) => item.value !== value.value));
    };

    const handleAddFilterLevel = (value) => {
        if (levelFilters.findIndex((item) => item.value === value.value) === -1) {
            setLevelFilters([...levelFilters, value]);
        }
    };

    const handleRemoveFilterLevel = (value) => {
        setLevelFilters([...levelFilters].filter((item) => item.value !== value.value));
    };

    return (
        <div>
            <NavigationBar />

            <Row className={classes.Box}>
                <div className={classes.createPlanWrapper}>
                    <Button><Link to="/myplans/create">CREATE</Link></Button>
                </div>
                <Col xs={12} md={3} className={clsx(classes.flex)}>
                    <div className={classes.filterBox}>
                        <div className={classes.header}>FILTER</div>
                        <div className={clsx(classes.bmiLevel, classes.selection)}>
                            <DropdownButton className={classes.dropdownBtn} id="dropdown-basic-button" title="BMI level">

                                {
                                    bmiTypes.map((item, index) => (
                                        <Dropdown.Item key={index} onClick={() => handleAddFilterBMI(item)} className={classes.dropdown}>
                                            <div className={classes.name}>{item.name}</div>
                                            <div className={classes.number}>{item.description}</div>
                                        </Dropdown.Item>
                                    ))
                                }

                            </DropdownButton>

                            <div className={classes.filterWrapper}>
                                {
                                    bmiFilters?.length ? bmiFilters.map((item, index) => (
                                        DropdownChoice(item, item.description, handleRemoveFilterBMI, index)
                                    ))
                                        : null
                                }
                            </div>
                        </div>

                        <div className={clsx(classes.muscleGroup, classes.selection)}>
                            <DropdownButton className={classes.dropdownBtn} id="dropdown-basic-button" title="Muscle Group">

                                {
                                    muscleGroupTypes.map((item, index) => (
                                        <Dropdown.Item key={index} onClick={() => handleAddFilterMuscle(item)} className={classes.dropdown}>
                                            <div className={classes.name}>{item.name}</div>
                                        </Dropdown.Item>
                                    ))
                                }

                            </DropdownButton>

                            <div className={classes.filterWrapper}>
                                {
                                    muscleFilters?.length ? muscleFilters.map((item, index) => (
                                        DropdownChoice(item, item.name, handleRemoveFilterMuscle, index)
                                    ))
                                        : null
                                }
                            </div>
                        </div>

                        <div className={clsx(classes.duration, classes.selection)}>
                            <DropdownButton className={classes.dropdownBtn} id="dropdown-basic-button" title="Duration">

                                {
                                    durationTypes.map((item, index) => (
                                        <Dropdown.Item key={index} onClick={() => handleAddFilterDuration(item)} className={classes.dropdown}>
                                            <div className={classes.name}>{item.name} Minutes</div>
                                        </Dropdown.Item>
                                    ))
                                }

                            </DropdownButton>

                            <div className={classes.filterWrapper}>
                                {
                                    durationFilters?.length ? durationFilters.map((item, index) => (
                                        DropdownChoice(item, `${item.name} Minutes`, handleRemoveFilterDuration, index)
                                    ))
                                        : null
                                }
                            </div>
                        </div>

                        <div className={clsx(classes.intensityLevel, classes.selection)}>
                            <DropdownButton className={classes.dropdownBtn} id="dropdown-basic-button" title="Intensity Level">

                                {
                                    levelTypes.map((item, index) => (
                                        <Dropdown.Item key={index} onClick={() => handleAddFilterLevel(item)} className={classes.dropdown}>
                                            <div className={classes.name}>{item.name}</div>
                                        </Dropdown.Item>
                                    ))
                                }

                            </DropdownButton>

                            <div className={classes.filterWrapper}>
                                {
                                    levelFilters?.length ? levelFilters.map((item, index) => (
                                        DropdownChoice(item, item.name, handleRemoveFilterLevel, index)
                                    ))
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={9} className={clsx(classes.flex)}>
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

                                            <div className={classes.btn}>
                                                <Button className={classes.btnDelete}>Delete</Button>
                                                <Button className={classes.btnEdit}><Link to={`/myplans/${plan?.id}/edit`}>Edit</Link></Button>
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