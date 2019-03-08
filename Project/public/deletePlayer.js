function deletePlayer(ID_Player) {
  $.ajax({
    url: '/Player/' + ID_Player,
    type: 'DELETE',
    success: function(result){
      window.location.reload(true);
    }
  })
};
