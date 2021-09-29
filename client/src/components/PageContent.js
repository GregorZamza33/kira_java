import React, {Component} from "react";
import CarsTable from "./tables/CarsTable";
import Table from "./Table";
import MastersTable from "./tables/MastersTable";
import ServicesTable from "./tables/ServicesTable";
import WorksTable from "./tables/WorksTable";

const tables = {
    cars: (<CarsTable/>),
    masters: (<MastersTable/>),
    services: (<ServicesTable/>),
    works: (<WorksTable/>)
}

class PageContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {/*<Table whichTable={this.props.whichContent}/>*/}
                {tables[this.props.whichContent]}
            </div>
        );
    }
}

export default PageContent;