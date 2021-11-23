// VARIÁVEIS GLOBAIS //
let quizzUnico;
let quizzID;
let quizzSelecionado;
let niveis;
let quizzesRespondidos = 0;
let respostasCertas = 0;

// RECEBENDO DO SERVIDOR O ARRAY COM TODOS OS QUIZZES //
function receberQuizzes() {
    const infoQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");

    infoQuizzes.then(listarQuizzes)
    infoQuizzes.catch(() => alert("ERRO!"))
}

// RENDERIZANDO TODOS OS QUIZZES //
function listarQuizzes(info) {
    const quizzes = info.data

    const todosOsQuizzes = document.querySelector(".todosOsQuizzes")

    for (let i = 0; i < quizzes.length; i++) {
        quizzUnico = quizzes[i]
        quizzID = quizzes[i].id
        todosOsQuizzes.innerHTML += 
            `
            <div class="quizz ${quizzID}" data-identifier="quizz-card" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.1%, #000000 100%), url(${quizzUnico.image})" onclick="quizzIndividual(this)">
                <span class="listaDeQuizzes">
                    ${quizzUnico.title}
                </span>
            </div>
            `
    }
}
receberQuizzes();

// FUNÇÃO QUE LEVA PARA O QUIZZ CLICADO //
function quizzIndividual (id) {

    const listaQuizz = document.querySelector(".principal")
    const quizz = document.querySelector(".quizzIndividual")
    listaQuizz.classList.add("escondido")
    quizz.classList.remove("escondido")

    receberQuizzUnico(id);
}

function comparador () {
    return Math.random() - 0.5;
}

// FUNÇÃO QUE RENDERIZADO O QUIZZ CLICADO //
function receberQuizzUnico (id) {
    const quizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id.classList[1]}`)

    quizz.then((infoQuizz) => {
        const quizz = infoQuizz.data
        const quizzIndividual = quizz.questions
        quizzSelecionado = quizz.questions
        niveis = quizz.levels
        const paginaQuizz = document.querySelector(".banner")
        const perguntas = document.querySelector(".perguntas")

        paginaQuizz.innerHTML = 
        `
        <div class="bannerQuizz" style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${quizz.image})">
            <span class="tituloQuizz">${quizz.title}</span>
        </div>
        `

        for (let i = 0; i < quizzIndividual.length; i++) {
            perguntas.innerHTML +=
            `
            <div class="pergunta" data-identifier="question">
                <div class="tituloPergunta" style="background-color: ${quizzIndividual[i].color}">
                    <span class="enunciado">${quizzIndividual[i].title}</span>
                </div>
                <div class="respostas-${i}"  id ="${i}">
                </div>
            </div>
            `
            const respostas = document.querySelector(`.respostas-${i}`)
            const embaralharRespostas = quizzIndividual[i].answers
            embaralharRespostas.sort(comparador)
            for (let j = 0; j < quizzIndividual[i].answers.length; j++) {
                respostas.innerHTML += 
                `
                <div class="resposta" data-identifier="answer" onclick="clicarresposta(this)">
                    <img id="rimg" src="${quizzIndividual[i].answers[j].image}">
                    <span id="rtxt" class="tituloResposta">${quizzIndividual[i].answers[j].text}</span>
                </div>
                `   
            } 
        }
    } )
    quizz.catch(() => alert("ERRO2!"))
}

//FUNCAO DO COMPORTAMENTO DE RESPOSTAS

function clicarresposta(respQuizz)
{
    const divRespostasAtuais = respQuizz.parentNode;
    
    const respostasQuizzAtual = quizzSelecionado[parseInt(divRespostasAtuais.id)].answers;

    var respostaCerta;

    var elements = divRespostasAtuais.getElementsByClassName("resposta");

    
    for (let i = 0; i < respostasQuizzAtual.length; i++)
    {
        if (respostasQuizzAtual[i].isCorrectAnswer == true)
        respostaCerta = respostasQuizzAtual[i];
        
    }

    if (respQuizz.querySelector('img').src == respostaCerta.image && respQuizz.querySelector('span').textContent == respostaCerta.text)
    {
        respostasCertas = respostasCertas + 1;
        console.log(respostasCertas);
    }
  
    
    function transformaResposta(item)
    {
        if (item.querySelector('img').src == respostaCerta.image && item.querySelector('span').textContent == respostaCerta.text)
        {
            item.querySelector('span').style.color = "#009C22";
        }

        else
        {
            item.querySelector('span').style.color = "#FF4B4B";    
        }
        
        item.style.opacity = 0.3;
        item.style.pointerEvents = 'none';
    }

    for(let i = 0; i<elements.length; i++)
    {
        transformaResposta(elements[i]);
    }

    respQuizz.style.opacity = 1;
    quizzesRespondidos = quizzesRespondidos + 1;

    let next = parseInt(divRespostasAtuais.id) + 1;

    if (quizzesRespondidos != elements.length)
    setTimeout(() => {document.getElementById(`${next}`).scrollIntoView({block: "center"})}, 2000);

    else
    {
        let pontuacao = Math.ceil( (respostasCertas / (elements.length))*100);
        let cont;
        
        for (let i = 0; i < niveis.length; i++)
        {
            
            if(pontuacao >= niveis[i].minValue)
            {
                cont = i;
            }
            
            else
            {
            break;
            }
            
        }

        const final = document.querySelector(".finalizacao");

        final.innerHTML = 
                `
                <div class="finalizahead" style="padding: 40px;">
                    ${niveis[cont].title}
                </div>
                <div class="corpoFinalizacao" style="display: flex; flex: wrap;">
                    <img src=${niveis[cont].image}></img>
                    <div class="descricao">
                        <p style="width: 100%; word-wrap: break-word;">${niveis[cont].text}</p>
                    </div>
                </div>
                
                <div class="finalizabotao" onclick="reiniciaQuizz()" style="background-color: #EC362D; color: white;"><p style="margin-top: 12px;">Reiniciar Quizz</p></div>
                <div class="finalizabotao" onclick="voltarHome()" style="background-color: #E5E5E5; color: #818181;"><p style="margin-top: 12px;">Voltar Pra Home</p></div>
                `;

                setTimeout(() => {document.getElementById("caixafinal").scrollIntoView({block: "center"})}, 2000);
        
    }

}

//FUNCAO QUE REINICIA O QUIZZ

function reiniciaQuizz(){
    quizzesRespondidos = 0;
    respostasCertas = 0;
    window.scrollTo(0, 0);
    const final = document.querySelector(".finalizacao");
    
    final.innerHTML =``;

    var elements = document.getElementsByClassName("resposta");

    for (let i = 0; i<elements.length; i++)
    {
        elements[i].style.opacity = 1.0;
        elements[i].style.pointerEvents = 'auto';
        elements[i].querySelector('span').style.color = "#000000";
    }
}

//FUNCAO QUE VOLTA PARA A TELA INICIAL

function voltarHome(){

    quizzesRespondidos = 0;
    respostasCertas = 0;

    const listaQuizz = document.querySelector(".principal");
    const quizz = document.querySelector(".quizzIndividual");
    listaQuizz.classList.remove("escondido");
    quizz.classList.add("escondido");

    const perguntas = document.querySelector(".perguntas");
    perguntas.innerHTML = ``;

    const final = document.querySelector(".finalizacao");
    final.innerHTML =``;

}
