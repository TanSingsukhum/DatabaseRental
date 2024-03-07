let addTransactionForm = document.getElementById('add-transaction-form');

addTransactionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    //get data
    let inputRentalID = document.getElementById("input-rentalID").value;
    let inputPaymentMethod = document.getElementById("input-paymentMethod").value;
    let inputPaymentAmount = document.getElementById("input-paymentAmount").value;
    let inputDatePaid = document.getElementById("input-datePaid").value;


    if (inputRentalID === '' || inputPaymentAmount === '' || inputPaymentMethod === '' || inputDatePaid === '') {
        alert("Please fill out all fields.");
        return; // Prevent form submission if any field is empty
    }
    
    //package data
    let data = {
        rentalID: inputRentalID,
        paymentMethod: inputPaymentMethod,
        paymentAmount: inputPaymentAmount,
        datePaid: inputDatePaid
    };

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-transaction-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Resolve AJAX
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                addRowToTable(xhttp.response);

                // Clear input fields
                document.getElementById("input-rentalID").value = '';
                document.getElementById("input-paymentMethod").value = '';
                document.getElementById("input-paymentAmount").value = '';
                document.getElementById("input-datePaid").value = '';
                alert("Data successfully added!");
            } else if (xhttp.status == 500) {
                alert("Error adding transaction! (Rental ID doesn't exist)");
            }
        }
    };

    // Send data with the request
    xhttp.send(JSON.stringify(data));
});

function addRowToTable(data) {
    let currentTable = document.getElementById("transactions-table");
    let newRowData = JSON.parse(data);

    // Create row
    let row = document.createElement("tr");

    let transactionIDCell = document.createElement("td");
    transactionIDCell.textContent = newRowData.transaction_id;
    row.appendChild(transactionIDCell);

    let rentalIDCell = document.createElement("td");
    rentalIDCell.textContent = newRowData.rental_id;
    row.appendChild(rentalIDCell);

    let paymentMethodCell = document.createElement("td");
    paymentMethodCell.textContent = newRowData.payment_method;
    row.appendChild(paymentMethodCell);

    let paymentAmountCell = document.createElement("td");
    paymentAmountCell.textContent = newRowData.payment_amount;
    row.appendChild(paymentAmountCell);

    let datePaidCell = document.createElement("td");
    datePaidCell.textContent = newRowData.date_paid;
    row.appendChild(datePaidCell);

    // Append the row to the table
    currentTable.appendChild(row);
}
