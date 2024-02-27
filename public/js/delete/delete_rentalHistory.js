function deleteRentalHistory(rentalID){
    var link = '/delete-rentalHistory/';
    link += rentalID
    $.ajax({
        url: link,
        type: 'DELETE',
        success: function(result){
            deleteRow(rentalID);
            location.reload();
        }
    });
};


function deleteRow(rentalID){
    var table = document.getElementById("rentalHistory-table");
    for (var i=0, row; row=table.rows[i]; i++) {
        if(table.rows[i].getAttribute("data-value") == rentalID){
            table.deleteRow(i);
            break;
        }
    }
}