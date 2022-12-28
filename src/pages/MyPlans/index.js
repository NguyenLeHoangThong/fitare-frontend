import { memo } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import classes from "./styles.module.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import clsx from 'clsx'
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, { useState } from "react";
import ReactDOM from "react-dom";
import DropdownChoice from "./components/DropDown";

const CreatePlan = memo((props) => {

    // const schema = useMemo(() => {
    //     return yup.object().shape({
    //         avatar: yup.mixed(),
    //         name: yup.string()
    //     })
    // }, []);


    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //     control,
    //     reset,
    //     setValue,
    //     watch
    // } = useForm({
    //     resolver: yupResolver(schema),
    //     mode: "onChange",
    // });

    // const onSubmit = (data) => {
    //     console.log(data);
    // }


    const [dropdownMenu, setDropdownMenu] = useState(<div />);
    const [content, setContent] = useState("");

    const onAddBtnClick = event => {
        setDropdownMenu(<DropdownChoice />);

    };

    return (
        <div>
            <Row className={classes.Box}>
                <Col xs={12} md={3} className={clsx(classes.flex)}>
                <div className={classes.filterBox}>
                        <div className={classes.header}>FILTER</div>
                        <div className={clsx(classes.bmiLevel, classes.selection)}>
                            <DropdownButton id="dropdown-basic-button" title="BMI level">
                                <Dropdown.Item href="#/action-1" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>Underweight</div>
                                    <div className={classes.number}>&#60; 18.5</div>
                                </Dropdown.Item>

                                <Dropdown.Item href="#/action-2" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>Normal weight</div>
                                    <div className={classes.number}>18.5 - 24.9</div>
                                </Dropdown.Item>

                                <Dropdown.Item href="#/action-3" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>Overweight</div>
                                    <div className={classes.number}>25 - 29.9</div>
                                </Dropdown.Item>

                                <Dropdown.Item href="#/action-4" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>Obesity</div>
                                    <div className={classes.number}>&#62; 30</div>
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                        {dropdownMenu}

                        <div className={clsx(classes.muscleGroup, classes.selection)}>
                            <DropdownButton id="dropdown-basic-button" title="Muscle Group">
                                <Dropdown.Item href="#/action-1" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>Arms</div>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>Chest</div>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>Abdomen</div>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-4" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>Shoulders</div>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-5" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>Legs</div>
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                        {dropdownMenu}

                        <div className={clsx(classes.duration, classes.selection)}>
                            <DropdownButton id="dropdown-basic-button" title="Duration">
                                <Dropdown.Item href="#/action-1" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>15 - 30 Minutes</div>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>30 - 60 Minutes</div> 
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>60 - 90 Minutes</div>  
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                        {dropdownMenu}

                        <div className={clsx(classes.intensityLevel, classes.selection)}>
                            <DropdownButton id="dropdown-basic-button" title="Intensity Level">
                                <Dropdown.Item href="#/action-1" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>1</div>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>2</div>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>3</div>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>4</div>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3" onClick={onAddBtnClick} className={classes.dropdown}>
                                    <div className={classes.name}>5</div>
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                        {dropdownMenu}
                    </div>
                </Col>
                <Col xs={12} md={9} className={clsx(classes.flex)}>
                    <div className={classes.planBox}>
                        <div className={classes.search}>
                            <Form className="d-flex" >
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button className={clsx(classes.btnSearch)}>Create</Button>
                            </Form>
                        </div>

                        <div className={classes.boxExercisePlan}>
                            <div className={classes.exercisePlan}>
                                <div className={classes.titleExer}>Weight Loss Exercises</div>
                                <div className={classes.details}>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.bmi)}>
                                            BMI &#62; 18.5
                                        </div>
                                    </div>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.muscle)}>
                                            CHEST, SHOULDERS, LEGS
                                        </div>
                                    </div>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.durationTime)}>
                                            1
                                        </div>
                                        <div className={clsx(classes.infor, classes.durationUnit)}>
                                            HOURS
                                        </div>
                                    </div>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.intensity)}>
                                            <div className={classes.name}>
                                                DIFFICULTY
                                            </div>
                                            <div className={classes.level}>
                                                <div className={clsx(classes.diffNode, classes.on)}></div>
                                                <div className={clsx(classes.diffNode, classes.on)}></div>
                                                <div className={clsx(classes.diffNode, classes.off)}></div>
                                                <div className={clsx(classes.diffNode, classes.off)}></div>
                                                <div className={clsx(classes.diffNode, classes.off)}></div>
                                            </div>
                                            <div className={classes.txt}>
                                                Suitable for beginners
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={classes.creatorName}>
                                    Trương Gia Huy
                                </div>

                                <div className={classes.btn}>
                                    <Button className={classes.btnEdit}>Edit</Button>
                                    <Button className={classes.btnDelete}>Delete</Button>
                                    <Button className={classes.btnSelect}>Select</Button>
                                </div>

                            </div>

                            <div className={classes.exercisePlan}>
                                <div className={classes.titleExer}>Weight Loss Exercises</div>
                                <div className={classes.details}>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.bmi)}>
                                            BMI &#62; 18.5
                                        </div>
                                    </div>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.muscle)}>
                                            CHEST, SHOULDERS, LEGS
                                        </div>
                                    </div>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.durationTime)}>
                                            1
                                        </div>
                                        <div className={clsx(classes.infor, classes.durationUnit)}>
                                            HOURS
                                        </div>
                                    </div>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.intensity)}>
                                            <div className={classes.name}>
                                                DIFFICULTY
                                            </div>
                                            <div className={classes.level}>
                                                <div className={clsx(classes.diffNode, classes.on)}></div>
                                                <div className={clsx(classes.diffNode, classes.on)}></div>
                                                <div className={clsx(classes.diffNode, classes.off)}></div>
                                                <div className={clsx(classes.diffNode, classes.off)}></div>
                                                <div className={clsx(classes.diffNode, classes.off)}></div>
                                            </div>
                                            <div className={classes.txt}>
                                                Suitable for beginners
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={classes.creatorName}>
                                    Trương Gia Huy
                                </div>

                                <div className={classes.btn}>
                                    <Button className={classes.btnEdit}>Edit</Button>
                                    <Button className={classes.btnDelete}>Delete</Button>
                                    <Button className={classes.btnSelect}>Select</Button>
                                </div>

                            </div>

                            <div className={classes.exercisePlan}>
                                <div className={classes.titleExer}>Weight Loss Exercises</div>
                                <div className={classes.details}>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.bmi)}>
                                            BMI &#62; 18.5
                                        </div>
                                    </div>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.muscle)}>
                                            CHEST, SHOULDERS, LEGS
                                        </div>
                                    </div>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.durationTime)}>
                                            1
                                        </div>
                                        <div className={clsx(classes.infor, classes.durationUnit)}>
                                            HOURS
                                        </div>
                                    </div>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.intensity)}>
                                            <div className={classes.name}>
                                                DIFFICULTY
                                            </div>
                                            <div className={classes.level}>
                                                <div className={clsx(classes.diffNode, classes.on)}></div>
                                                <div className={clsx(classes.diffNode, classes.on)}></div>
                                                <div className={clsx(classes.diffNode, classes.off)}></div>
                                                <div className={clsx(classes.diffNode, classes.off)}></div>
                                                <div className={clsx(classes.diffNode, classes.off)}></div>
                                            </div>
                                            <div className={classes.txt}>
                                                Suitable for beginners
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={classes.creatorName}>
                                    Trương Gia Huy
                                </div>

                                <div className={classes.btn}>
                                    <Button className={classes.btnEdit}>Edit</Button>
                                    <Button className={classes.btnDelete}>Delete</Button>
                                    <Button className={classes.btnSelect}>Select</Button>
                                </div>

                            </div>

                            <div className={classes.exercisePlan}>
                                <div className={classes.titleExer}>Weight Loss Exercises</div>
                                <div className={classes.details}>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.bmi)}>
                                            BMI &#62; 18.5
                                        </div>
                                    </div>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.muscle)}>
                                            CHEST, SHOULDERS, LEGS
                                        </div>
                                    </div>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.durationTime)}>
                                            1
                                        </div>
                                        <div className={clsx(classes.infor, classes.durationUnit)}>
                                            HOURS
                                        </div>
                                    </div>
                                    <div className={classes.inforBox}>
                                        <div className={clsx(classes.infor, classes.intensity)}>
                                            <div className={classes.name}>
                                                DIFFICULTY
                                            </div>
                                            <div className={classes.level}>
                                                <div className={clsx(classes.diffNode, classes.on)}></div>
                                                <div className={clsx(classes.diffNode, classes.on)}></div>
                                                <div className={clsx(classes.diffNode, classes.off)}></div>
                                                <div className={clsx(classes.diffNode, classes.off)}></div>
                                                <div className={clsx(classes.diffNode, classes.off)}></div>
                                            </div>
                                            <div className={classes.txt}>
                                                Suitable for beginners
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={classes.creatorName}>
                                    Trương Gia Huy
                                </div>

                                <div className={classes.btn}>
                                    <Button className={classes.btnEdit}>Edit</Button>
                                    <Button className={classes.btnDelete}>Delete</Button>
                                    <Button className={classes.btnSelect}>Select</Button>
                                </div>

                            </div>
                        </div>
                    </div>


                </Col>
            </Row>

        </div>
    )
})

export default CreatePlan;