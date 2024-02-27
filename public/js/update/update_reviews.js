function updateReview() {
    var reviewId = document.getElementById("reviewIdSelect").value;
    var newRating = document.getElementById("inputRating").value;
    var newComment = document.getElementById("inputComment").value;

    console.log(newRating)
    if (!newRating) {
        console.error("Rating is empty");
        return;
        
    }

    if (!newComment) {
        console.error("Comment is empty");
        return;
    
    }
    $.ajax({
        url: '/update-review/' + encodeURIComponent(reviewId),
        type: 'PUT',
        data: {
            rating: newRating,
            comment: newComment
        },
        success: function(result) {
            console.log(result)
            alert('Review updated successfully.');
            location.reload();
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}
