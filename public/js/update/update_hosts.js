function updateBuildingsOwned() {
    var hostID = document.getElementById("hostIDSelect").value;
    var numberOfBuildings = document.getElementById("buildingsOwned").value;
    
    if (hostID === '' || numberOfBuildings === '' ) {
        alert("Please fill out all fields.");
        return; // Prevent form submission if any field is empty
    }

    $.ajax({
        url: '/update-hosts/' + encodeURIComponent(hostID),
        type: 'PUT',
        data: { number_buildings_owned: numberOfBuildings },
        success: function(result) {
            console.log(result)
            alert('Buildings owned updated successfully.');
            location.reload();
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}