function deleteTeam(Abbreviation) {
  $.ajac({
    url: '/Team/' + Abbreviation,
    type: 'DELETE',
    success: function(result) {
      window.location.reload(true);
    }
  })
};
