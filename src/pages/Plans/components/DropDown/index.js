import { memo } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import classes from "./styles.module.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import clsx from 'clsx'
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { GrClose } from 'react-icons/gr';

const Plans = memo((props) => {

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
        <div className={classes.dropdownChoice}>
            <div className={classes.content}>
                content
            </div>
            <div className={classes.icon}>
                <GrClose />
            </div>
        </div>
    ) 
    
})

export default Plans;