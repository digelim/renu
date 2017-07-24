Template.plainLayout.onRendered(function() {
    initLayout();

    this.autorun(function() {

if (Meteor.userId() && (Session.equals("currentRoute", "login") || Session.equals("currentRoute", "nubank"))) {
    FlowRouter.go('start');
}
    });

});
