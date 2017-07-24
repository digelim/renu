Template.menu.helpers({
    balance: function() {
        var revenue = 0,
            expenses = 0;

        if (clientBalance.findOne("revenue")) {
            revenue = clientBalance.findOne("revenue").amount / 100

        }

        if (clientBalance.findOne("expenses")) {
            expenses = clientBalance.findOne("expenses").amount / 100

        }

        var positive = (revenue - expenses);
        var negative = (expenses - revenue);
        return balance = (revenue >= expenses) ?
            "R$" + positive.toFixed(2).replace(".", ",") :
            "(R$" + negative.toFixed(2).replace(".", ",") + ")";
    },
    limit: function() {
        var revenue = 0,
            expenses = 0;

        if (clientLimit.findOne("revenue")) {

            revenue = clientLimit.findOne("revenue").amount / 100;
        }

        if (clientLimit.findOne("expenses")) {
            expenses = clientLimit.findOne("expenses").amount / 100;
        }


        var elem = document.getElementById("percent");
        var value = 100 * (expenses / revenue);
        var limit = {};
        limit.infinity = false;
        if (!isFinite(value)) {
            limit.infinity = true
        }
        limit.width = Math.min(value, 100);
        limit.value = value.toFixed(0);

        return limit
    },
    categoryList: function() {
        var category;

        if (Session.equals("filter", "expenses")) {


            category = [{
                name: "DESPESAS",
                color: "#ffffff",
                total: clientBalanceMonth.find("expenses").fetch().length ? "R$" + (clientBalanceMonth.find("expenses").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined

            },{
                name: "casa",
                color: "#e06969",
                total: clientReport.find("casa").fetch().length ? "R$" + (clientReport.find("casa").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "educação",
                color: "#dd68a3",
                total: clientReport.find("educação").fetch().length ? "R$" + (clientReport.find("educação").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "eletrônicos",
                color: "#db69db",
                total: clientReport.find("eletrônicos").fetch().length ? "R$" + (clientReport.find("eletrônicos").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "lazer",
                color: "#a068d8",
                total: clientReport.find("lazer").fetch().length ? "R$" + (clientReport.find("lazer").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "outros",
                color: "#6868d6",
                total: clientReport.find("outros").fetch().length ? "R$" + (clientReport.find("outros").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "restaurante",
                color: "#679dd3",
                total: clientReport.find("restaurante").fetch().length ? "R$" + (clientReport.find("restaurante").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "saúde",
                color: "#66d1d1",
                total: clientReport.find("saúde").fetch().length ? "R$" + (clientReport.find("saúde").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "serviços",
                color: "#65ce99",
                total: clientReport.find("serviços").fetch().length ? "R$" + (clientReport.find("serviços").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "supermercado",
                color: "#66cc66",
                total: clientReport.find("supermercado").fetch().length ? "R$" + (clientReport.find("supermercado").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "transporte",
                color: "#99cc66",
                total:clientReport.find("transporte").fetch().length ? "R$" + (clientReport.find("transporte").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "vestuário",
                color: "#cccc66",
                total: clientReport.find("vestuário").fetch().length ? "R$" + (clientReport.find("vestuário").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "viagem",
                color: "#cc9966",
                total: clientReport.find("viagem").fetch().length ? "R$" + (clientReport.find("viagem").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }]

        }

        if (Session.equals("filter", "revenue")) {
            category = [{
                name: "RECEITAS",
                color: "#ffffff",
                total: clientBalanceMonth.find("revenue").fetch().length ? "R$" + (clientBalanceMonth.find("revenue").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined

            },{
                name: "economias",
                color: "#e06969",
                total: clientReport.find("economias").fetch().length ? "R$" + (clientReport.find("economias").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "pagamento",
                color: "#db69db",
                total: clientReport.find("pagamento").fetch().length ? "R$" + (clientReport.find("pagamento").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "presente",
                color: "#6868d6",
                total: clientReport.find("presente").fetch().length ? "R$" + (clientReport.find("presente").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "salário",
                color: "#66d1d1",
                total: clientReport.find("salário").fetch().length ? "R$" + (clientReport.find("salário").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "vendas",
                color: "#66cc66",
                total: clientReport.find("vendas").fetch().length ? "R$" + (clientReport.find("vendas").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }, {
                name: "saldo inicial",
                color: "#cccc66",
                total: clientReport.find("saldo inicial").fetch().length ? "R$" + (clientReport.find("saldo inicial").fetch()[0].amount / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2}) : undefined
            }]
        }


    return category

    }
})
