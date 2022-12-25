import { memo } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import classes from "./styles.module.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import clsx from 'clsx'
import Form from 'react-bootstrap/Form';

const Default = memo((props) => {

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
        <div>
            <Row className={classes.Box}>
                <Col xs={12} md={3} className={clsx(classes.flex)}>
                    <div className={classes.filterBox}> BUTTOn</div>
                </Col>
                <Col xs={12} md={9} className={clsx(classes.flex)}>
                    <div className={classes.planBox}><Form className="d-flex" >
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form></div>

                </Col>
            </Row>

        </div>
    )
})

export default Default;