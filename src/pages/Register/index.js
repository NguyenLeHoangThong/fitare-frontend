import { memo, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { push } from "connected-react-router";
import UploadImage from "components/Commons/UploadImage";
import CustomInput from "components/Commons/CustomInput";
import CustomSelect from "components/Commons/CustomSelect";
import CustomCheckboxes from "components/Commons/CustomCheckboxes";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classes from "./styles.module.scss";
//import components from "";
import { setLoading } from "redux/reducers/Status/actionTypes";
import { FaEnvelope } from 'react-icons/fa';
import { FaLock } from "react-icons/fa";
const Register = memo((props) => {

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
        //await dispatch(setLoading(true))


        //xử lý data được submit
        console.log(data);
    }
    return (
        <div className={classes.loginBox}>
            <div className={classes.title}>SIGN UP</div>

            <Form onSubmit={handleSubmit(onSubmit)} >
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
                />
                </div>
                <div className={classes.flexInput}> 
                <FaLock className={classes.icon} />
                <CustomInput
                    inputRef="password"
                    className={classes.textboxInput}
                    placeholder="confirm password"
                    control={control}
                    errorMessage={errors?.password?.message}
                />
                </div>
                <div className={classes.flexContent}>
                    <Button className={classes.btnRegister}>Sign Up</Button>
                    <Button type="submit" className={classes.btnLogin}>Sign In</Button>
                </div>
                
            </Form>
        </div>
    )

})

export default Register;