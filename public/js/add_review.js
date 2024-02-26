let addReviewForm = document.getElementById('add-review-form');

addReviewForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputClientID = document.getElementById("input-clientID").value;
    let inputBuildingID = document.getElementById("input-buildingID").value;
    let inputRating = document.getElementById("input-rating").value;
    let inputComment = document.getElementById("input-comment").value;

    let data = {
        clientID: inputClientID,
        buildingID: inputBuildingID,
        rating: inputRating,
        comment: inputComment
    };

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-review-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Resolve AJAX
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                addRowToTable(xhttp.response);

                // Clear input fields
                document.getElementById("input-clientID").value = '';
                document.getElementById("input-buildingID").value = '';
                document.getElementById("input-rating").value = '';
                document.getElementById("input-comment").value = '';
                alert("Data successfully added!");
            } else if (xhttp.status == 500) {
                alert("Error adding review! (ClientID or BuildingID does not exist)");
            }
        }
    };

    // Send data with the request
    xhttp.send(JSON.stringify(data));
});

function addRowToTable(data) {
    let currentTable = document.getElementById("reviews-table");
    let newRowData = JSON.parse(data);

    // Create row
    let row = document.createElement("tr");

    let reviewIDCell = document.createElement("td");
    reviewIDCell.textContent = newRowData.review_id;
    row.appendChild(reviewIDCell);

    let clientIDCell = document.createElement("td");
    clientIDCell.textContent = newRowData.client_id;
    row.appendChild(clientIDCell);

    let buildingIDCell = document.createElement("td");
    buildingIDCell.textContent = newRowData.building_id;
    row.appendChild(buildingIDCell);

    let ratingCell = document.createElement("td");
    ratingCell.textContent = newRowData.rating;
    row.appendChild(ratingCell);

    let commentCell = document.createElement("td");
    commentCell.textContent = newRowData.comment;
    row.appendChild(commentCell);

    // Append the row to the table
    currentTable.appendChild(row);
}
