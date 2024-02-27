function updateClientPhoneNumber() {
    var clientName = document.getElementById("clientNameSelect").value;
    var newPhoneNumber = document.getElementById("clientPhoneNumber").value;
    
    $.ajax({
        url: '/update-client/' + encodeURIComponent(clientName),
        type: 'PUT',
        data: { phone_number: newPhoneNumber },
        success: function(result) {
            // Handle success (e.g., show a success message)
            console.log(result)
            alert('Phone number updated successfully.');
            location.reload();
        },
        error: function(xhr, status, error) {
            // Handle error (e.g., show an error message)
            console.error(error);
        }
    });
}

