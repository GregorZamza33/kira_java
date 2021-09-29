
export async function deleteData(tableName, id) {
    const responseWorks = await fetch('/api/works', {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
    let jsonWorks = await responseWorks.json();

    if (tableName !== "works") {
        let line = "";
        jsonWorks.forEach(object => {
            let objectField = object[tableName.slice(0, -1)];
            if (objectField.id === id) {
                if (tableName === "cars") {
                    line = "Car Number: " + objectField.num;
                }
                if (tableName === "masters") {
                    line = "Master Name: " + objectField.name;
                }
                if (tableName === "services") {
                    line = "Service: " + objectField.name;
                }
            }
        });
        if (line.length !== 0) {
            alert("First delete Work with " +  line);
            return;
        }
    }

    const response = await fetch('/api/' + tableName + '/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });
    return await response.json();
}