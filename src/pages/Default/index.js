import { memo } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const Default = memo((props) => {

    const dispatch = useDispatch();

    return (
        <div>

        </div>
    )
})

export default Default;