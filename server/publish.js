Meteor.publish("transactionTotals", function(month, year, type, author) {

ReactiveAggregate(this, Cards, [{
    $match: {
      month: month,
      year: year,
      type: type,
      author: author
    }
},{

    $group: {
        '_id': '$title',

        'amount': {
            $sum: '$amount'
        },
        type: { $first: '$type' },
        author: {$first: '$author'}

    }
},
{
    $project: {

        amount: '$amount',
        type: '$type',
        year: '$year',
        month: '$month',
        author: '$author'

    }
}], { clientCollection: "clientReport" });
});

Meteor.publish("dailyTotals", function(month, year, type, author) {

ReactiveAggregate(this, Cards, [{
    $match: {
      month: month,
      year: year,
      type: type,
      author: author,
    }
},{

    $group: {
        '_id': '$day',

        'amount': {
            $sum: '$amount'
        },
        type: { $first: '$type' },
        author: {$first: '$author'}

    }
},
{
    $project: {

        amount: '$amount',
        type: '$type',
        year: '$year',
        month: '$month',
        author: '$author'

    }
}], { clientCollection: "clientDaily" });
});

Meteor.publish("balance", function(author) {

ReactiveAggregate(this, Cards, [{
    $match: {
      author: author
    }
},{

    $group: {
        '_id': '$type',
        'amount': {
            $sum: '$amount'
        },
        author: {$first: '$author'}

    }
},
{
    $project: {

        amount: '$amount',
        type: '$type',
        year: '$year',
        month: '$month',
        author: '$author'

    }
}], { clientCollection: "clientBalance" });
});

Meteor.publish("balanceMonth", function(author, month, year) {

ReactiveAggregate(this, Cards, [{
    $match: {
      author: author,
      month: month,
      year: year
    }
},{

    $group: {
        '_id': '$type',
        'amount': {
            $sum: '$amount'
        },
        author: {$first: '$author'}

    }
},
{
    $project: {

        amount: '$amount',
        type: '$type',
        year: '$year',
        month: '$month',
        author: '$author'

    }
}], { clientCollection: "clientBalanceMonth" });
});


Meteor.publish("limit", function(year, month, author) {

ReactiveAggregate(this, Cards, [{
    $match: {
      author: author,
      month: month,
      year: year
    }
},{

    $group: {
        '_id': '$type',
        'amount': {
            $sum: '$amount'
        },
        author: {$first: '$author'}

    }
},
{
    $project: {

        amount: '$amount',
        type: '$type',
        year: '$year',
        month: '$month',
        author: '$author'

    }
}], { clientCollection: "clientLimit" });
});


Meteor.publish("cards", function() {
  return Cards.find()
})
