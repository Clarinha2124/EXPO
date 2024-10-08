let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    // console.log(palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
    
    for(i = 0; i < palavraSecretaSorteada.length; i++){  
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }     
        }
        else{
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }    
        }
    }   
}

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }    
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#C71585";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }

    
}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas--
        carregaImagemForca();

        if(tentativas == 0){
            abreModal("OPS!", "Não foi dessa vez ... A palavra secreta era <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }
    else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    
    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }

    if(vitoria == true)
    {
        abreModal("PARABÉNS!", "Você venceu!");
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}

// async function piscarBotaoJogarNovamente(){
//     while (jogarNovamente == true) {
//         document.getElementById("btnReiniciar").style.backgroundColor = 'red';
//         document.getElementById("btnReiniciar").style.scale = 1.3;
//         await atraso(500)
//         document.getElementById("btnReiniciar").style.backgroundColor = 'yellow';
//         document.getElementById("btnReiniciar").style.scale = 1;
//         await atraso(500)
//     }
// }

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))     
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background  = "url('./img/cabeça.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background  = "url('./img/corpo.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background  = "url('./img/1braço.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background  = "url('./img/2braço 1.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background  = "url('./img/1perna 2.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background  = "url('./img/morreu.png')";
            break;
        default:
            document.getElementById("imagem").style.background  = "url('./img/forca.png')";
            break;
    }
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});

function listaAutomatica(){ // ativa o modo manual
    if (jogoAutomatico == true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
        palavras = [];
        jogoAutomatico = false;

        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
    }
    else if(jogoAutomatico == false){ // ativa o modo automático
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>"
        jogoAutomatico = true;

        document.getElementById("abreModalAddPalavra").style.display = "none";
        document.getElementById("status").innerHTML = "Modo Automático";
        
    }
}

const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){ 
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = ""; 
}

window.onclick = function(){ 
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = ""; 
    }  
}

