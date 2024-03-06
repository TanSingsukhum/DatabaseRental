function updatePaymentAmount() {
    var transactionId = document.getElementById("transactionIdSelect").value;
    var newPaymentAmount = document.getElementById("paymentAmount").value;

    if (transactionId === '' || newPaymentAmount === '' ) {
        alert("Please fill out all fields.");
        return; // Prevent form submission if any field is empty
    }

    $.ajax({
        url: '/update-transaction/' + encodeURIComponent(transactionId),
        type: 'PUT',
        data: { payment_amount: newPaymentAmount },
        success: function(result) {
            console.log(result)
            alert('Payment amount updated successfully.');
            location.reload();
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}
