function deleteBuilding(buildingID){
    var link = '/delete-building/';
    link += buildingID
    $.ajax({
        url: link,
        type: 'DELETE',
        success: function(result){
            deleteRow(buildingID);
            location.reload();
        }
    });
};


function deleteRow(buildingID){
    var table = document.getElementById("buildings-table");
    for (var i=0, row; row=table.rows[i]; i++) {
        if(table.rows[i].getAttribute("data-value") == buildingID){
            table.deleteRow(i);
            break;
        }
    }
}