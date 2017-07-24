
Template.settings.events({
  "click .logout-button": function(e) {
    myApp.closeModal();
    Meteor.logout();
  }
});
