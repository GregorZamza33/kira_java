import React, {Component} from "react";
import {loadData} from "../actions/LoadData"
import {deleteData} from "../actions/DeleteData";
import {updateData} from "../actions/UpdateData";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import cellEditFactory from 'react-bootstrap-table2-editor';
import Button from "react-bootstrap/Button";
import NewItemModal from "./modals/NewItemModal";

const tables = {
    cars: [{dataField: "color", name: "Color"}, {dataField: "_foreign", name: "Foreign"}, {dataField: "mark", name: "Mark"}, {dataField: "num", name: "Number"}],
    masters: [{dataField: "name", name: "Name"}],
    services: [{dataField: "name", name: "Name"}, {dataField: "cost_foreign", name: "Cost for foreign"}, {dataField: "cost_our", name: "Cost for our"}],
    works: [{dataField: "date_work", name: "Date of work"}, {dataField: "master", name: "Master"}, {dataField: "service", name: "Service"}, {dataField: "car", name: "Car"}]
}

class Table extends Component {
    constructor(props) {
        super(props);
        this.handleEmptyTable = this.handleEmptyTable.bind(this);
        this.validatorColumns = this.validatorColumns.bind(this);
        this.handleBeforeSaveCell = this.handleBeforeSaveCell.bind(this);
        this.setLoadedData = this.setLoadedData.bind(this);
        this.insertColumnsInTable = this.insertColumnsInTable.bind(this);
        this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this);

        this.rowObjectSelect = null;

        this.state = {
            loadedData: [],
            modalShow: false
        }

        this.columns = [{
            dataField: 'id',
            text: 'ID',
            sort: true,
            headerStyle: {
                outline: 'none',
                width: '10%'
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
        await this.setLoadedData(this.props.whichTable);
    }

    async componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            await this.setLoadedData(this.props.whichTable);
        }
        this.rowObjectSelect = null;
    }

    async setLoadedData(whichTable) {
        try {
            const data = [];
            await loadData(whichTable).then(array => {
                array.forEach(object => {
                    data.push(object);
                 });
            });
            this.insertColumnsInTable();
            if (whichTable === "works") {
                //меняем поля-объекты на определенные поля этих объектов
                const workData = [];
                data.map(item => (
                    workData.push({
                        id: item.id,
                        date_work: item.date_work,
                        car: item.car.num,
                        master: item.master.name,
                        service: item.service.name
                    })
                ));
                this.setState({
                    loadedData: workData
                });
            } else {
                this.setState({
                    loadedData: data
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    insertColumnsInTable() {
        this.columns = this.columns.slice(0, 1);
        this.initColumns(tables[this.props.whichTable]);
    }

    initColumns = (columnsArray) => {
        columnsArray.forEach(item => {
            this.columns.push({
                dataField: item.dataField,
                text: item.name,
                sort: true,
                editable: this.props.whichTable !== "works",
                validator: this.validatorColumns,
                headerStyle: {
                    outline: 'none'
                }
            });
        });
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
        var isValidEdit = false;
        switch (this.props.whichTable) {
            case "cars":
                if (this.checkValidCarsTableEdit(newValue, column.dataField)) {
                    row[column.dataField] = newValue;
                    updateData(this.props.whichTable, {
                        id: row.id,
                        num: row.num,
                        color: row.color,
                        mark: row.mark,
                        is_foreign: row._foreign
                    });
                    isValidEdit = true;
                }
                break;
            case "masters":
                if (this.checkValidMastersTableEdit(newValue, column.dataField)) {
                    row[column.dataField] = newValue;
                    updateData(this.props.whichTable, {
                        id: row.id,
                        name: row.name
                    });
                    isValidEdit = true;
                }
                break;
            case "services":
                if (this.checkValidServicesTableEdit(newValue, column.dataField)) {
                    row[column.dataField] = newValue;
                    updateData(this.props.whichTable, {
                        id: row.id,
                        name: row.name,
                        cost_our: row.cost_our,
                        cost_foreign: row.cost_foreign
                    });
                    isValidEdit = true;
                }
                break;
        }
        setTimeout(() => {
            done(isValidEdit);
        }, 0);
        return {async: true};
    }

    checkValidCarsTableEdit = (newValue, dataField) => {
        switch (dataField) {
            case "color":
                return (/^[#]?[a-zA-Zа-яА-Я0-9\s]{1,40}/.test(newValue));
            case "mark":
                return (/^[a-zA-Zа-яА-Я0-9\s]{1,40}/.test(newValue));
            case "num":
                return (/^[a-zA-Z0-9-]{1,40}/.test(newValue));
            case "_foreign":
                return (/(true|false)/.test(newValue));
            default:
                return false;
        }
    }

    checkValidMastersTableEdit = (newValue, dataField) => {
        switch (dataField) {
            case "name":
                return (/^[a-zA-Zа-яА-Я]{1,20}[\s]?[a-zA-Zа-яА-Я]{1,20}/.test(newValue));
            default:
                return false;
        }
    }

    checkValidServicesTableEdit = (newValue, dataField) => {
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
            await deleteData(this.props.whichTable, this.rowObjectSelect.id).then()
                .catch(() => console.log("deleted"));
            await this.setLoadedData(this.props.whichTable);
        }
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: 'left'}}>{this.props.whichTable}</h1>
                <BootstrapTable
                    bootstrap4
                    keyField='id'
                    data={ this.state.loadedData }
                    columns={ this.columns }
                    noDataIndication={this.handleEmptyTable}
                    bordered={false}
                    pagination={this.state.loadedData.length <= 10 ? null : this.pagination}
                    cellEdit={this.cellEdit}
                    selectRow={this.selectRow}
                    hover
                />
                <Button variant="primary" onClick={() => this.setState({modalShow: true})}>New Item</Button>{' '}
                <Button variant="danger" onClick={this.handleClickDeleteButton}>Delete</Button>

                <NewItemModal
                    show={this.state.modalShow}
                    onHide={() => this.setState({modalShow: false})}
                    whichTable={this.props.whichTable}
                />
            </div>
        );
    }
}

export default Table;