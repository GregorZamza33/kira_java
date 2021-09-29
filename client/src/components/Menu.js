import React, {Component} from "react";
import Nav from "react-bootstrap/Nav";
import "bootswatch/dist/litera/bootstrap.css"

const menuOptions = [
    {name: 'cars', value: "Cars"},
    {name: 'masters', value: "Masters"},
    {name: 'services', value: "Services"},
    {name: 'works', value: "Works"}
]

class Menu extends Component {
    constructor(props) {
        super(props);
        this.handleClickItem = this.handleClickItem.bind(this);
    }

    handleClickItem(selectedKey) {
        this.props.buttonMenuClick(selectedKey)
    }

    render() {
        return (
            <div>
                <Nav
                    fill
                    justify
                    variant="pills"
                    className="flex-column"
                    activeKey={this.props.activeButton}
                    onSelect={this.handleClickItem}
                >
                    {menuOptions.map((option) => (
                        <Nav.Item key={option.name} className="mb-1">
                            <Nav.Link
                                eventKey={option.name}
                            >
                                {option.value}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </div>
        );
    }
}

export default Menu;