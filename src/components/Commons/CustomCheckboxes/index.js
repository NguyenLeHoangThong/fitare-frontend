import { memo } from "react";
import { Controller } from "react-hook-form";
import { FormGroup, FormCheck } from "react-bootstrap";
import classes from "./styles.module.scss";
import clsx from "clsx";

const CustomCheckboxes = memo((props) => {

    // @ts-ignore
    const { options, control, checkboxRef, bindKey, bindLabel, classNameWrapper, classNameCheckbox, errorMessage } = props;

    return (
        <FormGroup>
            <Controller
                control={control}
                name={checkboxRef}
                defaultValue={options?.map((item) => ({
                    id: item["bindKey"] || item.id,
                    name: item["bindLabel"] || item?.name,
                    checked: false
                }))}
                render={({ field }) => (
                    <div className={clsx(classes.checkboxWrapper, classNameWrapper)}>
                        {
                            options?.map((item, index) => {
                                return (
                                    <FormCheck
                                        className={clsx(classes.checkbox, classNameCheckbox)}
                                        key={index}
                                        type="checkbox"
                                        label={bindLabel ? item["bindLabel"] : item?.name}
                                        id={bindKey ? item["bindKey"] : item.id}
                                        onChange={(value) => field.value[index] = {
                                            ...field.value[index],
                                            checked: value?.target?.checked
                                        }}
                                    />
                                )
                            })
                        }
                    </div>
                )}
            />
            {
                errorMessage ? <p className={classes.errorMessage}>{errorMessage}</p> : null
            }
        </FormGroup>
    )
})

export default CustomCheckboxes;