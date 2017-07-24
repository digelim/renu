function resetMonthSelector() {
    Session.set("currentMonth", "Jan");
    $("ul.handle").animate({
        left: "4px"
    }, 400, function() {});
}

function touchHandler(event) {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";

    switch (event.type) {
        case "touchstart":
            type = "mousedown";
            break;
        case "touchmove":
            type = "mousemove";
            break;
        case "touchend":
            type = "mouseup";
            break;
        default:
            return;
    }

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0,
    /*left*/
    null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

document.addEventListener("touchstart", touchHandler, true);
document.addEventListener("touchmove", touchHandler, true);
document.addEventListener("touchend", touchHandler, true);
document.addEventListener("touchcancel", touchHandler, true);

Template.selector.onRendered(function() {

    $('.handle').draggable({
        axis: "x",
        containment: [-Math.abs(window.innerWidth - 900),
            0,
            4,
            0
        ]
    });

    $('.handle').on("touchmove", function(e) {
        e.stopPropagation();
    });

    if (!Session.get("currentYear")) {
        Session.set("currentYear", moment().format("YYYY"));
    }

    if (!Session.get("currentMonth")) {
        Session.set("currentMonth", moment().format("MMM"));
    }

    $(".page-content").on("scroll", function() {
        var top = $(this).scrollTop(),
            bottomDiv = $('.selector').offset().top + $('.selector')[0].offsetHeight,
            distance = Math.max(0, (top - bottomDiv) * -1);

        var opacity = distance / 183;
        $(".heading").css("opacity", opacity);
        // if (distance <= 45) {
        //     $("ul.handle").addClass("sticky");
        //     $(".speed-dial").addClass("fixed");
        // } else {
        //     $("ul.handle").removeClass("sticky");
        //     $(".speed-dial").removeClass("fixed");
        // }

        if ($('.selector').offset().top > -67) {
          $("ul.handle").removeClass("sticky");
          $(".speed-dial").removeClass("fixed");
        } else {
          $("ul.handle").addClass("sticky");
          $(".speed-dial").addClass("fixed");
        }

        if (distance === 0) {
            $(".navbar").css("background", "white")
        } else {
            $(".navbar").css("background", "transparent");
        }

    });

});

Template.selector.helpers({
    currentYear: function() {
        return Session.get("currentYear")
    },
    isCurrentMonth: function(month) {
        return currentMonth = Session.equals("currentMonth", month)
            ? "active-month"
            : "";
    }
});

Template.selector.events({
    'click li.month': function(e) {
        Session.set("currentMonth", $(e.target).attr("data-month"));
    },

    'click #previous': function() {

        var previousYear = parseInt(Session.get("currentYear"), 10) - 1;
        Session.set("currentYear", previousYear.toString() );
        resetMonthSelector();
    },
    'click #next': function() {

        var currentYear = parseInt(Session.get("currentYear"), 10);

        var nextYear = currentYear + 1;

        Session.set("currentYear", nextYear.toString());
        resetMonthSelector();

    }
})
