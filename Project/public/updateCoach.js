function updateCoach(cid){
    $.ajax({
        url: '/UpdateCoach/' + cid,
        type: 'PUT',
        data: $('UpdateCoach').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
