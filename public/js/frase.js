$("#botao-frase").click(fraseAlearoria); //pega botao e agrega evento de click

function fraseAlearoria(){

    $("#spinner").toggle(); //mostra spinner

    $.get("http://localhost:3000/frases", trocaFraseAleatoria)  //requisicao ajax e chama funcao para trocarfrase
    .fail(function(){                                            //caso o .get fail inicia funcao
        $("#erro").toggle();                                    //mostra msg erro do html
        setTimeout(function(){                                  // set timer 
            $("#erro").toggle();                                //toggle msg de erro depois de 2 segundos
        }, 2000); 
    }).always(function(){                                       //always sempre executa funcao
        $("#spinner").toggle();                                 // toggle spinner
    })
}

function trocaFraseAleatoria(dados) {   //traz dados da requisicao ajax
    var frase = $(".frase");                                     
    var numeroAleatorio = Math.floor(Math.random() * dados.length);  //gera numero aleatorio e multiplica pelo tamanho do array para ficar maior que zero

    frase.text(dados[numeroAleatorio].texto);       //troca o texto da frase para texto trazido pela requisicao
    atualizaTamanhoFrase();  
    atualizaTempoDigitacao(dados[numeroAleatorio].tempo); 
}
