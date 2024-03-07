function deleteHosts(hostID){
    //Ajax call
    var link = '/delete-hosts/';
    link += hostID
    $.ajax({
        url: link,
        type: 'DELETE',
        success: function(result){
            deleteRow(hostID);
            location.reload();
        }
    });
};

//delete row
function deleteRow(hostID){
    var table = document.getElementById("hosts-table");
    for (var i=0, row; row=table.rows[i]; i++) {
        if(table.rows[i].getAttribute("data-value") == hostID){
            table.deleteRow(i);
            break;
        }
    }
}