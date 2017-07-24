
FlowRouter.route('/', {
    name: 'start',
    onBack: function (details, origin) {
      if ($$('body').hasClass('with-panel-left-reveal')) {
        myApp.closePanel();
      } else if ($(".speed-dial").hasClass("active")) {
        $(".speed-dial").removeClass("active");
        $(".overlay-scale").removeClass("open");
      }

      myApp.closeModal();
    },
    action: function() {
      Session.set("currentRoute", "home");
      BlazeLayout.render('layout', { main: 'start' });
    }
});

FlowRouter.route('/statistics', {
    name: 'statistics',
    onBack: function (details, origin) {
      if ($$('body').hasClass('with-panel-left-reveal')) {
        myApp.closePanel();
      } else if (swiper.activeIndex === 1) {
        swiper.slidePrev();
      } else if (!$(".popup-settings").is(":visible")) {
        history.back();
      }

    },
    action: function() {
      Session.set("currentRoute", "statistics");
      BlazeLayout.render('layout', { main: FlowRouter.current().route.options.name });
    }
});

FlowRouter.route('/add', {
    name: 'add',
    onBack: function (details, origin) {


      if (!$(".smart-select-popup").is(":visible") && !$(".modal").is(":visible")) {
        history.back();
      }

        myApp.closeModal();


    },
    action: function() {
      Session.set("currentRoute", "add");
      BlazeLayout.render('layout', { main: FlowRouter.current().route.options.name });
    }
});

FlowRouter.route('/modify', {
    name: 'modify',
    onBack: function (details, origin) {


      if (!$(".smart-select-popup").is(":visible") && !$(".modal").is(":visible")) {
        history.back();
      }

        myApp.closeModal();


    },
    action: function() {
      Session.set("currentRoute", "modify");
      BlazeLayout.render('layout', { main: FlowRouter.current().route.options.name });
    }
});

FlowRouter.route('/nubank', {
    name: 'nubank',
    onBack: function (details, origin) {
      history.back();
    },
    action: function() {
      Session.set("currentRoute", "nubank");
      BlazeLayout.render('plainLayout', { main: FlowRouter.current().route.options.name });
    }
});

FlowRouter.route('/login', {
    name: 'login',
    onBack: function (details, origin) {
      if ($(".login-form").hasClass("step-two")) {
        $(".login-form").removeClass("step-two");
        $(".login-form").animate({left: 0});
      }
    },
    action: function() {
      Session.set("currentRoute", "login");

      BlazeLayout.render('plainLayout', { main: FlowRouter.current().route.options.name });
    }
});


loginRequired = function () {
    if (!Meteor.userId()) {
        if (!Meteor.loggingIn()) {
            FlowRouter.go('login');
        }
    }
};

FlowRouter.triggers.enter([loginRequired], {except: ["login", "nubank"]});
