$("#botao-placar").click(mostraPlacar); 
$("#botao-sync").click(sincronizaPlacar);

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
    sincronizaPlacar();
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
        sincronizaPlacar();
    },600);
}

function sincronizaPlacar(){
    var placar = [];                                            //inicia array
    var linhas = $("tbody>tr");                                // pega a tr(linha) dentro do tbody    

    linhas.each(function(){                                    //para cada linha 
        var usuario = $(this).find("td:nth-child(1)").text();  // (this=tr) pega o texto da td pelo seletor css e coloca na variavel usuario
        var palavras = $(this).find("td:nth-child(2)").text(); 

        var score = {                                    //constroi um objeto com usuario e pontos
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);                         // manda o objeto pro array

    });

    var dados = {                                  //cria um objeto dados com os valores do placar
        placar: placar
    };
    
    $.post("http://localhost:3000/placar", dados, function(){      //manda os dados para o servidor
        console.log("Placar sincronizado com sucesso");
    });
    
}

function atualizaPlacar(){

    $.get("http://localhost:3000/placar", function(data){    //busca data no servidor
        $(data).each(function(){                             //para cada linha da data
            var linha = novaLinha(this.usuario, this.pontos); //chama funcao novalinha e coloca a data dentro da variave linha

            linha.find(".botao-remover").click(removeLinha);

            $("tbody").append(linha);            

        })
    })
}
