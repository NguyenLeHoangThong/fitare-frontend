import { memo, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { push } from "connected-react-router";
import CustomInput from "components/Commons/CustomInput";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classes from "./styles.module.scss";
import { setLoading, setErrorMess, setSuccessMess } from "redux/reducers/Status/actionTypes";
import { FaEnvelope } from 'react-icons/fa';
import { FaLock } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "services/Firebase";

import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";

import { Link } from 'react-router-dom';
import { routes } from 'routers/routes.js';
const Login = memo((props) => {

    const dispatch = useDispatch()

    const schema = useMemo(() => {
        return yup.object().shape({
            email: yup.string().email("Please input valid email").required("Please input email"),
            password: yup.string().required("Please input password")
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

    const onSubmit = async (data) => {
        const auth = getAuth(firebaseApp);
        dispatch(setLoading(true));
        signInWithEmailAndPassword(auth, data?.email, data?.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch(push("/plans"));
                dispatch(setSuccessMess("Login successfully !!!"))
            })
            .catch((error) => {
                dispatch(setErrorMess({
                    message: "Login false, please check your username and password !"
                }))
                dispatch(setLoading(false));
            })
    }
    return (
        <>
            <NavigationBar />
            <div>
                <div className={classes.loginBox}>
                    <div className={classes.title}>SIGN IN</div>

                    <Form onSubmit={handleSubmit(onSubmit)} >
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
                        <div className={classes.flexContent}>
                            <Button className={classes.btnRegister}> <Link to={routes.register} className={classes.noDecor}>Sign Up</Link> </Button>
                            <Button type="submit" className={classes.btnLogin}>Sign In</Button>
                        </div>
                    </Form>
                </div>
            </div>

            <Footer />
        </>
    )
})

export default Login;