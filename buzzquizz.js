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
            <div class="quizz" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.1%, #000000 100%), url(${quizzUnico.image})" onclick="quizzIndividual()">
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
    const quizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/1`)

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
            <div class="pergunta">
                <div class="tituloPergunta" style="background-color: ${quizzIndividual[i].color}">
                    <span class="enunciado">${quizzIndividual[i].title}</span>
                </div>
                <div class="respostas">
                </div>
            </div>
            `
            for (let j = 0; j < quizzIndividual[i].answers.length; j++) {
                const respostas = document.querySelector(".respostas")
                respostas.innerHTML += 
                `
                <div class="resposta">
                    <img src="${quizzIndividual[i].answers[j].image}">
                    <span class="tituloResposta">${quizzIndividual[i].answers[j].text}</span>
                </div>
                `   
            }
        }
    } )
    quizz.catch(() => alert("ERRO2!"))
}

receberQuizzUnico();