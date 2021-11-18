function receberQuizzes() {
    const infoQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");

    infoQuizzes.then(listarQuizzes)
    infoQuizzes.catch(() => alert("ERRO!"))
}

function listarQuizzes(info) {
    const quizzes = info.data

    const todosOsQuizzes = document.querySelector(".todosOsQuizzes")

    for (let i = 0; i < quizzes.length; i++) {
        let quizzUnico = quizzes[i]
        todosOsQuizzes.innerHTML += 
            `
            <div class="quizz" onclick="quizzIndividual()">
                <img src="${quizzUnico.image}"/>
                <span class="tituloQuizz">
                    ${quizzUnico.title}
                </span>
            </div>
            `
    }
}

receberQuizzes();

function quizzIndividual () {
    const quizz = document.querySelector(".quizzIndividual")
    quizz.classList.toggle("escondido")
}

function receberQuizzUnico () {
    const quizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/1")

    quizz.then(perguntasRespostas)
    quizz.catch(() => alert("ERRO2!"))
}

function perguntasRespostas (info) {
    const quizz = info.data;
    console.log(quizz.title)
    const perguntas = document.querySelector(".quizzIndividual")

    for (let i = 0; i < quizz.length; i++) {
        perguntas.innerHTML = 
        `
        <div class="topoQuizz">
            <img src="${quizz.image}"/>                   
            <span class="tituloQuizzIndividual">
                ${quizz.title}
            </span>
        </div>
        <div class="pergunta">
            <div class="tituloPergunta">
            </div>
            <div class="respostas">
                <img src="">
                <span class="tituloResposta"></span>
            </div>
        </div>
        `
    }
}

receberQuizzUnico();