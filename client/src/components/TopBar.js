import React, {Component} from "react";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import {Redirect} from "react-router-dom"
import Nav from "react-bootstrap/Nav";

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logout: false
        }
    }

    handleRoleView = () => {
        const role = localStorage.getItem("roles");
        if (role === null || role === "ROLE_USER") {
            return "";
        }
        return role.substring(5).toLowerCase();
    }

    handleLogoutView = () => {
        return localStorage.getItem("token") === null ? "" : (
            <Nav.Link eventKey="logout">Logout</Nav.Link>
        );
    }

    handleClickItem = (selectedKey) => {
        localStorage.clear();
        this.setState({
            logout: true
        });
    }

    render() {
        if (this.state.logout) {
            return <Redirect to="/"/>
        }

        return (
            <div>
                <Navbar
                    bg="light"
                    variant="pills"
                    className="bg-primary"
                    style={{boxShadow: "0 3px 3px rgba(0, 0, 0, 0.25)"}}
                    onSelect={this.handleClickItem}
                >
                    <Navbar.Brand>
                        Car Service
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="text-danger mr-2">
                            {this.handleRoleView()}
                        </Navbar.Text>
                        <Navbar.Text>
                            {localStorage.getItem("username")}
                        </Navbar.Text>
                        {this.handleLogoutView()}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default TopBar;