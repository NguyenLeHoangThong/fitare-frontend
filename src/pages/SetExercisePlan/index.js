import { memo, useMemo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { push } from "connected-react-router";

import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import UploadImage from "components/Commons/UploadImage";
import CustomInput from "components/Commons/CustomInput";
import CustomSelect from "components/Commons/CustomSelect";
import CustomCheckboxes from "components/Commons/CustomCheckboxes";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classes from "./styles.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { routes } from 'routers/routes.js';
import { bmiTypes, muscleGroupTypes, durationTypes, levelTypes } from "models/ExercisePlan";
import { getBMITypes, getMuscleGroupTypes, getDurationTypes, getLevelTypes, difficultyFormatArray } from "utils/exercisePlan";
import SetExercise from "./components/SetExercise";

const SetExercisePlan = memo((props) => {

    yup.addMethod(yup.array, "muscleGroupCheck", function (errorMessage) {
        return this.test(`test-muscle-group`, errorMessage, function (value) {
            const { path, createError } = this;

            let check = false;
            value.forEach((item) => {
                if (item.checked) {
                    check = true;
                }
            })

            return (
                check || createError({ path, message: errorMessage })
            );
        });
    });

    const [isSetExPlan, setIsExPlan] = useState(true);
    const [exPlanData, setExPlanData] = useState(null);
    const [exData, setExData] = useState([]);

    const schema = useMemo(() => {
        return yup.object().shape({
            bannerImage: yup.mixed().required("Please choose an image"),
            description: yup.string().required("Please type in description"),
            title: yup.string().required("Please type in plan name"),
            bmiType: yup.object().required("Please choose a bmi type"),
            durationType: yup.object().required("Please choose a duration type"),
            levelType: yup.object().required("Please choose a level type"),
            muscleGroup: yup.array().muscleGroupCheck("Please choose at least 1 muscle group")
        })
    }, []);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        setValue,
        watch
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    useEffect(() => {
        if (isSetExPlan) {
            if (exPlanData) {
                reset({
                    bannerImage: exPlanData?.bannerImage,
                    levelType: exPlanData?.levelType,
                    durationType: exPlanData?.durationType,
                    title: exPlanData?.title,
                    description: exPlanData?.description,
                    bmiType: exPlanData?.bmiType,
                    muscleGroup: [...exPlanData?.muscleGroup]
                })
            }
        }
    }, [dispatch, isSetExPlan])

    const returnExPlan = () => {
        setIsExPlan(true);
    }

    const handlePushExData = (data) => {
        setExData([...exData, data]);
    }

    const handleSetExData = (data, index) => {
        const tempExData = [...exData];
        tempExData[index] = data;
        setExData([...tempExData]);
    }

    const onSubmit = (data) => {
        setExPlanData(data);
        setIsExPlan(false);
    }

    return (
        <div>
            <NavigationBar />
            {
                isSetExPlan ? (
                    <div className={classes.container}>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Button className={clsx(classes.btnReturn, classes.setMargin)}>
                                <Link to={routes.myPlans} className={classes.noDecorBack}>&#60; Return </Link>
                            </Button>
                            <Row className={classes.wrapper}>
                                <Col xs={12} md={3}>
                                    <div className={classes.setTag}>
                                        <div className={classes.titleSetTag}>Set Tag</div>
                                        <CustomSelect
                                            className={clsx(classes.selectBMI, classes.customSelect)}
                                            placeholder="BMI Level"
                                            name={`bmiType`}
                                            control={control}
                                            options={bmiTypes}
                                            errorMessage={errors?.bmiType && errors?.bmiType?.message}
                                        />
                                        <CustomSelect
                                            className={clsx(classes.selectDuration, classes.customSelect)}
                                            placeholder="Duration"
                                            name={`durationType`}
                                            control={control}
                                            options={durationTypes}
                                            errorMessage={errors?.durationType && errors?.durationType?.message}
                                        />
                                        <CustomSelect
                                            className={clsx(classes.selectIntensity, classes.customSelect)}
                                            placeholder="Intensity Level"
                                            name={`levelType`}
                                            control={control}
                                            options={levelTypes}
                                            errorMessage={errors?.levelType && errors?.levelType?.message}
                                        />

                                        <div className={classes.muscle}>
                                            <CustomCheckboxes
                                                title={"Tag Muscle Group"}
                                                control={control}
                                                checkboxRef={"muscleGroup"}
                                                options={muscleGroupTypes}
                                                classNameWrapper={classes.checkboxes}
                                                errorMessage={errors?.muscleGroup && errors?.muscleGroup?.message}
                                                defaultCheckedArray={exPlanData?.muscleGroup}
                                            />
                                        </div>
                                    </div>
                                </Col>

                                <Col xs={12} md={9}>
                                    <div className={classes.content}>
                                        <div>
                                            <CustomInput
                                                inputRef="title"
                                                className={classes.titlePlan}
                                                placeholder="SET EXERCISE PLAN NAME"
                                                control={control}
                                                errorMessage={errors?.title?.message}
                                            />
                                        </div>
                                        <Controller
                                            name="bannerImage"
                                            control={control}
                                            render={({ field }) => (
                                                <UploadImage
                                                    // @ts-ignore
                                                    className={classes.bannerImage}
                                                    errorMessage={errors?.bannerImage?.message}
                                                    avatar={!field.value}
                                                    value={field.value}
                                                    onChange={(file) => {
                                                        return field.onChange(file)
                                                    }}
                                                />
                                            )}
                                        />

                                        <CustomInput
                                            inputRef="description"
                                            className={classes.textareaInput}
                                            placeholder="Description:"
                                            control={control}
                                            errorMessage={errors?.description?.message}
                                            textType="textarea"
                                        />
                                    </div>
                                </Col>

                                <div className={classes.btn}>
                                    {/* <Button>Add exercise</Button> */}
                                    <Button type="submit">Add exercise</Button>
                                </div>
                            </Row>
                        </Form>
                    </div>
                )
                    :
                    <SetExercise
                        returnExPlan={returnExPlan}
                        handlePushExData={handlePushExData}
                        handleSetExData={handleSetExData}
                        exData={exData}
                        exPlanData={exPlanData}
                        isSetExPlan={isSetExPlan}
                    />
            }

            <Footer />
        </div>
    )
})

export default SetExercisePlan;
