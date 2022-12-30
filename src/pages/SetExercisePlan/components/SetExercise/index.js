import { memo, useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { push } from "connected-react-router";
import { routes } from "routers/routes.js";
import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import UploadImage from "components/Commons/UploadImage";
import CustomInput from "components/Commons/CustomInput";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useParams } from "react-router-dom";
import * as yup from "yup";
import classes from "./styles.module.scss";
import clsx from "clsx";
import { ExercisePlanService } from "services/ExercisePlan";
import firebaseApp from "services/Firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setLoading, setErrorMess, setSuccessMess } from "redux/reducers/Status/actionTypes";

const SetExercisePlan = memo((props) => {

    const { returnExPlan, handlePushExData, handleSetExData, exData, isSetExPlan, exPlanData } = props;
    const { user } = useSelector((state) => state?.user)

    const schema = useMemo(() => {
        return yup.object().shape({
            imageExercise: yup.mixed().nullable().required("Please choose exercise image"),
            instruction: yup.string().required("Please type in exercise instruction"),
            name: yup.string().required("Please type in exercise name"),
            videoUrl: yup.string()
        })
    }, []);

    const [currentStep, setCurrentStep] = useState(1);
    const [maxStep, setMaxStep] = useState(1);

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
        if (!isSetExPlan) {
            if (exData?.length) {
                setMaxStep(exData.length);
                setCurrentStep(1);
                reset({
                    imageExercise: exData[0]?.imageExercise,
                    instruction: exData[0]?.instruction,
                    name: exData[0]?.name,
                    videoUrl: exData[0]?.videoUrl
                });
            }
        }
    }, [dispatch, isSetExPlan])

    const onSubmit = (data) => {
        if (currentStep === maxStep) {
            handlePushExData(data);
            reset({
                imageExercise: null,
                instruction: "",
                name: "",
                videoUrl: ""
            });
            setCurrentStep((prev) => (prev + 1));
            setMaxStep((prev) => (prev + 1));
        }
        else {
            handleSetExData(data, currentStep - 1);
            reset({
                imageExercise: exData[currentStep]?.imageExercise,
                instruction: exData[currentStep]?.instruction,
                name: exData[currentStep]?.name,
                videoUrl: exData[currentStep]?.videoUrl
            });
            setCurrentStep((prev) => (prev + 1));
        }
    }

    const handleGoPrev = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => (prev - 1));
            reset({
                imageExercise: exData[currentStep - 2]?.imageExercise,
                instruction: exData[currentStep - 2]?.instruction,
                name: exData[currentStep - 2]?.name,
                videoUrl: exData[currentStep - 2]?.videoUrl
            });
        }
    }

    const handleUploadAllData = async () => {
        dispatch(setLoading(true));

        try {
            const newMuscleGroup = exPlanData.muscleGroup.filter((item) => item.checked).map((item2) => item2.name.toUpperCase());
            const exPlanPostData = {
                name: exPlanData?.title,
                description: exPlanData?.description,
                trainerId: user?.id,
                level: exPlanData?.levelType.value,
                muscleGroup: newMuscleGroup,
                bmi: exPlanData?.bmiType.value,
                hours: exPlanData?.durationType.value,
                isActivate: true,
                isCensored: false
            }


            const exercisePlanRes = await ExercisePlanService.createAExercisePlan(exPlanPostData)

            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `/ExercisePlans/${exercisePlanRes.id}/bannerImage.png`);
            await uploadBytes(storageRef, exPlanData?.bannerImage)
                .then(() => {
                    getDownloadURL(storageRef)
                        .then((bannerImage) => {
                            ExercisePlanService.updateAExercisePlan(exercisePlanRes.id, {
                                bannerImageUrl: bannerImage
                            })
                        })
                })

            const finalExData = exData.map((item, index) => ({
                name: item?.name,
                instruction: item?.instruction,
                tutorialVideoUrl: item?.videoUrl,
                exercisePlanId: exercisePlanRes.id,
                step: index + 1
            }))

            const exercisesRes = await ExercisePlanService.postExercisesOfAPlan(exercisePlanRes.id, {
                exercises: [...finalExData]
            })

            const tempImageArray = [];

            const uploadStepImages = await Promise.all(exercisesRes.map(async (item, index) => {
                const storageStepRef = ref(storage, `/ExercisePlans/${exercisePlanRes.id}/exercise${item.id}.png`);
                await uploadBytes(storageStepRef, exData[index]?.imageExercise)
                    .then(async () => {
                        return await getDownloadURL(storageStepRef)
                            .then((bannerImage) => {
                                tempImageArray.push({
                                    id: item.id,
                                    url: bannerImage
                                })
                            })
                    })
            }))

            const finalExImage = exercisesRes.map((item, index) => ({
                id: item.id,
                step: item?.step || index,
                bannerImageUrl: tempImageArray.find((i) => i.id === item.id).url
            }))

            const updateImageToExercise = await ExercisePlanService.updateExercisesOfAPlan(exercisePlanRes.id, {
                exercises: [...finalExImage]
            })

            dispatch((setSuccessMess("Successfully create exercise plan !!!")));
            dispatch((push("/myplans")));

        }
        catch (error) {
            dispatch(setErrorMess(error))
        }
        finally {
            dispatch(setLoading(false));
        }


    }

    return (
        <div>
            <NavigationBar />
            <div className={classes.container}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Button className={clsx(classes.btnReturn, classes.setMargin)} onClick={returnExPlan}>
                        &#60; Exercise Plan
                    </Button>
                    <div className={classes.wrapper}>
                        <CustomInput
                            inputRef="name"
                            className={classes.titleExercise}
                            placeholder="SET EXERCISE NAME"
                            control={control}
                            errorMessage={errors?.name?.message}
                        />

                        <Controller
                            name="imageExercise"
                            control={control}
                            render={({ field }) => (
                                <UploadImage
                                    // @ts-ignore
                                    className={classes.bannerImage}
                                    errorMessage={errors?.imageExercise?.message}
                                    value={field.value}
                                    onChange={(file) => {
                                        return field.onChange(file)
                                    }}
                                />
                            )}
                        />

                        <CustomInput
                            inputRef="videoUrl"
                            className={classes.linkVideo}
                            placeholder="Tutorial video link:"
                            control={control}
                            errorMessage={errors?.videoUrl?.message}
                        />

                        <CustomInput
                            inputRef="instruction"
                            className={classes.instruction}
                            placeholder="Instruction:"
                            control={control}
                            errorMessage={errors?.instruction?.message}
                            textType="textarea"
                        />

                        <div className={classes.btn}>
                            <Button disabled={currentStep <= 1} onClick={() => handleGoPrev()}>Previous</Button>
                            <div className={classes.number}>
                                {currentStep}/{maxStep}
                            </div>
                            <Button type="submit">{currentStep === maxStep ? "Add" : "Update"}</Button>
                        </div>
                    </div>
                    <div className={classes.btnUpload}>
                        <Button onClick={() => handleUploadAllData()}>UPLOAD</Button>
                    </div>
                </Form>
            </div>
            <Footer />
        </div>
    )
})

export default SetExercisePlan;
