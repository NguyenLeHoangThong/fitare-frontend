import { memo, useMemo } from "react";
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
import { ClassNames } from "@emotion/react";

const SetExercisePlan = memo((props) => {

    const schema = useMemo(() => {
        return yup.object().shape({
            imgaePlan: yup.mixed(),
            description: yup.string()
        })
    }, []);


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

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div>
            <NavigationBar />
            <div className={classes.container}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.titlePlan}>&#60; EDIT-EXERCISE-PLAN-NAME &#62;</div>
                    <Row className={classes.wrapper}>
                        <Col xs={12} md={3}>
                            <div className={classes.setTag}>
                                <div className={classes.titleSetTag}>Set Tag</div>
                                <CustomSelect
                                    className={clsx(classes.selectBMI, classes.customSelect)}
                                    placeholder="BMI Level"
                                    name={`BMILevel`}
                                    control={control}
                                    options={[
                                        { id: 1, name: "Underweight", description: "< 18.5" },
                                        { id: 2, name: "Normal weight", description: "18.5 - 24.9" },
                                        { id: 3, name: "Overweight", description: "25 - 29.9" },
                                        { id: 4, name: "Obesity", description: "> 30" },
                                    ]}
                                    errorMessage={errors?.BMILevel && errors?.BMILevel?.message}
                                />
                                <CustomSelect
                                    className={clsx(classes.selectDuration, classes.customSelect)}
                                    placeholder="Duration"
                                    name={`duration`}
                                    control={control}
                                    options={[
                                        { id: 1, name: "15 - 30 Minutes" },
                                        { id: 2, name: "30 - 60 Minutes" },
                                        { id: 3, name: "60 - 90 Minutes" },
                                    ]}
                                    errorMessage={errors?.duration && errors?.duration?.message}
                                />
                                <CustomSelect
                                    className={clsx(classes.selectIntensity, classes.customSelect)}
                                    placeholder="Intensity Level"
                                    name={`intensity`}
                                    control={control}
                                    options={[
                                        { id: 1, name: "1" },
                                        { id: 2, name: "2" },
                                        { id: 3, name: "3" },
                                        { id: 4, name: "4" },
                                    ]}
                                    errorMessage={errors?.intensity && errors?.intensity?.message}
                                />

                                <div className={classes.muscle}>
                                    <div className={classes.tagMuscle}>
                                        Tag Muscle Group
                                    </div>
                                    <CustomCheckboxes 
                                        control={control}
                                        checkboxRef={"checkboxMuscleGroup"}
                                        options={[
                                            { id: 1, name: "Arms" }, 
                                            { id: 2, name: "Chest" },
                                            { id: 2, name: "Abdomen" },
                                            { id: 2, name: "Shoulders" },
                                            { id: 2, name: "Legs" },
                                        ]}
                                    />
                                </div>
                            </div>
                        </Col>

                        <Col xs={12} md={9}>
                            <div className={classes.content}>
                                <Controller
                                    name="imgaePlan"
                                    control={control}
                                    render={({ field }) => (
                                        <UploadImage
                                            // @ts-ignore
                                            className={classes.bannerImage}
                                            errorMessage={errors?.imgaePlan?.message}
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
                                    value="10"
                                    placeholder="Description:"
                                    control={control}
                                    errorMessage={errors?.description?.message}
                                />
                            </div>
                        </Col>
                        
                        <div className={classes.btn}>
                            <Button>Add exercise</Button>
                            <Button type="submit">Post</Button>
                        </div>
                    </Row>   
                </Form>
            </div>
            <Footer />
        </div>
    )
})

export default SetExercisePlan;
