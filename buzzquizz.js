// VARIÁVEIS GLOBAIS //
let quizzUnico;
let quizzID;

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
                <div class="respostas-${i}">
                </div>
            </div>
            `
            const respostas = document.querySelector(`.respostas-${i}`)
            const embaralharRespostas = quizzIndividual[i].answers
            embaralharRespostas.sort(comparador)
            for (let j = 0; j < quizzIndividual[i].answers.length; j++) {
                respostas.innerHTML += 
                `
                <div class="resposta" data-identifier="answer" onclick="">
                    <img src="${quizzIndividual[i].answers[j].image}">
                    <span class="tituloResposta">${quizzIndividual[i].answers[j].text}</span>
                </div>
                `   
            } 
        }
    } )
    quizz.catch(() => alert("ERRO2!"))
}
