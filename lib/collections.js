Cards = new Mongo.Collection('cards', {
  transform: function (doc) {

      var color;
      switch (doc.title) {

          case 'casa':
              color = '#e06969';
              break;
          case 'educação':
              color = '#dd68a3';
              break;
          case 'eletrônicos':
              color = '#db69db';
              break;
          case 'lazer':
              color = '#a068d8';
              break;
          case 'outros':
              color = '#6868d6';
              break;
          case 'restaurante':
              color = '#679dd3';
              break;
          case 'saúde':
              color = '#66d1d1';
              break;
          case 'serviços':
              color = '#65ce99';
              break;
          case 'supermercado':
              color = '#66cc66';
              break;
          case 'transporte':
              color = '#99cc66';
              break;
          case 'vestuário':
              color = '#cccc66';
              break;
          case 'viagem':
              color = '#cc9966';
              break;
          case 'economias':
              color = '#e06969'
              break;
          case 'pagamento':
              color = '#db69db'
              break;
          case 'presente':
              color = '#6868d6'
              break;
          case 'salário':
              color = '#66d1d1'
              break;
          case 'vendas':
              color = '#66cc66'
              break;
          case 'saldo inicial':
              color = '#cccc66'
              break;

          case undefined:
              color = null;
              break;

        }


    doc.monthNum = moment(doc.month, "MMM").format("MM");
    doc.color = color;
    return doc;
  }
});

clientDaily = new Meteor.Collection("clientDaily");

clientBalance = new Meteor.Collection("clientBalance");

clientBalanceMonth = new Meteor.Collection("clientBalanceMonth");

clientLimit = new Meteor.Collection("clientLimit");

clientReport = new Meteor.Collection("clientReport", {
  transform: function (doc) {

      var color;
      switch (doc._id) {

          case 'casa':
              color = '#e06969';
              break;
          case 'educação':
              color = '#dd68a3';
              break;
          case 'eletrônicos':
              color = '#db69db';
              break;
          case 'lazer':
              color = '#a068d8';
              break;
          case 'outros':
              color = '#6868d6';
              break;
          case 'restaurante':
              color = '#679dd3';
              break;
          case 'saúde':
              color = '#66d1d1';
              break;
          case 'serviços':
              color = '#65ce99';
              break;
          case 'supermercado':
              color = '#66cc66';
              break;
          case 'transporte':
              color = '#99cc66';
              break;
          case 'vestuário':
              color = '#cccc66';
              break;
          case 'viagem':
              color = '#cc9966';
              break;
          case 'economias':
              color = '#e06969'
              break;
          case 'pagamento':
              color = '#db69db'
              break;
          case 'presente':
              color = '#6868d6'
              break;
          case 'salário':
              color = '#66d1d1'
              break;
          case 'vendas':
              color = '#66cc66'
              break;
          case 'saldo inicial':
              color = '#cccc66'
              break;

          case undefined:
              color = null;
              break;

        }


    doc.color = color;
    return doc;
  }
});
