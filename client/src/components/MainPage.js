import React, {Component} from "react";
import TopBar from "./TopBar";
import Menu from "./Menu";
import PageContent from "./PageContent";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {Redirect} from "react-router-dom"


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.buttonMenuClick = this.buttonMenuClick.bind(this);
        this.state = {
            whichButton: sessionStorage.getItem("whichButton"),
        }
    }

    buttonMenuClick(buttonName) {
        if (buttonName !== this.state.whichButton) {
            this.setState({
                whichButton: buttonName
            });
            sessionStorage.setItem("whichButton", buttonName);
        }
    }

    handleChangeContent = () => {
        if (this.state.whichButton === null) {
            return "";
        } else {
            return (<PageContent whichContent={this.state.whichButton}/>);
        }
    }

    render() {
        if (localStorage.getItem("token") === null) {
            return (<Redirect to="/"/>);
        }

        return (
            <div>
                <TopBar />

                <div style={{background: 'none'}} className="container-fluid">
                    <Row>
                        <Col md="2" sm="2"
                             style={{background: '#F2F2F2', height: '100vh', boxShadow: "inset -3px 3px 5px rgba(0, 0, 0, 0.25)"}}
                             className="pt-5"
                        >
                            <h3 style={{textAlign: 'center'}}>Select a table</h3>
                            <Menu buttonMenuClick={this.buttonMenuClick} activeButton={this.state.whichButton}/>
                        </Col>
                        <Col md="8" sm="8"
                             className="pt-5"
                        >
                            {this.handleChangeContent()}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default MainPage;