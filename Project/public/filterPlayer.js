function filterPlayerByTeam() {
    //get the id of the selected homeworld from the filter dropdown
    var Team_id = document.getElementById('Team_filter').value
    //construct the URL and redirect to it
    window.location = '/people/filter/' + encodeURI(Team_id)
}