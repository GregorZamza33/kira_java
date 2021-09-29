
const fields = {
    cars: "num",
    masters: "name",
    services: "name",
};

export async function addData(whitchTable, data) {
    const tableData = await fetch("/api/" + whitchTable, {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });

    const jsonTableData = await tableData.json();

    if (whitchTable !== "works") {
        let alreadyExists = false;
        jsonTableData.map((item) => {
            if (item[fields[whitchTable]] === data[fields[whitchTable]]) {
                alreadyExists = true;
            }
        });

        if (alreadyExists) {
            alert("Record with " + whitchTable + " " + fields[whitchTable] + ": " + data[fields[whitchTable]] + " already exists. Record don't will be added.");
            return null;
        }
    } else if (whitchTable === "works") {
        let alreadyExists = false;
        jsonTableData.map((item) => {
            if ((item.date_work === data.date_work)
                && (item.car.id === data.car.id)
                && (item.master.id === data.master.id)
                && (item.service.id === data.service.id)) {
                alreadyExists = true;
            }
        });

        if (alreadyExists) {
            alert("Record with this work already exists. Record don't will be added.");
            return null;
        }
    }

    const response = await fetch('/api/' + whitchTable, {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });
    console.log(response.status);
    return await response.json();
}