function carregaListaAutomatica(){
    palavras = [
        palavra001 = {
            nome: "IRLANDA",
            categoria:"LUGARES"
        },
        palavra002 = {
            nome: "EQUADOR",
            categoria:"LUGARES"
        },
        palavra003 = {
            nome: "CHILE",
            categoria:"LUGARES"
        },
        palavra004 = {
            nome: "INDONESIA",
            categoria:"LUGARES"
        },
        palavra005 = {
            nome: "MALDIVAS",
            categoria:"LUGARES"
        },
        palavra006 = {
            nome: "INGLATERRA",
            categoria:"LUGARES"
        },
        palavra007 = {
            nome: "CANADA",
            categoria:"LUGARES"
        },
        palavra008 = {
            nome: "BRASIL",
            categoria:"LUGARES"
        },
        palavra009 = {
            nome: "RIO DE JANEIRO",
            categoria:"LUGARES"
        },
        palavra010 = {
            nome: "CHINA",
            categoria:"LUGARES"
        },

        palavra011 = {
            nome: "BICICLETA",
            categoria:"TRANSPORTE"
        },
        
        palavra012 = {
            nome: "LANCHA",
            categoria:"TRANSPORTE"
        },
        palavra013 = {
            nome: "NAVIO",
            categoria:"TRANSPORTE"
        },
        palavra014 = {
            nome: "TELEFERICO",
            categoria:"TRANSPORTE"
        },
        palavra015 = {
            nome: "MOTO",
            categoria:"TRANSPORTE"
        },
        palavra016 = {
            nome: "BARCO",
            categoria:"TRANSPORTE"
        },
        palavra017 = {
            nome: "AVIAO",
            categoria:"TRANSPORTE"
        },
        palavra018 = {
            nome: "TREM",
            categoria:"TRANSPORTE"
        },
        palavra019 = {
            nome: "CAIAQUE",
            categoria:"TRANSPORTE"
        },
       
        palavra020 = {
            nome: "XICARA",
            categoria:"OBJETOS"
        },
        palavra021 = {
            nome: "MOEDA",
            categoria:"OBJETOS"
        },
        palavra022 = {
            nome: "CELULAR",
            categoria:"OBJETOS"
        },
        palavra023 = {
            nome: "CANETA",
            categoria:"OBJETOS"
        },
        palavra024 = {
            nome: "OCULOS",
            categoria:"OBJETOS"
        },
       
        palavra025 = {
            nome: "CHUVEIRO",
            categoria:"OBJETOS"
        },
        palavra026 = {
            nome: "COLAR",
            categoria:"OBJETOS"
        },
        palavra027 = {
            nome: "LAMPADA",
            categoria:"OBJETOS"
        },
        palavra028 = {
            nome: "COMPUTADOR",
            categoria:"OBJETOS"
        },
        palavra029 = {
            nome: "CORTINA",
            categoria:"OBJETOS"
        },
        palavra030 = {
            nome: "LAPIS",
            categoria:"OBJETOS"
        },
        palavra031 = {
            nome: "MELANCIA",
            categoria:"ALIMENTOS"
        },
        palavra032 = {
            nome: "AMENDOIM",
            categoria:"ALIMENTOS"
        },
        palavra033 = {
            nome: "ESFIRRA",
            categoria:"ALIMENTOS"
        },
        palavra034 = {
            nome: "PIZZA",
            categoria:"ALIMENTOS"
        },
        palavra035 = {
            nome: "JANTAR",
            categoria:"ALIMENTOS"
        },
        palavra036 = {
            nome: "CHOCOLATE",
            categoria:"ALIMENTOS"
        },
        palavra037 = {
            nome: "BATERRABA",
            categoria:"ALIMENTOS"
        },
        palavra038 = {
            nome: "SOPA",
            categoria:"ALIMENTOS"
        },
        palavra039 = {
            nome: "BRIGADEIRO",
            categoria:"ALIMENTOS"
        },
        palavra040 = {
            nome: "ACAI",
            categoria:"ALIMENTOS"
        },
        palavra040 = {
            nome: "BURRO",
            categoria:"ANIMAIS"
        },
        palavra041 = {
            nome: "GALINHA",
            categoria:"ANIMAIS"
        },
        palavra042 = {
            nome: "PAVAO",
            categoria:"ANIMAIS"
        },
        palavra043 = {
            nome: "CAMELO",
            categoria:"ANIMAIS"
        },
        palavra044 = {
            nome: "PASSARO",
            categoria:"ANIMAIS"
        },
        palavra045 = {
            nome: "ZEBRA",
            categoria:"ANIMAIS"
        },
        palavra046 = {
            nome: "GATO",
            categoria:"ANIMAIS"
        },
        palavra047 = {
            nome: "CACHORRO",
            categoria:"ANIMAIS"
        },
        palavra048 = {
            nome: "RAPOSA",
            categoria:"ANIMAIS"
        },
        palavra049 = {
            nome: "LAGARTIXA",
            categoria:"ANIMAIS"
        },
        palavra050 = {
            nome: "HIPOPOTAMO",
            categoria:"ANIMAIS"
        },
        palavra051 = {
            nome: "A ERA DO GELO",
            categoria:"TV E CINEMA"
        },
        palavra052 = {
            nome: "HOMEM ARANHA",
            categoria:"TV E CINEMA"
        },
        palavra053 = {
            nome: "BATMAN",
            categoria:"TV E CINEMA"
        },
        palavra054 = {
            nome: "HARRY POTTER",
            categoria:"TV E CINEMA"
        },
        palavra055 = {
            nome: "CINDERELA",
            categoria:"TV E CINEMA"
        },
        palavra056 = {
            nome: "MATRIX",
            categoria:"TV E CINEMA"
        },
        palavra057 = {
            nome: "MULHER MARAVILHA",
            categoria:"TV E CINEMA"
        },
        palavra058 = {
            nome: "O INCRIVEL HULK",
            categoria:"TV E CINEMA"
        },
        palavra059 = {
            nome: "BOB ESPONJA",
            categoria:"TV E CINEMA"
        },
        palavra060 = {
            nome: "PRINCESA E O SAPO",
            categoria:"TV E CINEMA"
        }
    ];
}

function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO"," Palavra e/ou Categoria inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra);  
    sortear();
    
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

function isNullOrWhiteSpace(input){
    return !input || !input.trim();
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}


async function piscarBotaoJogarNovamente(querJogar){
    if(querJogar){
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else{
        document.getElementById("jogarNovamente").style.display = "none";
    }
}


