function deleteCoach(ID_Coach) {
    $.ajax({
        url: '/' + ID_Coach,
        type: 'DELETE',
        success: function (result) {
            window.location.reload(true);
        }
    });
}
