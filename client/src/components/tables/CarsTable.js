import React, {Component} from "react";
import {loadData} from "../../actions/LoadData"
import {deleteData} from "../../actions/DeleteData";
import {updateData} from "../../actions/UpdateData";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import cellEditFactory from 'react-bootstrap-table2-editor';
import Button from "react-bootstrap/Button";
import NewItemModal from "../modals/NewItemModal";
import "bootswatch/dist/litera/bootstrap.css"
import Toast from "react-bootstrap/Toast";
import ColorButton from "../ColorButton";

class CarsTable extends Component {
    constructor(props) {
        super(props);
        this.handleEmptyTable = this.handleEmptyTable.bind(this);
        this.validatorColumns = this.validatorColumns.bind(this);
        this.handleBeforeSaveCell = this.handleBeforeSaveCell.bind(this);
        this.setLoadedData = this.setLoadedData.bind(this);
        this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this);

        this.rowObjectSelect = null;

        this.state = {
            loadedData: [],
            modalShow: false,
            toastSuccessShow: false,
            toastSuccessText: "",
            toastDangerShow: false,
            toastDangerText: ""
        }

        this.columns = [{
            dataField: 'id',
            text: 'ID',
            sort: true,
            headerStyle: {
                outline: 'none',
                width: '10%'
            }
        }, {
            dataField: "color",
            text: "Color",
            sort: true,
            editable: false,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            },
            formatter: (cellContent, row) => (
                <ColorButton
                    itemRow={row}
                    onChange={this.handleButtonColorChange}
                />
            )
        }, {
            dataField: "isForeign",
            text: "Foreign",
            sort: true,
            editable: false,
            headerStyle: {
                outline: 'none'
            },
            formatter: (cellContent, row) => (
                <div
                    className="custom-control custom-checkbox"
                >
                    <input
                        id={row.id}
                        type="checkbox"
                        onChange={this.handleCheckbox}
                        className="custom-control-input"
                        defaultChecked={row.isForeign}
                    />
                    <label className="custom-control-label" htmlFor={row.id}> </label>
                </div>
            )
        }, {
            dataField: "mark",
            text: "Mark",
            sort: true,
            editable: true,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            }
        }, {
            dataField: "num",
            text: "Number",
            sort: true,
            editable: true,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            }
        }];

        this.pagination = paginationFactory({
            hideSizePerPage: true,
            hidePageListOnlyOnePage: true,
        });

        this.cellEdit = cellEditFactory({
            mode: 'dbclick',
            blurToSave: true,
            autoSelectText: true,
            editable: false,
            beforeSaveCell: this.handleBeforeSaveCell,
        });

        this.selectRow = {
            mode: "radio",
            clickToSelect: true,
            clickToEdit: true,
            hideSelectColumn: true,
            style: {background: 'rgb(68,157,255)'},
            selected: [],
            onSelect: (row, isSelect, rowIndex, e) => {
                if (isSelect) {
                    this.rowObjectSelect = row;
                }
            }
        }
    }

    async componentDidMount() {
        await this.setLoadedData("cars");
    }

    async componentDidUpdate(prevProps) {
        // if (this.props !== prevProps) {
        //     await this.setLoadedData("cars");
        // }
        this.rowObjectSelect = null;
    }

    async setLoadedData(whichTable) {
        try {
            const data = await loadData(whichTable);
            this.setState({
                loadedData: data
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleEmptyTable() {
        return (<div>Table is Empty :(</div>);
    }

    validatorColumns(newValue, row, column) {
        if (newValue.toString().length >= 40) {
            return {
                valid: false,
                message: "Too many characters!"
            }
        }
        return true;
    }

    handleBeforeSaveCell(oldValue, newValue, row, column, done) {
        let isValidEdit = false;
        if (this.checkValidTableEdit(newValue, column.dataField)) {
            row[column.dataField] = newValue;
            updateData("cars", row)
                .then(() =>
                    this.setState({
                    toastSuccessShow: true,
                    toastSuccessText: "Successful update " + column.text
                })
                );
            isValidEdit = true;
        } else {
            this.setState({
                toastDangerShow: true,
                toastDangerText: "Failed to update " + column.text + "! you may have entered incorrect data."
            });
        }
        setTimeout(() => {
            done(isValidEdit);
        }, 0);
        return {async: true};
    }

    handleCheckbox = (event) => {
        let updatedCar = this.state.loadedData.find(car => car.id.toString() === event.target.id);
        updatedCar.isForeign = !updatedCar.isForeign;
        updateData("cars", updatedCar)
            .then(data =>
            this.setState({
                loadedData: this.state.loadedData.map(car => car.id === data.id ? data : car),
                toastSuccessShow: true,
                toastSuccessText: "Successful update " + this.columns[2].text
            })
        );
    }

    handleButtonColorChange = (newColor, carRow) => {
        carRow.color = newColor;
        updateData("cars", carRow)
            .then(() => {
                this.setState({
                    toastSuccessShow: true,
                    toastSuccessText: "Successful update " + this.columns[1].text
                })
            });

    }

    checkValidTableEdit = (newValue, dataField) => {
        switch (dataField) {
            case "mark":
                return (/^[a-zA-Zа-яА-Я0-9\s]{1,40}/.test(newValue));
            case "num":
                return (/^[a-zA-Z0-9-]{1,40}/.test(newValue));
            default:
                return false;
        }
    }

    async handleClickDeleteButton() {
        if (this.rowObjectSelect !== null) {
            await deleteData("cars", this.rowObjectSelect.id)
                .then()
                .catch((error) => {
                    console.log("deleted");
                    this.setState({
                        toastSuccessShow: true,
                        toastSuccessText: "Successful delete!"
                    })
                });
            await this.setLoadedData("cars");
        }
    }

    handleButtonsView = () => {
        if (localStorage.getItem("roles") !== null) {
            return (<div>
                <Button variant="primary" onClick={() => this.setState({modalShow: true})}>New Item</Button>{" "}
                <Button variant="danger" onClick={this.handleClickDeleteButton}>Delete</Button>
            </div>);
        } else {
            return "";
        }
    }

    handleModal = (newCar) => {
        this.setState({
            modalShow: false
        })
        if (newCar) {
            this.state.loadedData.push(newCar);
            this.setState({
                loadedData: this.state.loadedData
            });
        }
    }

    render() {
        return (
            <div>
                <h1 className="h1 text-left">Cars</h1>
                <BootstrapTable
                    bootstrap4
                    keyField='id'
                    data={this.state.loadedData}
                    columns={this.columns}
                    noDataIndication={this.handleEmptyTable}
                    bordered={false}
                    pagination={this.state.loadedData.length <= 10 ? null : this.pagination}
                    cellEdit={this.cellEdit}
                    selectRow={this.selectRow}
                    defaultSorted={[{dataField: "id", order: "asc"}]}
                    hover
                />
                {this.handleButtonsView()}

                <NewItemModal
                    show={this.state.modalShow}
                    onHide={this.handleModal}
                    whichTable="cars"
                />

                <div style={{position: "absolute", bottom: "10%", right: "40%"}}>
                    <Toast
                        show={this.state.toastSuccessShow}
                        onClose={() => this.setState({toastSuccessShow: false})}
                        delay={2000}
                        autohide
                    >
                        <Toast.Header style={{background: "#01c280"}}>
                            <strong className="mr-auto text-dark">Info</strong>
                        </Toast.Header>
                        <Toast.Body style={{background: "#01c280"}}>
                            {this.state.toastSuccessText}
                        </Toast.Body>
                    </Toast>
                    <Toast
                        show={this.state.toastDangerShow}
                        onClose={() => this.setState({toastDangerShow: false})}
                        delay={2000}
                        autohide
                    >
                        <Toast.Header style={{background: "#ef5857"}}>
                            <strong className="mr-auto text-dark">Info</strong>
                        </Toast.Header>
                        <Toast.Body style={{background: "#ef5857"}}>
                            {this.state.toastDangerText}
                        </Toast.Body>
                    </Toast>
                </div>
            </div>
        );
    }
}

export default CarsTable;