function updateLeaseEndDate() {
    var rentalId = document.getElementById("rentalIdSelect").value;
    var newLeaseEndDate = document.getElementById("newLeaseEndDate").value;
    
    if (rentalId === '' || newLeaseEndDate === '' ) {
        alert("Please fill out all fields.");
        return; // Prevent form submission if any field is empty
    }
    //AJAX PUT statement
    $.ajax({
        url: '/update-rental-history/' + encodeURIComponent(rentalId),
        type: 'PUT',
        data: { lease_end_date: newLeaseEndDate },
        success: function(result) {
            console.log(result);
            alert('Lease end date updated successfully.');
            location.reload();
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}
