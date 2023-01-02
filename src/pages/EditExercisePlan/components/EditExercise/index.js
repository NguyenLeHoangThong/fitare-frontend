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
import { setTrainerCreatedPlans } from "redux/reducers/Trainer/actionTypes";

const EditExercise = memo((props) => {

    const { returnExPlan, handlePushExData, handleSetExData, exData, isSetExPlan, exPlanData } = props;
    const { user } = useSelector((state) => state?.user)
    const { createdPlans } = useSelector((state) => state?.trainer)

    const [currentStep, setCurrentStep] = useState(1);
    const [maxStep, setMaxStep] = useState(1);
    const [defaultMaxStep, setDefaultMaxStep] = useState(1);

    const dispatch = useDispatch();

    const schema = useMemo(() => {
        return yup.object().shape({
            imageExercise: currentStep <= defaultMaxStep ? yup.mixed().nullable() : yup.mixed().nullable().required("Please choose exercise image"),
            instruction: yup.string().required("Please type in exercise instruction"),
            name: yup.string().required("Please type in exercise name"),
            videoUrl: yup.string()
        })
    }, [currentStep, defaultMaxStep]);

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
                setDefaultMaxStep(exData.length);
                setCurrentStep(1);
                reset({
                    id: exData[0]?.id,
                    instruction: exData[0]?.instruction,
                    name: exData[0]?.name,
                    videoUrl: exData[0]?.tutorialVideoUrl
                });
            }
        }
    }, [dispatch, isSetExPlan])

    const onSubmit = (data) => {
        if (currentStep < defaultMaxStep) {
            handleSetExData({
                ...data,
                id: exData[currentStep - 1]?.id,
                bannerImageUrl: exData[currentStep - 1]?.bannerImageUrl,
                step: currentStep
            }, currentStep - 1);
            reset({
                imageExercise: exData[currentStep]?.imageExercise,
                instruction: exData[currentStep]?.instruction,
                name: exData[currentStep]?.name,
                videoUrl: exData[currentStep]?.tutorialVideoUrl
            });
            setCurrentStep((prev) => (prev + 1));
        }
        else if (currentStep === defaultMaxStep) {
            if (currentStep === maxStep) {
                handleSetExData({
                    ...data,
                    id: exData[currentStep - 1]?.id,
                    bannerImageUrl: exData[currentStep - 1]?.bannerImageUrl,
                    step: currentStep
                }, currentStep - 1);

                reset({
                    imageExercise: null,
                    instruction: "",
                    name: "",
                    videoUrl: ""
                });
                setCurrentStep((prev) => (prev + 1));
                setMaxStep((prev) => (prev + 1));
            }
            else if (currentStep < maxStep) {
                handleSetExData({
                    ...data,
                    id: exData[currentStep - 1]?.id,
                    bannerImageUrl: exData[currentStep - 1]?.bannerImageUrl,
                    step: currentStep
                }, currentStep - 1);
                if (exData[currentStep]) {
                    reset({
                        imageExercise: exData[currentStep]?.imageExercise,
                        instruction: exData[currentStep]?.instruction,
                        name: exData[currentStep]?.name,
                        videoUrl: exData[currentStep]?.tutorialVideoUrl
                    });
                    setCurrentStep((prev) => (prev + 1));
                }
                else {
                    reset({
                        imageExercise: null,
                        instruction: "",
                        name: "",
                        videoUrl: ""
                    });
                    setCurrentStep((prev) => (prev + 1));
                }
            }
        }
        else {
            if (currentStep === maxStep) {
                handlePushExData({
                    ...data,
                    step: currentStep
                });
                reset({
                    imageExercise: null,
                    instruction: "",
                    name: "",
                    videoUrl: ""
                });
                setCurrentStep((prev) => (prev + 1));
                setMaxStep((prev) => (prev + 1));
            }
            else if (currentStep < maxStep) {
                handleSetExData({
                    ...data,
                    id: exData[currentStep - 1]?.id,
                    bannerImageUrl: exData[currentStep - 1]?.bannerImageUrl,
                    step: currentStep
                }, currentStep - 1);
                reset({
                    imageExercise: exData[currentStep]?.imageExercise,
                    instruction: exData[currentStep]?.instruction,
                    name: exData[currentStep]?.name,
                    videoUrl: exData[currentStep]?.tutorialVideoUrl
                });
                setCurrentStep((prev) => (prev + 1));
            }
        }
    }

    const handleGoPrev = () => {
        if (currentStep > 0) {
            reset({
                imageExercise: exData[currentStep - 2]?.imageExercise || null,
                instruction: exData[currentStep - 2]?.instruction,
                name: exData[currentStep - 2]?.name,
                videoUrl: exData[currentStep - 2]?.videoUrl
            });
            setCurrentStep((prev) => (prev - 1));
        }
    }

    const handleUploadAllData = async () => {
        dispatch(setLoading(true));

        try {
            const newMuscleGroup = exPlanData.muscleGroup.filter((item) => item.checked).map((item2) => item2.name.toUpperCase());
            const storage = getStorage(firebaseApp);
            if (exPlanData?.bannerImage) {
                const storageRef = ref(storage, `/ExercisePlans/${exPlanData.id}/bannerImage-${Date.now()}.png`);
                await uploadBytes(storageRef, exPlanData?.bannerImage)
                    .then(() => {
                        getDownloadURL(storageRef)
                            .then(async (bannerImage) => {

                                const exPlanPostData = {
                                    name: exPlanData?.title,
                                    description: exPlanData?.description,
                                    trainerId: user?.id,
                                    level: exPlanData?.levelType.value,
                                    muscleGroup: newMuscleGroup,
                                    bmi: exPlanData?.bmiType.value,
                                    hours: exPlanData?.durationType.value,
                                    isActivate: true,
                                    isCensored: false,
                                    bannerImageUrl: bannerImage
                                }

                                const resultPlan = await ExercisePlanService.updateAExercisePlan(exPlanData.id, exPlanPostData);
                                const newReduxCreatePlan = [...createdPlans].map((item) => {
                                    if (item.id === resultPlan.id) {
                                        return resultPlan;
                                    }
                                    else {
                                        return item;
                                    }
                                })
                                dispatch(setTrainerCreatedPlans(newReduxCreatePlan));

                            })
                    })
            }
            else {
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

                const resultPlan = await ExercisePlanService.updateAExercisePlan(exPlanData.id, exPlanPostData);
                const newReduxCreatePlan = [...createdPlans].map((item) => {
                    if (item.id === resultPlan.id) {
                        return resultPlan;
                    }
                    else {
                        return item;
                    }
                })
                dispatch(setTrainerCreatedPlans(newReduxCreatePlan));
            }

            //update old
            const finalPutExData = exData.filter((fItem) => fItem?.id).map((item, index) => ({
                id: item?.id,
                name: item?.name,
                instruction: item?.instruction,
                tutorialVideoUrl: item?.videoUrl,
                exercisePlanId: exPlanData.id,
                imageExercise: item?.imageExercise,
                step: item?.step
            }))

            if (finalPutExData?.length) {
                const tempUploadUrl = [];

                const uploadStepImages = await Promise.all(finalPutExData.map(async (item, index) => {
                    if (item?.imageExercise) {
                        const storageStepRef = ref(storage, `/ExercisePlans/${finalPutExData.id}/exercise${item.id}-${Date.now()}.png`);
                        await uploadBytes(storageStepRef, item?.imageExercise)
                            .then(async () => {
                                return await getDownloadURL(storageStepRef)
                                    .then(async (bannerImage) => {
                                        tempUploadUrl.push({
                                            id: item?.id,
                                            bannerImageUrl: bannerImage
                                        })
                                    })
                            })
                    }
                }))

                const uploadImagedPutExData = [...finalPutExData].map((item) => {
                    const checkImage = tempUploadUrl.find((fItem) => fItem.id === item.id);
                    if (checkImage) {
                        return ({
                            ...item,
                            bannerImageUrl: checkImage?.bannerImageUrl
                        })
                    }
                    else return item;
                })

                await ExercisePlanService.updateExercisesOfAPlan(exPlanData.id, {
                    exercises: [...uploadImagedPutExData]
                })
            }


            const finalPostExData = exData.filter((fItem) => !fItem?.id).map((item, index) => ({
                name: item?.name,
                instruction: item?.instruction,
                tutorialVideoUrl: item?.videoUrl,
                exercisePlanId: exPlanData.id,
                step: item?.step
            }))

            //add new
            if (finalPostExData?.length) {
                const exercisesRes = await ExercisePlanService.postExercisesOfAPlan(exPlanData.id, {
                    exercises: [...finalPostExData]
                })

                const tempImageArray = [];

                const uploadStepImages = await Promise.all(exercisesRes.map(async (item, index) => {
                    const storageStepRef = ref(storage, `/ExercisePlans/${exPlanData.id}/exercise${item.id}-${Date.now()}.png`);
                    await uploadBytes(storageStepRef, exData?.find((eItem) => eItem.step === item?.step)?.imageExercise)
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

                const updateImageToExercise = await ExercisePlanService.updateExercisesOfAPlan(exPlanData.id, {
                    exercises: [...finalExImage]
                })
            }


            dispatch((setSuccessMess("Successfully update exercise plan !!!")));
            dispatch((push(routes.myPlans)));

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
                                    placeholderImageUrl={currentStep <= defaultMaxStep ? exData[currentStep - 1]?.bannerImageUrl : null}
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
                            <Button type="submit">{currentStep < defaultMaxStep ? "Update" : currentStep === defaultMaxStep && currentStep === maxStep ? "Add" : currentStep < maxStep ? "Update" : "Add"}</Button>
                        </div>
                    </div>
                    <div className={classes.btnUpload}>
                        <Button onClick={() => handleUploadAllData()}>UPDATE</Button>
                    </div>
                </Form>
            </div>
            <Footer />
        </div>
    )
})

export default EditExercise;
