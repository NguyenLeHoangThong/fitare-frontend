import classes from "./styles.module.scss";
import { FormControl, FormGroup } from "react-bootstrap";
import { memo } from "react";
import { Controller } from "react-hook-form";
import clsx from "clsx";

const CustomInput = memo((props) => {

    // @ts-ignore
    const { control, inputRef, placeholder, className, errorMessage, textType, isPassword } = props;

    return (
        <FormGroup>
            <Controller
                control={control}
                name={inputRef}
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FormControl
                        className={clsx(classes.root, className)}
                        onChange={onChange}
                        as={textType || "input"} // input or textarea
                        value={value}
                        ref={ref}
                        isInvalid={errorMessage}
                        placeholder={placeholder}
                        type={isPassword ? "password" : ""}
                    />
                )}
            />
            {
                errorMessage ? <p className={classes.errorMessage}>{errorMessage}</p> : null
            }
        </FormGroup>
    )
});

export default CustomInput;