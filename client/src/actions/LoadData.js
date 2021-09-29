
export async function loadData(tableName) {
    const response = await fetch('/api/' + tableName, {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
    return await response.json();
}