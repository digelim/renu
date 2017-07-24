function MascaraCPF(cpf) {
    if (mascaraInteiro(cpf) == false) {
        event.returnValue = false;
    }
    return formataCampo(cpf, '000.000.000-00', event);
}

//valida o CPF digitado
function ValidarCPF(cpf) {
    exp = /\.|\-/g
    cpf = cpf.toString().replace(exp, "");
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

//valida numero inteiro com mascara
function mascaraInteiro() {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
        return false;
    }
    return true;
}

//formata de forma generica os campos
function formataCampo(campo, Mascara, evento) {
    var boleanoMascara;

    var Digitato = evento.keyCode;
    exp = /\-|\.|\/|\(|\)| /g
    campoSoNumeros = campo.value.toString().replace(exp, "");

    var posicaoCampo = 0;
    var NovoValorCampo = "";
    var TamanhoMascara = campoSoNumeros.length;;

    if (Digitato != 8) { // backspace
        for (i = 0; i <= TamanhoMascara; i++) {
            boleanoMascara = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".") || (Mascara.charAt(i) == "/"))
            boleanoMascara = boleanoMascara || ((Mascara.charAt(i) == "(") || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "))
            if (boleanoMascara) {
                NovoValorCampo += Mascara.charAt(i);
                TamanhoMascara++;
            } else {
                NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                posicaoCampo++;
            }
        }
        campo.value = NovoValorCampo;
        return true;
    } else {
        return true;
    }
}

Template.login.onRendered(function(){
  Session.set("passwordOk", false);
  Session.set("cpfOk", false);
  this.autorun(function(){
    if (Session.get("passwordOk") && Session.get("cpfOk")) {
      $(".button-white, .button-purple").removeClass("disabled");
    } else {
      $(".button-white, .button-purple").addClass("disabled");
    }
  });
});

Template.login.events({
  "click .button-white": function(e) {
    if (Session.get("passwordOk") && Session.get("cpfOk")) {
      var left = - $(".login-form .register").width() - 30;
      $(".login-form").animate({left: left});
      $(".login-form").addClass("step-two");
    }
  },
  "click .button-purple": function(e) {
    if (Session.get("passwordOk") && Session.get("cpfOk")) {
      var username = $("input[name='cpf']").val();
      var password = $("input[name='password2']").val();
      exp = /\.|\-/g
      cpf = username.toString().replace(exp, "");
      Meteor.loginWithPassword(cpf, password);
    }
  },
  "click .button-register": function(e) {
    var username = $("input[name='cpf']").val();
    var password = $("input[name='password2']").val();
    var confirm =  $("input[name='confirm']").val();

    if (password === confirm) {

      Meteor.call("newUser", username, password, function(err, res) {
        if (err) {
        } else {
          if (res === "Usuário já existe!") {
            $(".validate").html(res);
            $(".login-form").animate({left: 0});
            $(".validate").show();
          } else {
            $(" .confirm").html(res);
            if (res === "Bem vindo!") {
              exp = /\.|\-/g
              cpf = username.toString().replace(exp, "");
              Meteor.loginWithPassword(cpf, password);
            }
            $(" .confirm").show();
          }
        }
      });
    }

  },
  "change input[name='password']": function(e){
    $("input[name='password2']").val($(e.target).val());
  },

  "keyup input[name='cpf']": function(e) {
      MascaraCPF(e.target);
      var cpf = $(e.target).val();

      if (!ValidarCPF(cpf)) {
          $(".cpf-field label").addClass("invalid");
          $(".cpf-field hr").addClass("invalid");
          Session.set("cpfOk", false);
      } else {
          $(".cpf-field label").removeClass("invalid");
          $(".cpf-field hr").removeClass("invalid");
          Session.set("cpfOk", true);
      }
  },
  "keyup input[name='password']": function(e) {
      if ($(e.target).val() === "") {
          $(".password-field label").addClass("invalid");
          $(".password-field hr").addClass("invalid");
          Session.set("passwordOk",false);
      } else {
          Session.set("passwordOk", true);
          $(".password-field hr").removeClass("invalid");
          $(".password-field label").removeClass("invalid");
      }
  },
  "blur input[name='cpf']": function(e) {
      var cpf = $(e.target).val();
      if (!ValidarCPF(cpf)) {
          $(".cpf-field hr").addClass("invalid");
          $(".cpf-field label").addClass("invalid");
          Session.set("cpfOk", false);
      } else {
          $(".cpf-field hr").removeClass("invalid");
          $(".cpf-field label").removeClass("invalid");
          Session.set("cpfOk", true);
      }
  },
  "blur input[name='password']": function(e) {
      if ($(e.target).val() === "") {
          $(".password-field hr").addClass("invalid");
          $(".password-field label").addClass("invalid");
          Session.set("passwordOk", false);
      } else {
          $(".password-field hr").removeClass("invalid");
          $(".password-field label43").removeClass("invalid");
          Session.set("passwordOk", true);
      }
  }
});
