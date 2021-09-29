import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";
import {addData} from "../../actions/AddData";
import ColorButton from "../ColorButton";

class FormCarsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            color: "#000000"
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            const car = {
                num: form.elements.num.value,
                color: this.state.color,
                mark: form.elements.mark.value,
                isForeign: form.elements.isForeign.checked
            }
            addData(this.props.whichTable, car)
                .then(this.props.onHide)
                .catch(message => console.log(message));
        }
        this.setState({
            validated: true
        })
    }

    handlerColorButton = (newColor, carRow) => {
        this.setState({
            color: newColor
        })
    }

    render() {
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="3" controlId="validationCustom03">
                        <Form.Label>Car Number</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="num"
                            pattern="^[a-zA-Z0-9-]{1,40}"
                            placeholder="Car Number"
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="valid">All right!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            This field is required!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                        <Form.Label>Mark</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="mark"
                            pattern="^[a-zA-Zа-яА-Я0-9\s]{1,40}"
                            placeholder="Mark"
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="valid">All right!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            This field is required! Maximum length 40 characters.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="ml-1">
                    <ColorButton
                        itemRow={{color: this.state.color}}
                        onChange={this.handlerColorButton}
                    />
                    <Form.Label className="ml-2 mr-5">Color</Form.Label>
                    <Form.Check
                        type="switch"
                        name="isForeign"
                        id="custom-switch"
                        label="Is foreign?"
                        />
                </Form.Row>
                <Navbar className="justify-content-end">
                    <NavItem className="ml-1">
                        <Button variant="danger" onClick={() => this.props.onHide(null)}>Cancel</Button>
                    </NavItem>
                    <NavItem className="ml-1">
                        <Button type="submit" variant="primary">Submit form</Button>
                    </NavItem>
                </Navbar>
            </Form>
        );
    }
}

export default FormCarsTable;