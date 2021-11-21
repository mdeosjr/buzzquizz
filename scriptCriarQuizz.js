let tituloQuizz;
let linkBannerQuizz;
let qtePerguntas;
let qteNiveis;
let textoPergunta;
let corPergunta;
let textoRespostaCorreta;
let textoRespostaIncorreta;
let imagemRespostaCorreta;
let imagemRespostaIncorreta;
let tituloNivel;
let pctAcerto;
let linkImagemNivel;
let descricaoNivel;

function telaDeCriarQuizz () {
    const listaQuizzes = document.querySelector(".telaQuizzes")
    const criandoQuizzes = document.querySelector(".criandoQuizz")
    listaQuizzes.classList.add("escondido")
    criandoQuizzes.classList.remove("escondido")
}

function validarInfosBasicas () {
    tituloQuizz = document.querySelector(".titulo").value;
    qtePerguntas = document.querySelector(".qtePerguntas").value;
    qteNiveis = document.querySelector(".qteNiveis").value;
    linkBannerQuizz = document.querySelector(".linkImagem").value;
    let validado = document.querySelector(".infosBasicas")
    let validado2 = document.querySelector(".perguntasDoQuizz")
    
    if (tituloQuizz === "" || tituloQuizz.length < 20 || tituloQuizz.length > 65) {
        alert("Título deve conter no mínimo 20 caracteres e no máximo 65") 
    }   else if (isValidUrl(linkBannerQuizz) === false || linkBannerQuizz === "") {
        alert("URL inválida")
    } else if (qtePerguntas < 3 || qtePerguntas === "") {
        alert("Mínimo de 3 perguntas")
    } else if (qteNiveis < 2 || qteNiveis === "") {
        alert("Mínimo de 2 níveis")
    } 

    validado2.innerHTML = 
    `<h2>Crie suas perguntas</h2>
    <div class="perguntaQuizz">
    </div>
    <div class="quizzFM">
    </div>    
    <div class="botaoCriandoQuizz" onclick="validarPerguntaQuizz()">
        <span class="textoBotao">
            Prosseguir para criar níveis
        </span>
    </div>`

    for (let i = 0; i < qtePerguntas; i++) {
        let perguntas = document.querySelector(".perguntaQuizz")
        perguntas.innerHTML = 
        `
        <h3>Pergunta 1</h3>
        <input type="text" placeholder="Texto da pergunta" class="textoPergunta" data-identifier="question">
        <input type="text" placeholder="Cor de fundo da pergunta" class="corPergunta" data-identifier="question">
        <h3>Resposta correta</h3>
        <input type="text" placeholder="Resposta correta" class="textoRespostaCorreta" data-identifier="question">
        <input type="text" placeholder="URL da imagem" class="linkImagemRespostaC" data-identifier="question">
        <h3>Respostas incorretas</h3>
        <input type="text" placeholder="Resposta incorreta 1" class="incorreta1" data-identifier="question">
        <input type="text" placeholder="URL da imagem 1" class="linkImagemRespostaI1" data-identifier="question">
        <input type="text" placeholder="Resposta incorreta 2" class="incorreta2" data-identifier="question">
        <input type="text" placeholder="URL da imagem 2" class="linkImagemRespostaI2" data-identifier="question">
        <input type="text" placeholder="Resposta incorreta 3" class="incorreta3" data-identifier="question">
        <input type="text" placeholder="URL da imagem 3" class="linkImagemRespostaI3" data-identifier="question">
            
        `
    }

    for (let i = 0; i < qtePerguntas - 1; i++) {
        let perguntaFechada = document.querySelector(".quizzFM")
        perguntaFechada.innerHTML += `
        <div class="perguntaQuizzFechada">
            <h3>Pergunta ${i+2}</h3>
            <ion-icon name="create-outline" data-identifier="expand"></ion-icon>
        </div>`
    }

    validado.classList.add("escondido"), validado2.classList.remove("escondido");
}

