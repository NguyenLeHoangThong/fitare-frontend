import classes from "./styles.module.scss";
import { memo } from "react";

const CustomDropdown = memo((props) => {

    // @ts-ignore
    const { optionList, isOpened} = props;

    return (
        <div>
            {
                (isOpened) && <div className={classes.dropdown}>
                    {optionList.map((option, index) => {
                        return <div key={index}>{option}</div>
                    })}
                </div>
            }
        </div>


    )
});

export default CustomDropdown;