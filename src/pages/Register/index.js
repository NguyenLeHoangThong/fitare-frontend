import { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import CustomInput from "components/Commons/CustomInput";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classes from "./styles.module.scss";
import { setLoading, setErrorMess, setSuccessMess } from "redux/reducers/Status/actionTypes";
import { FaEnvelope } from 'react-icons/fa';
import { FaLock } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { routes } from 'routers/routes.js';
import firebaseApp from "services/Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserService } from "services/User/user";
import { TrainerProfileService } from "services/Trainer/trainerProfile";
import { TraineeProfileService } from "services/Trainee/traineeProfile";
import { push } from "connected-react-router";
import { setUserReducer } from "redux/reducers/User/actionTypes";
import { setTraineeReducer } from "redux/reducers/Trainee/actionTypes";
import { setTrainerReducer } from "redux/reducers/Trainer/actionTypes";
import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";

const Register = memo((props) => {

    const dispatch = useDispatch()

    const schema = useMemo(() => {
        return yup.object().shape({
            email: yup.string().email("Please input valid email").required("Please input email"),
            password: yup.string().required("Please input password").matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Must have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number"
            ),
            conPassword: yup.string().required("Please input confirm password").oneOf([yup.ref('password'), null], "Confirm password must match password"),
            firstName: yup.string().required("Please input First Name"),
            lastName: yup.string().required("Please input Last Name"),
            phoneNumber: yup.string().required("Please input Phone Number"),
        })
    }, []);

    const [userType, setUserType] = useState(false);

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

    const onSubmit = async (data) => {
        dispatch(setLoading(true));
        const auth = getAuth(firebaseApp);
        createUserWithEmailAndPassword(auth, data?.email, data?.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                UserService.postUserData({
                    email: data?.email,
                    isActivate: true,
                    firebaseUid: user?.uid,
                    type: userType ? "TRAINER" : "TRAINEE"
                })
                    .then((userRes) => {
                        dispatch(setUserReducer(userRes))
                        if (userType) {
                            TrainerProfileService.postTrainerProfile({
                                firstName: data?.firstName,
                                lastName: data?.lastName,
                                phone: data?.phoneNumber,
                                userId: userRes?.id
                            })
                                .then((trainerProfile) => {
                                    dispatch(setTrainerReducer(trainerProfile))
                                })
                                .catch((error) => dispatch(setErrorMess(error)))
                                .finally(() => {
                                    dispatch(setSuccessMess("Sign up successfully"));
                                    dispatch(push("/plans"));
                                })
                        }
                        else {
                            TraineeProfileService.postTraineeProfile({
                                firstName: data?.firstName,
                                lastName: data?.lastName,
                                phone: data?.phoneNumber,
                                userId: userRes?.id
                            })
                                .then((traineeProfile) => {
                                    dispatch(setTraineeReducer(traineeProfile))
                                })
                                .catch((error) => dispatch(setErrorMess(error)))
                                .finally(() => {
                                    dispatch(setSuccessMess("Sign up successfully"));
                                    dispatch(push("/plans"));
                                })
                        }
                    })
                    .catch((error) => dispatch(setErrorMess(error)))
            })
            .catch((error) => dispatch(setErrorMess(error)))
            .finally(() => {
                dispatch(setLoading(false));
            })
    }
    return (
        <>
            <NavigationBar />

            <div className={classes.loginBox}>
                <div className={classes.title}>SIGN UP</div>

                <Form onSubmit={handleSubmit(onSubmit)} >
                    <div className={classes.flexBox}>
                        <div className={classes.Column}>
                            <div className={classes.flexInput}>
                                <FaEnvelope className={classes.icon} />
                                <CustomInput
                                    inputRef="email"
                                    className={classes.textboxInput}
                                    placeholder="Email"
                                    control={control}
                                    errorMessage={errors?.email?.message}
                                />
                            </div>
                            <div className={classes.flexInput}>
                                <FaLock className={classes.icon} />
                                <CustomInput
                                    inputRef="password"
                                    className={classes.textboxInput}
                                    placeholder="Password"
                                    control={control}
                                    errorMessage={errors?.password?.message}
                                    isPassword
                                />
                            </div>
                            <div className={classes.flexInput}>
                                <FaLock className={classes.icon} />
                                <CustomInput
                                    inputRef="conPassword"
                                    className={classes.textboxInput}
                                    placeholder="Confirm Password"
                                    control={control}
                                    errorMessage={errors?.conPassword?.message}
                                    isPassword
                                />
                            </div>
                        </div>
                        <div className={classes.Column}>
                            <div className={classes.flexInput}>
                                <FaUserAlt className={classes.icon} />
                                <CustomInput
                                    inputRef="firstName"
                                    className={classes.textboxInput}
                                    placeholder="First Name"
                                    control={control}
                                    errorMessage={errors?.firstName?.message}

                                />
                            </div>
                            <div className={classes.flexInput}>
                                <FaUserAlt className={classes.icon} />
                                <CustomInput
                                    inputRef="lastName"
                                    className={classes.textboxInput}
                                    placeholder="Last Name"
                                    control={control}
                                    errorMessage={errors?.lastName?.message}

                                />
                            </div>
                            <div className={classes.flexInput}>
                                <BsFillTelephoneFill className={classes.icon} />
                                <CustomInput
                                    inputRef="phoneNumber"
                                    className={classes.textboxInput}
                                    placeholder="Phone Number"
                                    control={control}
                                    errorMessage={errors?.phoneNumber?.message}

                                />
                            </div>
                        </div>

                    </div>

                    <div className={classes.flexContent}>
                        <div className={classes.checkBoxBox}>
                            <input
                                type="checkbox"
                                className={classes.checkBox}
                                id="isTrainer"
                                onChange={(e) => setUserType(e.target.checked)}
                            />
                            <span className={classes.checkMark}></span>
                            <label htmlFor="isTrainer">Are you a Trainer ?</label>
                        </div>

                        <Button className={classes.btnLogin}><Link to={routes.login} className={classes.noDecor}>Sign In</Link></Button>
                        <Button type="submit" className={classes.btnRegister}>Sign Up</Button>
                    </div>

                </Form>
            </div>

            <Footer />
        </>
    )

})

export default Register;