function validarPerguntaQuizz () {
    textoPergunta = document.querySelector(".textoPergunta").value;
    corPergunta = document.querySelector(".corPergunta").value;
    textoRespostaCorreta = document.querySelector(".textoRespostaCorreta").value;
    textoRespostaIncorreta = document.querySelector(".incorreta1").value;
    imagemRespostaCorreta = document.querySelector(".linkImagemRespostaC").value;
    imagemRespostaIncorreta = document.querySelector(".linkImagemRespostaI1").value;
    let corCorreta = /^#[0-9A-F]{6}$/i.test(corPergunta)
    let validado = document.querySelector(".perguntasDoQuizz")
    let validado2 = document.querySelector(".niveisDoQuizz")
    
    if (textoPergunta === '' || textoPergunta.length < 20) {
        alert("Texto da pergunta deve conter no mínimo 20 caracteres")
    } else if (corCorreta === false) {
        alert(`Insira uma cor no formato hexadecimal (começar em "#", seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)`)
    } else if (textoRespostaCorreta === "" || textoRespostaIncorreta === "" || imagemRespostaIncorreta === "") {
        alert("Inserir ao menos uma resposta correta e uma resposta incorreta (com links das imagens)")
    } else if (isValidUrl(imagemRespostaCorreta) === false || imagemRespostaCorreta === "" || isValidUrl(imagemRespostaIncorreta) === false || imagemRespostaIncorreta === "") {
        alert("URL inválida")
    } 

    validado2.innerHTML = 
    `<h2>Agora, decida os níveis</h2>
    <div class="nivelQuizz">
    </div>
    <div class="nivelFM">
    </div>
    <div class="botaoCriandoQuizz" onclick="criarQuizz()">
        <span class="textoBotao">
            Finalizar Quizz
        </span>
    </div>`

    for (let i = 0; i < qteNiveis; i++) {
        let nivelQuizz = document.querySelector(".nivelQuizz") 
        nivelQuizz.innerHTML = `
        <h3>Nível 1</h3>  
        <input type="text" placeholder="Título do nível" class="tituloNivel" data-identifier="level">
        <input type="text" placeholder="% de acerto mínima" class="pctAcerto" data-identifier="level">
        <input type="text" placeholder="URL da imagem do nível" class="linkImagemNivel" data-identifier="level">
        <input type="text" placeholder="Descrição do nível" class="descricaoNivel" data-identifier="level">`
    }

    for (let i = 0; i < qteNiveis - 1; i++) {
        let nivelFM = document.querySelector(".nivelFM")
        nivelFM.innerHTML += `
        <div class="nivelQuizzFechado">
            <h3>Nível ${i+2}</h3>
            <ion-icon name="create-outline" data-identifier="expand"></ion-icon>
        </div>
        `
    }

    validado.classList.add("escondido"), validado2.classList.remove("escondido");
}

function criarQuizz () {
    tituloNivel = document.querySelector(".tituloNivel").value;
    pctAcerto = document.querySelector(".pctAcerto").value;
    linkImagemNivel = document.querySelector(".linkImagemNivel").value;
    descricaoNivel = document.querySelector(".descricaoNivel").value;
    let validado = document.querySelector(".niveisDoQuizz");
    let validado2 = document.querySelector(".quizzCriado")
    
    if (tituloNivel.length < 10 || tituloNivel === '') {
        alert("Texto da pergunta deve conter no mínimo 10 caracteres")
    } else if (pctAcerto < 0 && pctAcerto > 100 || pctAcerto === "") {
        alert("Porcentagem de acerto mínima entre 0% e 100%") 
    } else if (isValidUrl(linkImagemNivel) === false || linkImagemNivel === "") {
        alert("URL inválida") 
    } else if (descricaoNivel.length < 30) {
        alert("Texto da descrição deve conter no mínimo 30 caracteres")
    } else validado.classList.add("escondido"), validado2.classList.remove("escondido");

    let imagemQuizz = document.querySelector(".imagemQuizz")
    imagemQuizz.innerHTML = ` 
    <div class="quizz ${quizzID}" data-identifier="quizz-card" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.1%, #000000 100%), url(${linkBannerQuizz})" onclick="quizzIndividual(this)">
        <span class="listaDeQuizzes">
            ${tituloQuizz}
        </span>
    </div>`
}

function isValidUrl(string) {
    try {
      new URL(string);
    } catch (_) {
      return false;  
    }
    return true;
}
