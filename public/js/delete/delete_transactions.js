function deleteTransaction(transactionID){
    //Ajax call
    var link = '/delete-transaction/';
    link += transactionID
    $.ajax({
        url: link,
        type: 'DELETE',
        success: function(result){
            deleteRow(transactionID);
            location.reload();
        }
    });
};

//Delete Row
function deleteRow(transactionID){
    var table = document.getElementById("transactions-table");
    for (var i=0, row; row=table.rows[i]; i++) {
        if(table.rows[i].getAttribute("data-value") == transactionID){
            table.deleteRow(i);
            break;
        }
    }
}