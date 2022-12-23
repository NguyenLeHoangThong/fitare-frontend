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
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import clsx from 'clsx'

import { setLoading } from "redux/reducers/Status/actionTypes";
import { FaEnvelope } from 'react-icons/fa';
import { FaLock } from "react-icons/fa";

//Image:
import summaryLogo from './summaryImage.png';
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
        //await dispatch(setLoading(true))


        //xử lý data được submit
        console.log(data);
    }
    return (
        <div>

            <Button type="" className={clsx(classes.btnReturn, classes.setMargin)}>	&#60; ALL EXERCISE </Button>
            <div className={classes.summaryBox}>
                <div className={classes.setName}>EXERCISE-PLAN-NAME</div>
                <div className={classes.setCreator}>Set Creator: Creator-name</div>


                <Row className ={classes.infoBox}>
                    <Col xs={12} md={4} className={classes.flexCenter}>
                        <img src={summaryLogo} className={classes.image} alt="setImage" />
                    </Col>
                    <Col xs={12} md={5} className={classes.flexCenter}> 
                        <div className={classes.description}>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod libero ut rhoncus efficitur. Duis congue porttitor dui quis scelerisque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi vel consequat augue, sed cursus odio.</div>
                    </Col>
                    <Col xs={12} md={3} className={clsx(classes.flexCenter, classes.leftColumn) }>
                        <div className={classes.tagBox}> Difficulty</div>
                        <div className={classes.tagBox}> Chest, Shoulder, Leg</div>
                        <div className={classes.tagBox}> BMI &#60; 18.5</div>
                        <div className={classes.tagBox}> 18 Hours</div>
                    </Col>
                </Row>

                <div className={classes.flexContent}>
                    <Button type="" className={classes.btnFavorites}>Add To Favorites</Button>
                    <Button type="submit" className={classes.btnStart}>Start Set</Button>
                </div>
            </div>
        </div>
    )

})

export default Login;