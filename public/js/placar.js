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
    $(this).parent().parent().remove();       //remove o avo do elemento que foi clicado (usado na funcao insere placar)
}

