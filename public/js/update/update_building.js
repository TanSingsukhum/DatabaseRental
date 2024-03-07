function updateBuildingRent() {
    var buildingId = document.getElementById('building-select').value;
    var newRent = document.getElementById('new-rent').value;

    if (newRent === '' || buildingId === '' ) {
        alert("Please fill out all fields.");
        return; // Prevent form submission if any field is empty
    }

    //AJAX PUT statement
    var link = '/update-building/' + buildingId;
    $.ajax({
        url: link,
        type: 'PUT',
        data: { rent_amount: newRent },
        success: function(result) {
            alert('Rent amount updated successfully.');
            location.reload();
        },
        error: function(xhr, status, error) {
            console.error('Error updating rent amount:', error);
        }
    });
}
