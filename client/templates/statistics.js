Template.statistics.onRendered(function() {
    initLayout();
    var self = this;
    self.autorun(function() {
        self.subscribe("dailyTotals", Session.get("currentMonth"), Session.get("currentYear"), Session.get("filter"), Meteor.userId())
    })

     swiper = myApp.swiper(".swiper-container", {
        preloadImages: false,
        lazyLoading: true,
        pagination: '.swiper-pagination'
    });

    function repositioning() {
        var t = d3.transform(d3.select('.nv-x').attr("transform")),
            x = t.translate[0],
            y = parseInt(t.translate[1], 10) - 35;

        $('.nv-x').attr("transform", "translate(" + x + "," + y + ")");

        $('.nv-y').attr("transform", "translate(" + 40 + "," + 0 + ")");

        $('#nvd3-line2 svg').attr("transform", "translate(-60,0)");
        $('#pieChart svg').attr("transform", "translate(0,-25)");

        $('svg').attr("viewport", window.outerWidth);
    }

    this.autorun(function() {

        if (self.subscriptionsReady()) {

            if (clientDaily.find().fetch().length > 1) {

                data = clientDaily.find({}, {
                    sort: {
                        _id: -1
                    }
                }).fetch();

                var output = data.map(function(obj) {
                    return Object.keys(obj).sort().map(function(key) {
                        return obj[key];
                    });
                });

                var result = {
                    monthSales: [
                        {
                            key: "6 months sales",
                            values: output,
                            area: true
                        }
                    ]
                }


                nv.addGraph(function() {
                    var chart = nv.models.lineChart().x(function(d) {

                        return d[0]
                    }).y(function(d) {
                        return d[1] / 100
                    }).color(["rgba(16, 207, 189, 1)"]).useInteractiveGuideline(true).width(window.outerWidth + 100)

                    chart.xAxis.tickValues();

                    chart.yAxis.tickFormat(d3.format(',.2f'));

                    chart.tooltips(false);

                    d3.select('#nvd3-line2 svg').datum(result.monthSales).transition().duration(500).call(chart);

                    nv.utils.windowResize(function() {

                        chart.update();
                        setTimeout(function() {
                            d3.selectAll('#nvd3-line2 .nvd3 circle.nv-point').attr("r", "4");
                        }, 300);
                    });

                    $('#nvd3-line2').data('chart', chart);

                    return chart;
                }, function() {
                    repositioning();
                });

              }

                if (clientReport.find().fetch().length > 0) {



                var chart = nv.models.pieChart().x(function(d) {
                    return d._id
                }).y(function(d) {
                    return d.amount
                }).showLabels(true);

                chart.color(function(d) {
                    return d.data.color
                })

                chart.tooltips(false);

                nv.addGraph(function() {

                    d3.select("#pieChart svg").datum(clientReport.find().fetch()).transition().duration(500).call(chart);
                    nv.utils.windowResize(function() {
                        chart.update();
                    });
                    return chart;
                });

                d3.select('#pieChart svg').datum(clientReport.find().fetch()).call(chart);
                chart.update();


                }

        }
    });

});

Template.statistics.helpers({
  hasData: function(chartType) {
    if (chartType === "pieChart") {
      return clientReport.find().fetch().length > 0
    }

    if (chartType === "lineChart") {
      return clientDaily.find().fetch().length > 1
    }
  }
})
