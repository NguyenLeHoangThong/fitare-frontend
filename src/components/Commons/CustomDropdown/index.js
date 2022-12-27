import classes from "./styles.module.scss";
import { memo } from "react";
import { Link } from "react-router-dom";

import { routes } from "routers/routes";

const CustomDropdown = memo((props) => {

    // @ts-ignore
    const { optionList, isOpened} = props;

    return (
        <div>
            {
                (isOpened) && <div className={classes.dropdown}>
                    {
                        Object.entries(optionList).map((option, index) => {
                            return <div key = {index}>
                                <Link to = {option[1]}>
                                    {option[0]}
                                </Link>
                            </div>
                        })
                    }
                </div>
            }
        </div>


    )
});

export default CustomDropdown;