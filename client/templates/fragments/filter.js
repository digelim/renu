Template.filter.onRendered(function(){
  if (!Session.get("filter")) {
    Session.set("filter", "expenses");
  }
})

Template.filter.helpers({
  isActiveFilter: function(filter) {
    return active = Session.equals("filter", filter) ? "active" : "";
  }
});

Template.filter.events({
  'click .filter-type': function(e) {
    Session.set("filter", $(e.target).attr("data-filter"));
  }
})
