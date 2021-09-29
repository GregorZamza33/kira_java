import React, {Component} from "react";
import "bootswatch/dist/litera/bootstrap.css"
import FormLogin from "./forms/FormLogin";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="container-fluid bg-light" style={{height: "100vh"}}>
                <Row className="align-items-center justify-content-center h-100">
                    <Col lg="3" className="mx-5">
                        <FormLogin/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default LoginPage;