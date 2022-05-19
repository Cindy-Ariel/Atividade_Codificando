var tagBotao = document.getElementById("botaoOK");
var tagInputEntrada = document.getElementById("entrada");
var tagInputSaida = document.getElementById("saida");
var botaoLimpar = document.getElementById("botaoLimpar");

function codificarCifraDeCesar(frase) {
  var arrayDePalavras = frase.split(" ");
  var novoArray = arrayDePalavras.map((palavra) => {
    return palavra;
  });
  novoArray.join(" ");
}

tagBotao.addEventListener("click", (e) => {
  e.preventDefault();
  var valor = tagInputEntrada.value;
  tagInputSaida.value = valor;
  codificarCifraDeCesar(valor);
});
botaoLimpar.addEventListener("click", (e) => {
  e.preventDefault();
  tagInputEntrada.value = "";
  tagInputSaida.value = "";
});
function rodarFormulario() {}
