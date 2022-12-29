import { memo, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { push } from "connected-react-router";
import CustomInput from "components/Commons/CustomInput";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classes from "./styles.module.scss";
//import components from "";
import { setLoading } from "redux/reducers/Status/actionTypes";
import { FaEnvelope } from 'react-icons/fa';
import { FaLock } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

import { Link } from 'react-router-dom';
import { routes } from 'routers/routes.js';

const Register = memo((props) => {

    const dispatch = useDispatch()

    const schema = useMemo(() => {
        return yup.object().shape({
            email: yup.string().email("Please input valid email").required("Please input email"),
            password: yup.string().required("Please input password"),
            conPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match"),
            firstName: yup.string().required("Please input First Name"),
            lastName: yup.string().required("Please input Last Name"),
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
        //await dispatch(setLoading(true))


        //xử lý data được submit
        console.log(data);
    }
    return (
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
                                placeholder="email"
                                control={control}
                                errorMessage={errors?.email?.message}
                            />
                        </div>
                        <div className={classes.flexInput}>
                            <FaLock className={classes.icon} />
                            <CustomInput
                                inputRef="password"
                                className={classes.textboxInput}
                                placeholder="password"
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
                                placeholder="confirm password"
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
                                errorMessage={errors?.email?.message}
                                
                            />
                        </div>
                        <div className={classes.flexInput}>
                            <FaUserAlt className={classes.icon} />
                            <CustomInput
                                inputRef="lastName"
                                className={classes.textboxInput}
                                placeholder="Last Name"
                                control={control}
                                errorMessage={errors?.email?.message}
                                
                            />
                        </div>

                    </div>

                </div>

                <div className={classes.flexContent}>
                    <Button className={classes.btnLogin}><Link to={routes.login} className={classes.noDecor}>Sign In</Link></Button>
                    <Button type="submit" className={classes.btnRegister}>Sign Up</Button>
                </div>

            </Form>
        </div>
    )

})

export default Register;