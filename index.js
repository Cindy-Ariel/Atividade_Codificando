var tagBotao = document.getElementById("botaoOK");
var tagInputEntrada = document.getElementById("entrada");
var tagInputSaida = document.getElementById("saida");
var botaoLimpar = document.getElementById("botaoLimpar");
var tagInputDeslocamento = document.getElementById("deslocamento");
var botaoRadioCodificar = document.getElementById("codificar");
var botaoRadioDecodificar = document.getElementById("decodificar");
var seletor = document.getElementById("seletor");
var option = seletor.options[seletor.selectedIndex];
var deslocamento = document.getElementById("deslocamento");

//Alfabeto que representa as letras com posicionamento real. (1 a 26)
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

//Logica para codificar: se o deslocamento for positivo a posição da letra codificada no alfabeto recebe a posição da letra inserida + o deslocamento.

//-Se o deslocamento for maior que 26 ele subtrai 26 desse valor até que seja um posicionamento real no alfabeto.

//-Se o deslocamento for negativo ele recebe ele mesmo + 26 até que seja positivo, para assim representar uma posição de letra codificada real.

//Para decodificar o deslocamento é multiplicado por -1 e a lógica é a mesma.

function codificarEDecodificarLetraCC(letra, eCodificar) {
  var posicaoDessaLetra = arrayDeLetrasDoAlfabeto.indexOf(letra);
  var posicaoDaLetraCodificada = undefined;
  let deslocamento = undefined;
  if (eCodificar) {
    deslocamento = parseInt(tagInputDeslocamento.value);
  } else {
    deslocamento = parseInt(tagInputDeslocamento.value) * -1;
  }
  if (deslocamento > 0) {
    var posicaoDaLetraCodificada = parseInt(posicaoDessaLetra) + deslocamento;
  } else {
    var deslocamentoReal = deslocamento;
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
  if (seletor.selectedIndex === 0) {
    var arrayDePalavras = frase.split(" "); // Divide a frase em palavras por espaço.
    var arrayDePalavrasTratadas = arrayDePalavras.map((palavra) => {
      var arrayDeLetras = palavra.split(""); // Divide as palavras em letras
      var arrayDeLetrasTratadas = arrayDeLetras.map((letra) => {
        let letraTratada = "";
        // Se for Cifra de Cesar.
        if (seletor.selectedIndex === 0) {
          letraTratada = codificarEDecodificarLetraCC(
            letra,
            botaoRadioCodificar.checked
          );
          return letraTratada;
        }
      });

      //Junta as letras codificadas para formar palavras e junta as palavras para retornar a frase codificada.

      var palavraTratada = arrayDeLetrasTratadas.join("");
      return palavraTratada;
    });
    var fraseTratada = arrayDePalavrasTratadas.join(" ");
    return fraseTratada;
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //BASE 64
  var fraseTratada = "";
  if (botaoRadioCodificar.checked && seletor.selectedIndex === 1) {
    fraseTratada = btoa(frase);

    // Se o Decodificar está selecionado e for Cifra de Cesar.
  } else if (seletor.selectedIndex === 1) {
    fraseTratada = atob(frase);
  }
  return fraseTratada;
}

seletor.addEventListener("change", () => {
  if (seletor.selectedIndex === 1) {
    deslocamento.style.display = "none"; // Ocultar a div deslocamento se o seletor Base64 for selecionado.
  } else {
    deslocamento.style.display = "block"; // Retornar com a div deslomento se o Cifra de Cesar for selecionado.
  }
});

//Ao clicar a frase é codificada e passada para o campo de saida de texto.
tagBotao.addEventListener("click", (e) => {
  e.preventDefault();
  var conteudoDoImputEntrada = tagInputEntrada.value;
  var fraseTratada = tratarFrase(conteudoDoImputEntrada);
  tagInputSaida.value = fraseTratada;
});

//Ao carregar a página o botão já apareça selecionado.
window.addEventListener("load", () => {
  botaoRadioCodificar.checked = true;
});

//Ao selecionar decodificar no botão a mensagem é alterada para Decodificar mensagem!
botaoRadioDecodificar.addEventListener("click", () => {
  tagBotao.innerHTML = "Decodificar mensagem!";
});

//Ao selecionar codificar no botão a mensagem é alterada para Codificar mensagem!
botaoRadioCodificar.addEventListener("click", () => {
  tagBotao.innerHTML = "Codificar mensagem!";
});

//Limpar os campos de texto ao clicar no botão.
botaoLimpar.addEventListener("click", (e) => {
  e.preventDefault();
  tagInputEntrada.value = "";
  tagInputSaida.value = "";
});
