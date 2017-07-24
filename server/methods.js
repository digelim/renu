function ValidarCPF(cpf) {
    var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
    var soma1 = 0,
        soma2 = 0;
    var vlr = 11;

    for (i = 0; i < 9; i++) {
        soma1 += eval(cpf.charAt(i) * (vlr - 1));
        soma2 += eval(cpf.charAt(i) * vlr);
        vlr--;
    }
    soma1 = (((soma1 * 10) % 11) == 10
        ? 0
        : ((soma1 * 10) % 11));
    soma2 = (((soma2 + (2 * soma1)) * 10) % 11);

    var digitoGerado = (soma1 * 10) + soma2;
    if (digitoGerado != digitoDigitado) {
        return false
    }
    return true

}


function refresh(url, token, userId) {

        var history = HTTP.call("GET", url, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                'X-Correlation-Id': 'WEB-APP.jO4x1',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
                'Origin': 'https://conta.nubank.com.br',
                'Referer': 'https://conta.nubank.com.br/'
            }
        });

        var events = history.data.events;

        for (var i = 0, len = events.length; i < len; i++) {

            if (events[i].category === 'transaction') {

                if (Cards.find({id: events[i].id}).fetch().length <= 0) {

                    var dateString,
                        momentObj,
                        momentString,
                        price,
                        day,
                        month,
                        year;

                    dateString = events[i].time;
                    momentObj = moment(dateString, 'YYYY-MM-DDTHH:mm:ss[Z]');
                    momentString = momentObj.format('MMM');

                    month = momentString;

                    momentString = momentObj.format('YYYY');

                    year = momentString;

                    momentString = momentObj.format('DD');

                    day = momentString;

                    var n = events[i].amount;
                    n = n / 100;

                    price = 'R$' + (Number(n)).toLocaleString('pt-BR', {minimumFractionDigits: 2});

                    Cards.insert({
                        id: events[i].id,
                        description: events[i].description,
                        amount: events[i].amount,
                        time: events[i].time,
                        title: events[i].title,
                        tags: events[i].details.tags,
                        type: "expenses",
                        price: price,
                        day: parseInt(day, 10),
                        year: year,
                        month: month,
                        author: userId
                    });
                }

            }
        }


}

Meteor.methods({
    // updateHistoryWithPassword: function(login, password, userId) {
    //
    //     HTTP.call("POST", "https://prod-auth.nubank.com.br/api/token", {
    //         data: {
    //             password: password,
    //             login: login,
    //             grant_type: 'password',
    //             client_id: 'other.conta',
    //             client_secret: 'yQPeLzoHuJzlMMSAjC-LgNUJdUecx8XO'
    //         },
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-Correlation-Id': 'WEB-APP.jO4x1',
    //             'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
    //             'Origin': 'https://conta.nubank.com.br',
    //             'Referer': 'https://conta.nubank.com.br/'
    //         }
    //     }, function(err, nuBank) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //
    //             var token = nuBank.data.access_token;
    //             var url = nuBank.data._links.events.href;
    //
    //             refresh(url, token, userId);
    //
    //             //TODO: insert token into users collection
    //
    //             Meteor.setInterval(function() {
    //
    //                 refresh(url, token, userId);
    //
    //             }, 60000)
    //         }
    //
    //     });
    // },
    //
    // updateHistoryWithToken: function(url, token) {
    //     refresh(url, token, Meteor.userId());
    // },

    loginWithNuBank: function(login, password) {

      check(login, String);
      check(password, String);



        // generateStampedLoginToken = function() {
        //     return {token: token, when: new Date};
        // }

        var token,
            userId;

            console.log(login);
            console.log(password);

            var getClient = Meteor.wrapAsync(HTTP.call);


            var returnClient = getClient("POST", "https://prod-auth.nubank.com.br/api/registration", {
                data: {
                    name: "Nubank",
                    uri: "https://conta.nubank.com.br"
                },
                headers: {
                    'Content-Type': 'application/json',
                    'X-Correlation-Id': 'WEB-APP.jO4x1',
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
                    'Origin': 'https://conta.nubank.com.br',
                    'Referer': 'https://conta.nubank.com.br/'
                }
            });


        var getToken = Meteor.wrapAsync(HTTP.call);

        var returnToken = getToken("POST", "https://prod-auth.nubank.com.br/api/token", {
            data: {
                password: password,
                login: login,
                grant_type: 'password',
                client_id: returnClient.data.client_id,
                client_secret: returnClient.data.client_secret
            },
            headers: {
                'Content-Type': 'application/json',
                'X-Correlation-Id': 'WEB-APP.jO4x1',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
                'Origin': 'https://conta.nubank.com.br',
                'Referer': 'https://conta.nubank.com.br/'
            }
        });

        console.log(returnToken);

        if (returnToken.statusCode === 200) {

            token = returnToken.data.access_token;

            var url = returnToken.data._links.events.href;
            var userExists = (Meteor.users.findOne({username: login}))
                ? true
                : false;

            if (!userExists) {

                userId = Accounts.createUser({username: login, token: token, url: url});

            } else {

                userId = Meteor.users.find({username: login}).fetch()[0]._id;

            }

            Meteor.users.update(userId, {
                $set: {
                    token: token,
                    url: url,
                    client_id: returnClient.data.client_id,
                    client_secret: returnClient.data.client_secret
                }
            });

            return token

        }

    },

    insertCard: function(description,amount, time, title, type, price, day, year, month) {
      Cards.insert({
          description: description,
          amount: amount,
          time: time,
          title: title,
          type: type,
          price: price,
          day: parseInt(day,10),
          author: this.userId,
          year: year,
          month: month
      });
    },

    updateCard: function(id, description,amount, time, title, price, day, year, month) {
      Cards.update( id, { $set: {
          description: description,
          amount: amount,
          time: time,
          title: title,
          price: price,
          day: parseInt(day,10),
          author: this.userId,
          year: year,
          month: month
      }});
    },

    removeCard: function(id) {
      Cards.remove(id);
    },

    updateHistory: function() {
      var token = Meteor.users.findOne(this.userId).token;
      var url = Meteor.users.findOne(this.userId).url;

      if (token && url) {
        refresh(url, token, this.userId);
        return true;
      }
      return false


    },

    newUser: function(username, password) {
      check(username, String);
      check(password, String);



      exp = /\.|\-/g
      cpf = username.toString().replace(exp, "");
      console.log(Meteor.users.find({username: cpf}).count());

      if (ValidarCPF(cpf) && password !== "") {
        if (Meteor.users.find({username: cpf}).count() === 0) {
          Accounts.createUser({username: cpf, password: password});
          return "Bem vindo!"

        } else {
          return "Usuário já existe!"
        }
      } else {
        return "Cpf ou senha inválida"
      }


    }

});
