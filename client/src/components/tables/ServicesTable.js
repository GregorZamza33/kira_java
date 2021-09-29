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
import Toast from "react-bootstrap/Toast";

class ServicesTable extends Component {
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
            toastDangerText: "",
            tableEditable: localStorage.getItem("roles") === "ROLE_ADMIN"
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
            dataField: "name",
            text: "Name",
            sort: true,
            editable: this.state.tableEditable,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            }
        }, {
            dataField: "cost_foreign",
            text: "Cost for foreign",
            sort: true,
            editable: this.state.tableEditable,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            }
        }, {
            dataField: "cost_our",
            text: "Cost for our",
            sort: true,
            editable: this.state.tableEditable,
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
        await this.setLoadedData("services");
    }

    async componentDidUpdate(prevProps) {
        // if (this.props !== prevProps) {
        //     await this.setLoadedData("services");
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
            updateData("services", row).then();
            isValidEdit = true;
            this.setState({
                toastSuccessShow: true,
                toastSuccessText: "Successful update " + column.text
            });
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

    checkValidTableEdit = (newValue, dataField) => {
        switch (dataField) {
            case "name":
                return (/^[a-zA-Zа-яА-Я0-9\s]{1,40}/.test(newValue));
            case "cost_foreign":
                return (/^[0-9]{1,10}/.test(newValue));
            case "cost_our":
                return (/^[0-9]{1,10}/.test(newValue));
            default:
                return false;
        }
    }

    async handleClickDeleteButton() {
        if (this.rowObjectSelect !== null) {
            await deleteData("services", this.rowObjectSelect.id).then()
                .catch(() => {
                    console.log("deleted");
                    this.setState({
                        toastSuccessShow: true,
                        toastSuccessText: "Successful delete!"
                    })
                });
            await this.setLoadedData("services");
        }
    }

    handleButtonsView = () => {
        switch (localStorage.getItem("roles")) {
            case "ROLE_USER":
                return "";
            case "ROLE_ADMIN":
                return (<div>
                    <Button variant="primary" onClick={() => this.setState({modalShow: true})}>New Item</Button>{" "}
                    <Button variant="danger" onClick={this.handleClickDeleteButton}>Delete</Button>
                </div>);
            default:
                return "";
        }
    }

    handleModal = (newService) => {
        this.setState({
            modalShow: false
        })
        if (newService) {
            this.state.loadedData.push(newService);
            this.setState({
                loadedData: this.state.loadedData
            });
        }
    }

    render() {
        return (
            <div>
                <h1 className="h1 text-left">Services</h1>
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
                    whichTable="services"
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

export default ServicesTable;