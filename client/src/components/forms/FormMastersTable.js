import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";
import {addData} from "../../actions/AddData";

class FormMastersTable extends React.Component{
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
                name: form.elements.first_name.value + " " + form.elements.last_name.value
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
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="first_name"
                            pattern="^[a-zA-Zа-яА-Я]{1,20}"
                            placeholder="First Name"
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="valid">Looks nice!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            This field is required! Maximum length 40 characters.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="last_name"
                            pattern="^[a-zA-Zа-яА-Я]{1,20}"
                            placeholder="Last Name"
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="valid">Looks nice!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            This field is required! Maximum length 40 characters.
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

export default FormMastersTable;