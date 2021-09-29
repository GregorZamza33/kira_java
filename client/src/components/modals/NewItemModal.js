import React from "react";
import Modal from "react-bootstrap/Modal";

import FormCarsTable from "../forms/FormCarsTable";
import FormMastersTable from "../forms/FormMastersTable";
import FormServicesTable from "../forms/FormServicesTable";
import FormWorksTable from "../forms/FormWorksTable";

function NewItemModal(props) {
    const {whichTable, ...rest} = props;

    const formFor = {
        cars: (<FormCarsTable onHide={props.onHide} whichTable={whichTable}/>),
        masters: (<FormMastersTable onHide={props.onHide} whichTable={whichTable}/>),
        services: (<FormServicesTable onHide={props.onHide} whichTable={whichTable}/>),
        works: (<FormWorksTable onHide={props.onHide} whitchTable={whichTable}/>)
    };

    return (
        <Modal
            {...rest}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Create new {whichTable.slice(0,-1)}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {formFor[whichTable]}
            </Modal.Body>
        </Modal>
    );
}

export default NewItemModal;