$("#botao-placar").click(mostraPlacar); 

function mostraPlacar(){
    $(".placar").stop().slideToggle(600);    //adiciona animacao para mostrar placar. o stop serve para interromper uma animacao caso seja chamada novamente
}


function inserePlacar(){
    var placar = $(".placar");
    var corpoTabela = placar.find("tbody");      //busca pelo tbody dentro de placar e coloca na variavel corpoTabela
    var usuario = "Felipe";
    var numPalavras = $("#numero-palavras").text();

    var linha = novaLinha(usuario, numPalavras); 
    linha.find(".botao-remover").click(removeLinha);   //busca pelo elemento que contem classe dentro da linha e chama a funcao remove linha no clique
    corpoTabela.prepend(linha);                       //adiciona linha retornada da funcao novaLinha no inicio do corpoTabela

    $(".placar").slideDown(500);     //abre placar quando insere usuario no placar
    scrollPlacar();
}


function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;    //pega o valor do topo da tabela e guarda na posicaoPlacar

    $("html").animate(                                // inicia animacao do html
    {
        scrollTop: posicaoPlacar + "px"               //faz o scroll para o topo da posicaoPlacar
    }, 1000);
}


function novaLinha(usuario, numPalavras){
    var linha = $("<tr>");                              //cria uma tr usando jQuery
    var colunaUsuario = $("<td>").text(usuario);        //cria uma td recebendo o usuario da funcao insere placar e adiciona na colunaUsuario
    var colunaPalavras = $("<td>").text(numPalavras);   
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href", "#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);           //icone dentro do <a>
    colunaRemover.append(link);   //<a> dentro do <td>

    //os tres <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;                                      //retorna a linha para a funcao que chamou
}

function removeLinha(event){   
    event.preventDefault();    
    
    var linha =  $(this).parent().parent(); // salva o avo do elemento que foi clicado na variavel linha (usado na funcao insere placar)

    linha.fadeOut(600); //da fadeout na linha mas nao remove do HTML
    setTimeout(function(){   //setTimeout com uma funcao anomima pra remover a linha o tempo tem que ser igual o fadeout
        linha.remove();
    },600);

}

