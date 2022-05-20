var tagBotao = document.getElementById("botaoOK");
var tagInputEntrada = document.getElementById("entrada");
var tagInputSaida = document.getElementById("saida");
var botaoLimpar = document.getElementById("botaoLimpar");
var tagInputDeslocamento = document.getElementById("deslocamento");

var arrayDeLetrasDoAlfabeto = [
  "",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
function codificarLetraCC(letra) {
  var posicaoDessaLetra = arrayDeLetrasDoAlfabeto.indexOf(letra);
  var posicaoDaLetraCodificada = undefined;
  if (parseInt(tagInputDeslocamento.value) > 0) {
    var posicaoDaLetraCodificada =
      parseInt(posicaoDessaLetra) + parseInt(tagInputDeslocamento.value);
  } else {
    var deslocamentoReal = parseInt(tagInputDeslocamento.value);
    while (deslocamentoReal <= 0) {
      deslocamentoReal = deslocamentoReal + 26;
    }
    var posicaoDaLetraCodificada =
      parseInt(posicaoDessaLetra) + deslocamentoReal;
  }
  if (posicaoDaLetraCodificada <= 26) {
    var letraCodificada = arrayDeLetrasDoAlfabeto[posicaoDaLetraCodificada];
    return letraCodificada;
  } else if (posicaoDaLetraCodificada > 26) {
    while (posicaoDaLetraCodificada > 26) {
      posicaoDaLetraCodificada = posicaoDaLetraCodificada - 26;
    }
    var letraCodificada = arrayDeLetrasDoAlfabeto[posicaoDaLetraCodificada];
    return letraCodificada;
  } else if (posicaoDaLetraCodificada <= 0) {
    while (posicaoDaLetraCodificada <= 0) {
      posicaoDaLetraCodificada = posicaoDaLetraCodificada + 26;
    }
    var letraCodificada = arrayDeLetrasDoAlfabeto[posicaoDaLetraCodificada];
    return letraCodificada;
  }
}

function tratarFrase(frase) {
  var arrayDePalavras = frase.split(" ");
  var arrayDePalavrasCodificadas = arrayDePalavras.map((palavra) => {
    var arrayDeLetras = palavra.split("");
    var arrayDeLetrasCodificadas = arrayDeLetras.map((letra) => {
      var letraCodificada = codificarLetraCC(letra);
      return letraCodificada;
    });
    var palavraCodificada = arrayDeLetrasCodificadas.join("");
    return palavraCodificada;
  });
  var fraseCodificada = arrayDePalavrasCodificadas.join(" ");
  return fraseCodificada;
}

tagBotao.addEventListener("click", (e) => {
  e.preventDefault();
  var conteudoDoImputEntrada = tagInputEntrada.value;
  var fraseTratada = tratarFrase(conteudoDoImputEntrada);
  tagInputSaida.value = fraseTratada;
});

botaoLimpar.addEventListener("click", (e) => {
  e.preventDefault();
  tagInputEntrada.value = "";
  tagInputSaida.value = "";
});
