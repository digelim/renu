function initCalendar() {
    var monthNames = [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro'
    ];

    var calendarInline = myApp.calendar({
        container: '#calendar-inline-container',
        value: [new Date()],
        weekHeader: false,
        input: '#datePicker',
        dateFormat: 'dd/mm/yyyy',
        toolbarTemplate: '<div class="toolbar calendar-custom-toolbar">' + '<div class="toolbar-inner">' + '<div class="left">' + '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' + '</div>' + '<div class="center"></div>' + '<div class="right">' + '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' + '</div>' + '</div>' + '</div>',
        onOpen: function(p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function() {
                calendarInline.prevMonth();
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function() {
                calendarInline.nextMonth();
            });
        },
        onMonthYearChangeStart: function(p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
        }
    });
}

Template.add.helpers({
    categories: function() {
        var categories = [];
        if (Session.equals("addType", 'expenses')) {
            categories = [
                "casa",
                "educação",
                "eletrônicos",
                "lazer",
                "outros",
                "restaurante",
                "saúde",
                "serviços",
                "supermercado",
                "transporte",
                "vestuário",
                "viagem"
            ];
        } else if (Session.equals("addType", 'revenue')) {
            categories = ["economias", "pagamento", "presente", "salário", "vendas", "saldo inicial"];
        }
        return categories
    },
    isFirst: function(index) {
        if (index === 0) {
            return true
        }
        return false
    }
});

Template.add.events({
    "click input[name='date']": function() {
        myApp.modal({
            text: '<div style="padding:0; width:auto">' + '<div id="calendar-inline-container"></div>' + '</div>',
            buttons: [
                {
                    text: 'Ok',
                    bold: true
                }
            ]
        })
        initCalendar();

    },
    "keyup input[name='value']": function(e) {
        $("input[name='value']").maskMoney({prefix: "R$", decimal: ",", thousands: "."});
    },
    "click .save-button": function() {
        var amount = $("input[name='value']").maskMoney('unmasked')[0] * 100;
        var price = $("input[name='value']").val();
        var momentObj = moment($("input[name='date']").val(), 'DD/MM/YYYY');
        var time = momentObj.format('YYYY-MM-DDTHH:mm:ss[Z]');
        var day = momentObj.format('DD');
        var year = momentObj.format('YYYY');
        var month = momentObj.format('MMM');
        var title = $('select[name="categories"]').val();
        // var subtitle = $('input[name="description"]').val();
        var description = $('input[name="place"]').val();
        var type = Session.get("addType");


        var insert = true;

        if (price === "") {
            $("input[name='value']").parent().parent().addClass("invalid");
            insert = false;
        } else {
            $("input[name='value']").parent().parent().removeClass("invalid");
        }

        if (description === "") {
            $("input[name='place']").parent().parent().addClass("invalid");
            insert = false;
        } else {
            $("input[name='place']").parent().parent().removeClass("invalid");
        }

        if ($("input[name='date']").val() === "") {
            insert = false;
            $("input[name='date']").parent().parent().addClass("invalid");
        } else {
            $("input[name='date']").parent().parent().removeClass("invalid");
        }

        // if (subtitle === "") {
        //     insert = false;
        //     $('input[name="description"]').parent().parent().addClass("invalid");
        // } else {
        //     $('input[name="description"]').parent().parent().removeClass("invalid");
        // }

        if (insert) {
            Meteor.call("insertCard", description, amount, time, title, type, price, day, year, month, function(err, res) {
                if (!err) {
                    FlowRouter.go('start');
                }
            });
        }

    },
    'keyup input[name="value"]': function(e) {
        if ($(e.target).val() !== "") {
            $(e.target).parent().parent().removeClass("invalid");
        }
    },
    'keyup input[name="place"]': function(e) {
        if ($(e.target).val() !== "") {
            $(e.target).parent().parent().removeClass("invalid");
        }
    },
    // 'keyup input[name="description"]': function(e) {
    //     if ($(e.target).val() !== "") {
    //         $(e.target).parent().parent().removeClass("invalid");
    //     }
    // },
    'change input[name="date"]': function(e) {
        if ($(e.target).val() !== "") {
            $(e.target).parent().parent().removeClass("invalid");
        }
    }

});

Template.add.onRendered(function() {
    initLayout();
});
