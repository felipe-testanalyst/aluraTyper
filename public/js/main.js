var campo = $(".campo");
var tempoInicial = $("#tempo-digitacao").text();

$(function () {                                      //funcao de atalho que inicia as funcoes assim que a pagina e carregada
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadoresBorda();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();
    $('#usuarios').selectize({
        create: true,
        sortField: 'text'
    });

    $(".tooltip").tooltipster({
        trigger: "custom"
    })
})

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();                //pega frase
    var numPalavras = frase.split(" ").length;    //divide as palavras e conta o tamanho

    var tamanhofrase = $("#tamanho-frase");       //pega o span para o numero de palavras
    tamanhofrase.text(numPalavras);              // adiciona o numPalavras dentro do span
}

function atualizaTempoDigitacao(tempo) {   //recebe o tempo da funcao trocaFraseAleatoria
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}


function inicializaContadores() {
    campo.on("input", function () {                             //jQuery escutador de eventos
        var conteudo = campo.val();                          //pega o valor do textarea
        var qtdPalavras = conteudo.split(/\S+/).length -1 ; //divide as palavras com expresao regular que verifica espacos
        $("#numero-palavras").text(qtdPalavras);           //coloca a qtdPalavas no span
    
        var conteudoCaracteres = conteudo.length;
        $("#numero-caracteres").text(conteudoCaracteres);
    
    })
}

function inicializaCronometro(){
    
    campo.one("focus", function(){                     //diferente do campo.on o campo.one escuta o evento somente uma vez
        var tempoRestante = $("#tempo-digitacao").text(); 
        $("#botao-reiniciar").attr("disabled", true);  //disabilita o botao reiniciar
        var cronometroID = setInterval(function(){       // setInterval inicia o intervalo de tempo com 1000
            tempoRestante--;                             //diminui tempo restante a cada 1000 mls
            $("#tempo-digitacao").text(tempoRestante);  
            if(tempoRestante < 1){                        
                clearInterval(cronometroID);             //para o setInterval
                finalizaJogo();
                inserePlacar();
            }
        }, 1000);
    });
}

function finalizaJogo(){
    campo.attr("disabled", true);            //adiciona atributo disabled no textarea para parar digitacao
    $("#botao-reiniciar").attr("disabled", false); //abilita botao reiniciar
    campo.addClass("campo-desativado");
}

function inicializaMarcadoresBorda(){
    
    campo.on("input", function(){
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length); // compara a substring da frase com o que foi digitado
        if(digitado == comparavel){
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        }
        else{
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#numero-palavras").text("0");
    $("#numero-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("campo-desativado");
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");
}