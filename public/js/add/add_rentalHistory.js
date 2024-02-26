let addRentalHistoryForm = document.getElementById('add-rentalHistory-form');

addRentalHistoryForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputClientID = document.getElementById("input-clientID").value;
    let inputBuildingID = document.getElementById("input-buildingID").value;
    let inputLeaseStart = document.getElementById("input-leaseStart").value;
    let inputLeaseEnd = document.getElementById("input-leaseEnd").value;

    let data = {
        clientID: inputClientID,
        buildingID: inputBuildingID,
        leaseStartDate: inputLeaseStart,
        leaseEndDate: inputLeaseEnd
    };

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-rentalHistory-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Resolve AJAX
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                addRowToTable(xhttp.response);

                // Clear input fields
                document.getElementById("input-clientID").value = '';
                document.getElementById("input-buildingID").value = '';
                document.getElementById("input-leaseStart").value = '';
                document.getElementById("input-leaseEnd").value = '';
                alert("Data successfully added!");
            } else if (xhttp.status == 500) {
                alert("Building ID or Client ID does not exist!");
            }
        }
    };

    // Send data with the request
    xhttp.send(JSON.stringify(data));
});

function addRowToTable(data) {
    let currentTable = document.getElementById("rentalHistory-table");
    let newRowData = JSON.parse(data);

    // Create row
    let row = document.createElement("tr");

    let rentalIDCell = document.createElement("td");
    rentalIDCell.textContent = newRowData.rental_id;
    row.appendChild(rentalIDCell);

    let clientIDCell = document.createElement("td");
    clientIDCell.textContent = newRowData.client_id;
    row.appendChild(clientIDCell);

    let buildingIDCell = document.createElement("td");
    buildingIDCell.textContent = newRowData.building_id;
    row.appendChild(buildingIDCell);

    let leaseStartDateCell = document.createElement("td");
    leaseStartDateCell.textContent = newRowData.lease_start_date;
    row.appendChild(leaseStartDateCell);

    let leaseEndDateCell = document.createElement("td");
    leaseEndDateCell.textContent = newRowData.lease_end_date;
    row.appendChild(leaseEndDateCell);

    // Append the row to the table
    currentTable.appendChild(row);
}
