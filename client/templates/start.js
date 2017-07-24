


Template.start.onRendered(function(){
  initLayout();
  Meteor.subscribe("transactionTotals")

});

Template.start.events({
  'click #open-overlay': function() {
    var overlay = $(".overlay");
    overlay.toggleClass("open");
  },

  'click a.toggle.bg-add': function(e){
    $(".speed-dial").toggleClass("active");
    if ($(".speed-dial").hasClass("active")) {
      $(".dials").show();
    } else {
      setTimeout(function(){
         $(".dials").hide();
      }, 400);

    }
  },
  'click a.bg-expenses': function() {
    Session.set("addType", "expenses");
    FlowRouter.go("add");
  },
  'click a.bg-revenue': function() {
    Session.set("addType", "revenue");
    FlowRouter.go("add");
  },
  'click .card': function(e) {
    Session.set("itemId", $(e.target).closest(".card").attr("data-id"));
    FlowRouter.go("modify");
  }
})

Template.start.helpers({
  hasData: function() {
    return Cards.find({month: Session.get("currentMonth"), year: Session.get("currentYear"), type: Session.get("filter")}).fetch().length > 0
  },
  isRevenue: function() {
    return Session.equals("filter", "revenue")
  }
})
