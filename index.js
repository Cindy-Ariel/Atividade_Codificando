var tagBotao = document.getElementById("botaoOK");
var tagInputEntrada = document.getElementById("entrada");
var tagInputSaida = document.getElementById("saida");
var botaoLimpar = document.getElementById("botaoLimpar");
var tagInputDeslocamento = document.getElementById("deslocamento");
var botaoRadioCodificar = document.getElementById("codificar");
var seletor = document.getElementById("seletor");
var option = seletor.options[seletor.selectedIndex];

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

function decodificarLetraCC(letra) {
  var posicaoDessaLetra = arrayDeLetrasDoAlfabeto.indexOf(letra);
  var posicaoDaLetraCodificada = undefined;
  var xdeslocamento = parseInt(tagInputDeslocamento.value) * -1;
  if (xdeslocamento > 0) {
    var posicaoDaLetraCodificada = parseInt(posicaoDessaLetra) + xdeslocamento;
  } else {
    var deslocamentoReal = xdeslocamento;
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
  var arrayDePalavras = frase.split(" "); // Divide a frase em palavras por espaço.
  var arrayDePalavrasTratadas = arrayDePalavras.map((palavra) => {
    var arrayDeLetras = palavra.split(""); // Divide as palavras em letras
    var arrayDeLetrasTratadas = arrayDeLetras.map((letra) => {
      let letraTratada = "";
      // Se o Codificar está selecionado.
      if (botaoRadioCodificar.checked) {
        if (seletor.selectedIndex === 0) {
          letraTratada = codificarLetraCC(letra);
        } else {
          letraTratada = codificarLetraB64(letra);
        }
        // Se o Decodificar está selecionado.
      } else {
        if (seletor.selectedIndex === 0) {
          letraTratada = decodificarLetraCC(letra);
        } else {
          letraTratada = decodificarLetraB64(letra);
        }
      }
      return letraTratada;
    });

    //Junta as letras codificadas para formar palavras e junta as palavras para retornar a frase codificada.

    var palavraTratada = arrayDeLetrasTratadas.join("");
    return palavraTratada;
  });
  var fraseTratada = arrayDePalavrasTratadas.join(" ");
  return fraseTratada;
}

console.log(botaoRadioCodificar.checked);
//Ao clicar a frase é codificada e passada para o campo de saida de texto.
tagBotao.addEventListener("click", (e) => {
  e.preventDefault();
  var conteudoDoImputEntrada = tagInputEntrada.value;
  var fraseTratada = tratarFrase(conteudoDoImputEntrada);
  tagInputSaida.value = fraseTratada;
});

//Limpar os campos de texto ao clicar no botão.
botaoLimpar.addEventListener("click", (e) => {
  e.preventDefault();
  tagInputEntrada.value = "";
  tagInputSaida.value = "";
});

function codificarLetraB64() {
  console.log("ola");
}
