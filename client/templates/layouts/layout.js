Template.layout.onRendered(function() {
    initLayout();

    var self = this;
    if (Meteor.userId()) {

        Meteor.call("updateHistory", function(err, res) {
            if (res) {
                this.updateCards = setInterval(function() {
                    Meteor.call("updateHistory");

                }, 60000)
            } else {
              clearInterval(this.updateCards);
            }
        });

    } else {
        //TODO check if user has opted in to get nuBank Data and go to login with nuBank page

        if (!Meteor.loggingIn()) {
            FlowRouter.go('login');
        }
    }



    Meteor.subscribe("cards");

    this.autorun(function() {

      self.subscribe("transactionTotals", Session.get("currentMonth"), Session.get("currentYear"), Session.get("filter"), Meteor.userId())

        if (!Meteor.userId()) {
            if (!Meteor.loggingIn()) {
                FlowRouter.go('login');
            }
        }

        self.subscribe("balance", Meteor.userId());
        self.subscribe("balanceMonth", Meteor.userId(), Session.get("currentMonth"), Session.get("currentYear"))
        self.subscribe("limit", Session.get("currentYear"), Session.get("currentMonth"), Meteor.userId())

    })

});

Template.layout.onDestroyed(function() {
    clearInterval(this.updateCards);
});



Template.registerHelper('isAndroid', function() {
    return navigator.userAgent.toLowerCase().indexOf("android") > -1;
});

Template.registerHelper('cards', function() {
    return Cards.find({
        type: Session.get("filter"),
        month: Session.get("currentMonth"),
        year: Session.get("currentYear"),
        author: Meteor.userId()
    }, {
        sort: {
            day: -1
        }
    });
});

Template.registerHelper('totals', function() {
    return clientReport.find();
});

Template.registerHelper('hasRevenue', function() {
    return Cards.find({type: "revenue", author: Meteor.userId()}).fetch().length > 0;
});

Template.registerHelper('isConnected', function() {
    return Meteor.status().connected;
})
