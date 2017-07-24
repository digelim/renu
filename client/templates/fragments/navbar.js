Template.navbar.helpers({
  isHome: function(){
    return Session.equals("currentRoute", "home")
  },
  isAdd: function() {
    return Session.equals("currentRoute", "add") || Session.equals("currentRoute", "modify") 
  },
  isModify: function() {
    return Session.equals("currentRoute", "modify");
  },
  transaction: function() {
    if (Session.equals("addType", "revenue")) {
      return "receita"
    }
    if (Session.equals("addType", "expenses")) {
      return "despesa"
    }

  }
});

Template.navbar.events({
  'click .open-panel': function(){
    myApp.openPanel("left");
  },
  'click .back': function() {
    window.history.back();
  }
})
