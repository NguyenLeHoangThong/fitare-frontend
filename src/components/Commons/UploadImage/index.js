import { createRef, memo, useState, useEffect } from "react";
import classes from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { setLoading, setErrorMess } from "redux/reducers/Status/actionTypes";
import { Button } from "react-bootstrap";
import clsx from "clsx";
import addImagePlaceholder from "./addImagePlaceholder.png";

const UploadImage = memo((props) => {

    // @ts-ignore
    const { value, onChange, className, errorMessage } = props;

    const dispatch = useDispatch();

    const [file, setFile] = useState();
    const [imagePreviewUrl, setImagePreviewUrl] = useState();

    const fileInput = createRef();

    const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    useEffect(() => {
        if (value) {
            dispatch(setLoading(true));
            setFile(value)
            fileToBase64(value)
                .then((result) => setImagePreviewUrl(result))
                .catch((e) => dispatch(setErrorMess(e)))
                .finally(() => dispatch(setLoading(false)));
        }
        else {
            setImagePreviewUrl(null);
        }
    }, [value, dispatch])

    const handleImageChange = (e) => {
        e.preventDefault();
        let newFile = e.target.files[0];
        if (!newFile) return;
        setFile(newFile);
        onChange(newFile);
    };

    const handleClick = () => {
        fileInput.current.click();
    };

    return (
        <>
            <div className={clsx("fileinput", className || "")}>
                <div className={classes.imagesPreview}>
                    <div>
                        {
                            !imagePreviewUrl ?
                                <img src={addImagePlaceholder} />
                                :
                                <img src={imagePreviewUrl} />
                        }
                        <div className={classes.imageOverlay} onClick={handleClick}></div>
                    </div>
                </div>
                <input type="file" onChange={handleImageChange} ref={fileInput} accept="image/*" onClick={(event) => {
                    event.target.value = null
                }} />
            </div>
            {
                errorMessage ? <p className={classes.errorMessage}>{errorMessage}</p> : null
            }
        </>
    )
})

export default UploadImage;