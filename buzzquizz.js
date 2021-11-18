function receberQuizzes() {
    const infoQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");

    infoQuizzes.then(listarQuizzes)
    infoQuizzes.catch(() => alert("ERRO!"))
}

function listarQuizzes(info) {
    const quizzes = info.data
    console.log(quizzes)

    const todosOsQuizzes = document.querySelector(".todosOsQuizzes")

    for (let i = 0; i < quizzes.length; i++) {
        let quizzUnico = quizzes[i]
        todosOsQuizzes.innerHTML += 
            `
            <div class="quizz">
                <img src="${quizzUnico.image}"/>
                <span class="tituloQuizz">
                    ${quizzUnico.title}
                </span>
            </div>
            `
    }
}

receberQuizzes();