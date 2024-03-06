function updateClientPhoneNumber() {
    var clientName = document.getElementById("clientNameSelect").value;
    var newPhoneNumber = document.getElementById("clientPhoneNumber").value;

    if (clientName === '' || newPhoneNumber === '' ) {
        alert("Please fill out all fields.");
        return; // Prevent form submission if any field is empty
    }

    $.ajax({
        url: '/update-client/' + encodeURIComponent(clientName),
        type: 'PUT',
        data: { phone_number: newPhoneNumber },
        success: function(result) {
            console.log(result)
            alert('Phone number updated successfully.');
            location.reload();
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}

