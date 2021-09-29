import React, {Component} from "react";
import {loadData} from "../../actions/LoadData"
import {deleteData} from "../../actions/DeleteData";
import {updateData} from "../../actions/UpdateData";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import Button from "react-bootstrap/Button";
import NewItemModal from "../modals/NewItemModal";
import Toast from "react-bootstrap/Toast";

class WorksTable extends Component {
    constructor(props) {
        super(props);
        this.handleEmptyTable = this.handleEmptyTable.bind(this);
        this.handleBeforeSaveCell = this.handleBeforeSaveCell.bind(this);
        this.setLoadedData = this.setLoadedData.bind(this);
        this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this);

        this.rowObjectSelect = null;

        this.state = {
            loadedData: {
                works: [],
                masters: [],
                services: [],
                cars: [],
            },
            modalShow: false,
            toastSuccessShow: false,
            toastSuccessText: "",
            toastDangerShow: false,
            toastDangerText: "",
            isAdmin: localStorage.getItem("roles") === "ROLE_ADMIN"
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
            dataField: "date_work",
            text: "Date of work",
            sort: true,
            editable: this.state.isAdmin,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            },
            editor: {
                type: Type.DATE
            }
        }, {
            dataField: "master",
            text: "Master",
            sort: true,
            editable: this.state.isAdmin,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            },
            formatter: (cellContent, row) => (
                <select
                    required
                    className="custom-select"
                    defaultValue={row.master.id}
                    name="master"
                    onChange={(event) => this.handleSelector(event, row)}
                >
                    {this.state.loadedData.masters.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            )
        }, {
            dataField: "service",
            text: "Service",
            sort: true,
            editable: this.state.isAdmin,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            },
            formatter: (cellContent, row) => (
                <select
                    required
                    className="custom-select"
                    defaultValue={row.service.id}
                    name="service"
                    onChange={(event) => this.handleSelector(event, row)}
                >
                    {this.state.loadedData.services.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            )
        }, {
            dataField: "car",
            text: "Car",
            sort: true,
            editable: this.state.isAdmin,
            validator: this.validatorColumns,
            headerStyle: {
                outline: 'none'
            },
            formatter: (cellContent, row) => (
                <select
                    required
                    className="custom-select"
                    defaultValue={row.car.id}
                    name="car"
                    onChange={(event) => this.handleSelector(event, row)}
                >
                    {this.state.loadedData.cars.map((item) => (
                        <option key={item.id} value={item.id}>{item.num}</option>
                    ))}
                </select>
            )
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
            //onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
            beforeSaveCell: this.handleBeforeSaveCell,
            //afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!'); }
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
        await this.loadAllData();
    }

    async componentDidUpdate(prevProps) {
        this.rowObjectSelect = null;
    }

    loadAllData = async () => {
        try {
            const cars = await loadData("cars");
            const masters = await loadData("masters");
            const services = await loadData("services");
            const works = await loadData("works");
            this.setState({
                loadedData: {
                    works,
                    masters,
                    services,
                    cars
                }
            })
        } catch (e) {
            console.log(e);
        }
    }

    async setLoadedData(whichTable) {
        try {
            const data = await loadData(whichTable)
            const temp = this.state.loadedData;
            temp[whichTable] = data
            this.setState({
                loadedDataWork: temp
            });

        } catch (error) {
            console.log(error);
        }
    }

    handleEmptyTable() {
        return (<div>Table is Empty :(</div>);
    }

    handleBeforeSaveCell(oldValue, newValue, row, column, done) {
        let isValidEdit = false;
        if (newValue !== "") {
            updateData("works", row)
                .then(() => (
                    this.setState({
                        toastSuccessShow: true,
                        toastSuccessText: "Successful update Date of work!"
                    })
                ))
                .catch((error) => (
                    this.setState({
                        toastDangerShow: true,
                        toastDangerText: "Failed to update Date of Work! " + error
                    })
                ));
            isValidEdit = true;
        }
        setTimeout(() => {
            done(isValidEdit);
        }, 0);
        return {async: true};
    }

    async handleClickDeleteButton() {
        if (this.rowObjectSelect !== null) {
            await deleteData("works", this.rowObjectSelect.id).then()
                .catch(() => {
                    console.log("deleted");
                    this.setState({
                        toastSuccessShow: true,
                        toastSuccessText: "Successful delete!"
                    })
                });
            await this.setLoadedData("works");
        }
    }

    handleSelector = (event, row) => {
        const name = event.target.name;
        const updatedRow = {
            ...row,
            [name]: {
                id: event.target.value
            }
        }
        updateData("works", updatedRow)
            .then(() => (
                this.setState({
                    toastSuccessShow: true,
                    toastSuccessText: "Successful update " + name + "!"
                })
            )).catch((error) => (
                this.setState({
                    toastDangerShow: true,
                    toastDangerText: "Failed to update " + event.target.name + "! " + error
                })
        ));
    }

    handleButtonsView = () => {
        switch (localStorage.getItem("roles")) {
            case "ROLE_USER":
                return (
                    <Button variant="primary" onClick={() => this.setState({modalShow: true})}>New Item</Button>
                );
            case "ROLE_ADMIN":
                return (<div>
                    <Button variant="primary" onClick={() => this.setState({modalShow: true})}>New Item</Button>{" "}
                    <Button variant="danger" onClick={this.handleClickDeleteButton}>Delete</Button>
                </div>);
            default:
                return "";
        }
    }

    handleModal = (newWork) => {
        this.setState({
            modalShow: false
        })
        if (newWork) {
            this.state.loadedData.works.push(newWork);
            this.setState({
                loadedData: this.state.loadedData
            });
        }
    }

    render() {
        return (
            <div>
                <h1 className="h1 text-left">Works</h1>
                <BootstrapTable
                    bootstrap4
                    keyField='id'
                    data={this.state.loadedData.works}
                    columns={this.columns}
                    noDataIndication={this.handleEmptyTable}
                    bordered={false}
                    pagination={this.state.loadedData.works.length <= 10 ? null : this.pagination}
                    cellEdit={this.cellEdit}
                    selectRow={this.selectRow}
                    defaultSorted={[{dataField: "id", order: "asc"}]}
                    hover
                />
                {this.handleButtonsView()}

                <NewItemModal
                    show={this.state.modalShow}
                    onHide={this.handleModal}
                    whichTable="works"
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

export default WorksTable;