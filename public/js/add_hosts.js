let addHostForm = document.getElementById('add-host-form');

addHostForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputName = document.getElementById("input-name").value;
    let inputEmail = document.getElementById("input-email").value;
    let inputPhoneNumber = document.getElementById("input-phoneNumber").value;
    let inputNumberBuildings = document.getElementById("input-numberBuildings").value;

    let data = {
        hostName: inputName,
        hostEmail: inputEmail,
        hostPhoneNumber: inputPhoneNumber,
        numberBuildingsOwned: inputNumberBuildings
    };

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-host-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Resolve AJAX
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowToTable(xhttp.response);

            // Clear input fields
            document.getElementById("input-name").value = '';
            document.getElementById("input-email").value = '';
            document.getElementById("input-phoneNumber").value = '';
            document.getElementById("input-numberBuildings").value = '';
        }
    };

    // Send data with the request
    xhttp.send(JSON.stringify(data));
});

addRowToTable = (data) => {
    let currentTable = document.getElementById("hosts-table");

    let newRowData = JSON.parse(data);

    // Create row
    let row = document.createElement("TR");
    
    let hostIDCell = document.createElement("TD");
    hostIDCell.textContent = newRowData.host_id;
    row.appendChild(hostIDCell);

    let nameCell = document.createElement("TD");
    nameCell.textContent = newRowData.host_name;
    row.appendChild(nameCell);

    let emailCell = document.createElement("TD");
    emailCell.textContent = newRowData.host_email;
    row.appendChild(emailCell);

    let phoneNumberCell = document.createElement("TD");
    phoneNumberCell.textContent = newRowData.host_phone_number;
    row.appendChild(phoneNumberCell);

    let numberBuildingsCell = document.createElement("TD");
    numberBuildingsCell.textContent = newRowData.number_buildings_owned;
    row.appendChild(numberBuildingsCell);

    // Append the row to the table
    currentTable.appendChild(row);
}
