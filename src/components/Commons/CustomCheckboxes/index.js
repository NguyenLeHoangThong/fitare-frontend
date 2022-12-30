import { memo, useState } from "react";
import { Controller } from "react-hook-form";
import { FormGroup, FormCheck } from "react-bootstrap";
import classes from "./styles.module.scss";
import clsx from "clsx";

const CustomCheckboxes = memo((props) => {

    // @ts-ignore
    const { options, control, checkboxRef, bindKey, bindLabel, classNameWrapper, classNameCheckbox, errorMessage, title, defaultCheckedArray } = props;

    const [mainOptions, setMainOptions] = useState(defaultCheckedArray?.length ? [...defaultCheckedArray] : [...options]);

    const [fakeRender, setFakeRender] = useState(false);

    return (
        <FormGroup>
            <Controller
                control={control}
                name={checkboxRef}
                defaultValue={mainOptions?.map((item) => ({
                    id: item["bindKey"] || item.id,
                    name: item["bindLabel"] || item?.name,
                    checked: item?.checked || false
                }))}
                render={({ field }) => {
                    return (
                        <div className={clsx(classes.checkboxWrapper, classNameWrapper)}>
                            {title ? (<h3>{title}</h3>) : null}
                            {
                                field.value?.map((item, index) => {
                                    return (
                                        <FormCheck
                                            className={clsx(classes.checkbox, classNameCheckbox)}
                                            key={index}
                                            type="checkbox"
                                            label={bindLabel ? item["bindLabel"] : item?.name}
                                            id={bindKey ? item["bindKey"] : item.id}
                                            onChange={(value) => {
                                                field.value[index] = {
                                                    ...field.value[index],
                                                    checked: value?.target?.checked
                                                }
                                                field.onChange(field.value);
                                                setMainOptions(field.value);
                                                setFakeRender(!fakeRender)
                                            }}
                                            value={item?.checked}
                                            checked={item?.checked}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                }}
            />
            {
                errorMessage ? <p className={classes.errorMessage}>{errorMessage}</p> : null
            }
        </FormGroup>
    )
})

export default CustomCheckboxes;