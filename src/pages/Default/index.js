import { memo, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
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

const Default = memo((props) => {

    // const schema = useMemo(() => {
    //     return yup.object().shape({
    //         avatar: yup.mixed(),
    //         name: yup.string()
    //     })
    // }, []);


    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //     control,
    //     reset,
    //     setValue,
    //     watch
    // } = useForm({
    //     resolver: yupResolver(schema),
    //     mode: "onChange",
    // });

    // const onSubmit = (data) => {
    //     console.log(data);
    // }

    return (
        <div>
            {/* <Form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                        <UploadImage
                            // @ts-ignore
                            className={classes.bannerImage}
                            errorMessage={errors?.avatar?.message}
                            avatar={!field.value}
                            value={field.value}
                            onChange={(file) => {
                                return field.onChange(file)
                            }}
                        />
                    )}
                />

                <CustomInput
                    inputRef="name"
                    className={classes.textareaInput}
                    placeholder="Test"
                    control={control}
                    errorMessage={errors?.name?.message}
                />

                <CustomSelect
                    placeholder="testCustom"
                    name={`testCustom`}
                    control={control}
                    options={[{id: 1, name: "heelo 1", description: "abcd"}, {id: 2, name: "heelo 2", description: "abcd"},]}
                    errorMessage={errors?.testCustom && errors?.testCustom?.message}
                />

                <CustomCheckboxes 
                    control={control}
                    checkboxRef={"testCheckboxes"}
                    options={[{id: 1, name: "Test 1"}, {id: 2, name: "Test 2"}]}
                />

                <Button type="submit">Submit !</Button>
            </Form> */}

            <NavigationBar />
            <Footer />
        </div>
    )
})

export default Default;