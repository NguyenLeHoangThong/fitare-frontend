import { memo } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FormGroup } from "react-bootstrap";

const customStyles = (errorMessage) => ({
    indicatorSeparator: () => ({
        display: "none",
    }),
    container: (provided) => ({
        ...provided,
        margin: 0
    }),
    option: (provided, state) => ({
        ...provided,
        cursor: state.isDisabled ? "not-allowed" : "pointer",
        background: state.isSelected ? "#e8f1fb" : "#ffffff",
        color: "#2c2c2c",
        "&:not(:last-child)": {
            borderBottom: "1px solid var(--color-blue)",
        },
        "&:hover": {
            background: "#e8f1fb",
        },
    }),
    control: (provided, state) => ({
        ...provided,
        border: "1px solid var(--color-blue)",
        borderRadius: "8px",
        boxShadow: state.menuIsOpen && "0 0 0 1.6px var(--color-blue)",
        backgroundColor: state.isDisabled ? "#e3e3e3" : "unset",
        transition: "all 0.3s ease-in-out",
        paddingLeft: "var(--select-fontSize)",
        "&:hover": {
            cursor: "pointer"
        }
    }),
    valueContainer: (provided) => ({
        ...provided,
        "input": {
            fontSize: "var(--select-fontSize) !important"
        }
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "#888888",
        opacity: 0.8,
        fontSize: "var(--select-fontSize)",
        fontWeight: "400",
        margin: 0,
        textAlign: "center",
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: state.isDisabled ? "#888888" : "#2c2c2c",
        fontSize: "var(--select-fontSize)",
        fontWeight: 400,
        margin: 0,
    }),
    input: (provided) => ({
        ...provided,
        margin: 0,
    }),
    menuPortal: (provided) => ({
        ...provided,
        zIndex: 9999
    }),
    menu: (provided, state) => ({
        ...provided,
        border: "1px solid var(--color-blue)"
    }),
});

const formatOptionLabel = ({ value, name, description }) => (
    <div className={classes.optionContainer}>
        <h1 className={classes.optionLabel}>{name}</h1>
        <p>
            {description}
        </p>
    </div>
);

const CustomSelect = memo((props) => {

    // @ts-ignore
    const { className, errorMessage, name, control, bindKey, bindLabel, ...rest } = props;

    return (
        <FormGroup
            className={clsx(
                classes.root,
                { "has-danger": !!errorMessage },
                className
            )}
        >
            {control ? (
                <>
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                styles={customStyles(!!errorMessage)}
                                menuPortalTarget={document.querySelector("body")}
                                getOptionValue={(option) => option[bindKey || "id"]}
                                getOptionLabel={(option) => option[bindLabel || "name"]}
                                noOptionsMessage={() => "..."}
                                formatOptionLabel={formatOptionLabel}
                                isSearchable={false}
                                {...rest}
                            />
                        )}
                    />
                </>
            ) : (
                <>
                    <Select
                        styles={customStyles(!!errorMessage)}
                        menuPortalTarget={document.querySelector("body")}
                        getOptionValue={(option) => option[bindKey || "id"]}
                        getOptionLabel={(option) => option[bindLabel || "name"]}
                        noOptionsMessage={() => "..."}
                        formatOptionLabel={formatOptionLabel}
                        isSearchable={false}
                        {...rest}
                    />
                </>
            )}
            {errorMessage && (
                <span className="text-danger ml-2 mt-1 d-block">{errorMessage}</span>
            )}
        </FormGroup>
    );
}
);

export default CustomSelect;
