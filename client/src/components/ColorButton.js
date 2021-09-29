import React, {Component} from "react";
import {ChromePicker} from "react-color"

class ColorButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayColorPicker: false,
            color: this.props.itemRow.color
        }
    }

    handleClickButton = () => {
        this.setState({
            displayColorPicker: !this.state.displayColorPicker
        });
    }

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    }

    handleChange = (newColor) => {
        this.setState({
            color: newColor.hex
        })
    }

    handleChangeComplete = (newColor, event) => {
        this.props.onChange(newColor.hex, this.props.itemRow);
    }

    render() {
        return (
            <div>
                <div
                    style={{
                        background: this.state.color,
                        borderRadius: '50%',
                        width: "25px",
                        height: "25px",
                        boxShadow: '0 0 5px rgba(0,0,0,.25)',
                        cursor: 'pointer'
                    }}
                    onClick={this.handleClickButton}
                />
                {
                    this.state.displayColorPicker ?
                    <div
                        style={{
                            position: 'absolute',
                            left: "6%",
                            zIndex: '2',
                            border: '0',
                            borderRadius: "5px",
                            boxShadow: '0 0 15px rgba(0,0,0,.25)'
                        }}
                    >
                        <div
                            style={{
                                position: 'fixed',
                                top: '0px',
                                right: '0px',
                                bottom: '0px',
                                left: '0px',
                            }}
                            onClick={this.handleClose}
                        />
                        <ChromePicker
                            disableAlpha
                            color={this.state.color}
                            onChange={this.handleChange}
                            onChangeComplete={this.handleChangeComplete}
                        />
                    </div>
                        : null
                }
            </div>
        );
    }
}

export default ColorButton;