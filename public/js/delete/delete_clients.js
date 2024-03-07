function deleteClients(clientID){
    //Ajax call
    var link = '/delete-clients/';
    link += clientID
    $.ajax({
        url: link,
        type: 'DELETE',
        success: function(result){
            deleteRow(clientID);
            location.reload();
        }
    });
};

//Delete Row
function deleteRow(clientID){
    var table = document.getElementById("client-table");
    for (var i=0, row; row=table.rows[i]; i++) {
        if(table.rows[i].getAttribute("data-value") == clientID){
            table.deleteRow(i);
            break;
        }
    }
}