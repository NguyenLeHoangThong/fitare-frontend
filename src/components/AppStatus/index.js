import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    setSuccessMess,
    clearErrorMess,
} from "redux/reducers/Status/actionTypes";
import LoadingScreen from "../LoadingScreen";

export const AppStatus = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const status = useSelector((state) => state?.status);

    return (
        <>
            {status?.isLoading && <LoadingScreen />}
            <Snackbar
                open={!!status?.error}
                autoHideDuration={6000}
                onClose={() => dispatch(clearErrorMess(undefined))}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Alert
                    elevation={6}
                    variant="filled"
                    onClose={() => dispatch(clearErrorMess(undefined))}
                    severity="error"
                    sx={{
                        width: "350px",
                    }}
                >
                    {status?.error}
                </Alert>
            </Snackbar>
            <Snackbar
                open={!!status?.success}
                autoHideDuration={6000}
                onClose={() => dispatch(setSuccessMess(undefined))}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Alert
                    elevation={6}
                    variant="filled"
                    onClose={() => dispatch(setSuccessMess(undefined))}
                    severity="success"
                    sx={{
                        width: "350px",
                        fontWeight: 500,
                    }}
                >
                    {status?.success}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AppStatus;
