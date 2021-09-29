import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";
import {addData} from "../../actions/AddData";

class FormServicesTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            validated: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            const master = {
                name: form.elements.name.value,
                cost_our: form.elements.cost_our.value,
                cost_foreign: form.elements.cost_foreign.value
            }
            addData(this.props.whichTable, master)
                .then(this.props.onHide)
                .catch(message => console.log(message));
        }
        this.setState({
            validated: true
        })
    }

    render() {
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="8" controlId="validationCustom01">
                        <Form.Label>Service Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я0-9\s]{1,40}"
                            placeholder="Service Name"
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="valid">All right!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            This field is required! Maximum length 40 characters.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="3" controlId="validationCustom03">
                        <Form.Label>Cost for our</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="cost_our"
                            pattern="^[0-9]{1,10}"
                            placeholder="Cost"
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="valid">All right!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            This field is required! Cost must be greater than 0 and not exceed 10 characters.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>Cost for foreign</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="cost_foreign"
                            pattern="^[0-9]{1,10}"
                            placeholder="Cost"
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="valid">All right!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            This field is required! Cost must be greater than 0 and not exceed 10 characters.
                        </Form.Control.Feedback>
                    </Form.Group>
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

export default FormServicesTable;