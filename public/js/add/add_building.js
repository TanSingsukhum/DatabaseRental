let addClientBuilding = document.getElementById('add-building-form')

addClientBuilding.addEventListener("submit", function(e){
    e.preventDefault();

    let inputHostID = document.getElementById("input-hostID").value;
    let inputBedroom = document.getElementById("input-bedroom").value;
    let inputBathroom = document.getElementById("input-bathroom").value;
    let inputAmount = document.getElementById("input-rent").value;
    let inputClient = document.getElementById("input-client").value;
    let inputState = document.getElementById("input-state").value;
    let inputCity = document.getElementById("input-city").value;
    let inputAddress = document.getElementById("input-address").value;
    let inputZipcode = document.getElementById("input-zipcode").value;

    let data = {
        hostID: inputHostID,
        bedroomNumber: inputBedroom,
        bathroomNumber: inputBathroom,
        rentAmount: inputAmount,
        clientNumber: inputClient,
        state: inputState,
        city: inputCity,
        address: inputAddress,
        zipcode: inputZipcode
    }

    if (inputHostID === '' || inputZipcode === '' || inputAddress === '' || inputClient === '' || inputState === '' || inputCity === '' || inputBedroom === '' || inputBathroom === '' || inputAmount === '') {
        alert("Please fill out all fields.");
        return; // Prevent form submission if any field is empty
    }
    //AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-building-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    //Resolve AJAX
    xhttp.onreadystatechange = () =>{
        if (xhttp.readyState == 4 && xhttp.status == 200){
            addRowToTable(xhttp.response);

            // clear input fields

            document.getElementById("input-hostID").value = '';
            document.getElementById("input-bedroom").value = '';
            document.getElementById("input-bathroom").value = '';
            document.getElementById("input-rent").value = '';
            document.getElementById("input-client").value = '';
            document.getElementById("input-state").value = '';
            document.getElementById("input-city").value = '';
            document.getElementById("input-address").value = '';
            document.getElementById("input-zipcode").value = '';
            alert("Data successfully added!");
        }else if (xhttp.status == 500){
            alert("Host ID does not exist!");
        };
    };

    //Send data
    xhttp.send(JSON.stringify(data));
});

addRowToTable = (data) => {
    let currentTable = document.getElementById("buildings-table");

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("TR");

    let hostIDCell = document.createElement("TD");
    hostIDCell.textContent = newRow.hostID;
    row.appendChild(hostIDCell)

    /*
           hostID: inputHostID,
        bedroomNumber: inputBedroom,
        bathroomNumber: inputBathroom,
        rentAmount: inputAmount,
        clientNumber: inputClient,
        state: inputState,
        city: inputCity,
        address: inputAddress,
        zipcode: inputZipcode 
    */

    let bedroomCell = document.createElement("TD");
    bedroomCell.textContent = newRow.bedroomNumber
    row.appendChild(bedroomCell)

    let bathroomCell = document.createElement("TD");
    bathroomCell.textContent = newRow.bathroomNumber;
    row.appendChild(bathroomCell);

    let rentAmountCell = document.createElement("TD");
    rentAmountCell.textContent = newRow.rentAmount;
    row.appendChild(rentAmountCell);

    let clientsCell = document.createElement("TD");
    clientsCell.textContent = newRow.clientNumber;
    row.appendChild(clientsCell);

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

    currentTable.appendChild(row);
}