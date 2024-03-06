function updateReview() {
    var reviewId = document.getElementById("reviewIdSelect").value;
    var newRating = document.getElementById("inputRating").value;
    var newComment = document.getElementById("inputComment").value;


    if (reviewId === '' || newRating === '' || newComment === '' ) {
        alert("Please fill out all fields.");
        return; // Prevent form submission if any field is empty
    }
    if(newRating < 0 || newRating > 5){
        alert("Rating must be between 0-5")
        return;
    }
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
