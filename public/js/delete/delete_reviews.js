function deleteReviews(reviewID){
    var link = '/delete-reviews/';
    link += reviewID
    $.ajax({
        url: link,
        type: 'DELETE',
        success: function(result){
            deleteRow(reviewID);
            location.reload();
        }
    });
};


function deleteRow(reviewID){
    var table = document.getElementById("reviews-table");
    for (var i=0, row; row=table.rows[i]; i++) {
        if(table.rows[i].getAttribute("data-value") == reviewID){
            table.deleteRow(i);
            break;
        }
    }
}