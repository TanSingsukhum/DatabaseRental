let addClientForm = document.getElementById('add-client-form');

addClientForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputBuildingID = document.getElementById("input-buildingID").value;
    let inputPhoneNumber = document.getElementById("input-phoneNumber").value;
    let inputName = document.getElementById("input-name").value;
    let inputEmail = document.getElementById("input-email").value;
    let inputState = document.getElementById("input-state").value;
    let inputCity = document.getElementById("input-city").value;
    let inputAddress = document.getElementById("input-address").value;
    let inputZipcode = document.getElementById("input-zipcode").value;
    
    let data = {
        buildingID: inputBuildingID,
        phoneNumber: inputPhoneNumber,
        clientName: inputName,
        clientEmail: inputEmail,
        state: inputState,
        city: inputCity,
        address: inputAddress,
        zipcode: inputZipcode
    };

    if (inputBuildingID === '' || inputEmail === '' || inputState === '' || inputPhoneNumber === '' || inputName === '' || inputAddress === '' || inputZipcode === '') {
        alert("Please fill out all fields.");
        return; // Prevent form submission if any field is empty
    }


    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-client-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Resolve AJAX
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowToTable(xhttp.response);
            // Clear input fields
            document.getElementById("input-buildingID").value = '';
            document.getElementById("input-phoneNumber").value = '';
            document.getElementById("input-name").value = '';
            document.getElementById("input-email").value = '';
            document.getElementById("input-state").value = '';
            document.getElementById("input-city").value = '';
            document.getElementById("input-address").value = '';
            document.getElementById("input-zipcode").value = '';
            alert("Data successfully added!");
        }else if (xhttp.status == 500) {
            // Display an alert for invalid building ID
            alert("Building ID does not exist!");
        }
    };

    // Send data with the request
    xhttp.send(JSON.stringify(data));
});
addRowToTable = (data) => {
    let currentTable = document.getElementById("client-table");

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    // Create row
    let row = document.createElement("TR");
    
    let clientIDCell = document.createElement("TD");
    clientIDCell.textContent = newRow.clientID; 
    row.appendChild(clientIDCell);

    let buildingIDCell = document.createElement("TD");
    buildingIDCell.textContent = newRow.buildingID; 
    row.appendChild(buildingIDCell);

    let phoneNumberCell = document.createElement("TD");
    phoneNumberCell.textContent = newRow.phoneNumber;
    row.appendChild(phoneNumberCell);

    let nameCell = document.createElement("TD");
    nameCell.textContent = newRow.clientName; 
    row.appendChild(nameCell);

    let emailCell = document.createElement("TD");
    emailCell.textContent = newRow.clientEmail; 
    row.appendChild(emailCell);

    let stateCell = document.createElement("TD");
    stateCell.textContent = newRow.state;
    row.appendChild(stateCell);

    let cityCell = document.createElement("TD");
    cityCell.textContent = newRow.city; 
    row.appendChild(cityCell);

    let addressCell = document.createElement("TD");
    addressCell.textContent = newRow.address; 
    row.appendChild(addressCell);

    let zipcodeCell = document.createElement("TD");
    zipcodeCell.textContent = newRow.zipcode; 
    row.appendChild(zipcodeCell);

    // Append the row to the table
    currentTable.appendChild(row);
}
