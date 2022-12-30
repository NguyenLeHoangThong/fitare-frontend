import { memo, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { push } from "connected-react-router";
import { routes } from "routers/routes.js";
import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import UploadImage from "components/Commons/UploadImage";
import CustomInput from "components/Commons/CustomInput";
import CustomSelect from "components/Commons/CustomSelect";
import CustomCheckboxes from "components/Commons/CustomCheckboxes";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useParams } from "react-router-dom";
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
                    <Button className={clsx(classes.btnReturn, classes.setMargin)}>
                        <Link to={routes.set} className={classes.noDecorBack}>&#60; Exercise Plan </Link>
                    </Button>
                    <div className={classes.wrapper}>
                        <div className={classes.titleExercise}>&#60; EDIT-EXERCISE-NAME &#62;</div>

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
                            className={classes.linkVideo}
                            value="10"
                            placeholder="Video link:"
                            control={control}
                            errorMessage={errors?.description?.message}
                        />

                        <CustomInput
                            inputRef="description"
                            className={classes.instruction}
                            value="10"
                            placeholder="Instruction:"
                            control={control}
                            errorMessage={errors?.description?.message}
                        />

                        <div className={classes.btn}>
                            <Button>Previous</Button>
                            <div className={classes.number}>
                                1/1
                            </div>
                            <Button>Next</Button>
                        </div>
                    </div>
                    <div className={classes.btnUpload}>
                        <Button type="submit">UPLOAD</Button>
                    </div>
                </Form>
            </div>
            <Footer />
        </div>
    )
})

export default SetExercisePlan;
