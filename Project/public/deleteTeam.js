function deleteTeam(ID_Team) {
  $.ajac({
    url: '/Team/' + ID_Team,
    type: 'DELETE',
    success: function(result) {
      window.location.reload(true);
    }
  })
};
