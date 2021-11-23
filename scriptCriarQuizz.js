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
let questoesUsuario;
let niveisUsuario;
let quizzUsuario = {
    title: tituloQuizz,
    image: linkBannerQuizz,
    questions: questoesUsuario,
    levels: niveisUsuario
}

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
    linkBannerQuizz = document.querySelector(".linkBannerQuizz").value;
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
    } else validado.classList.add("escondido"), validado2.classList.remove("escondido");

    validado2.innerHTML = 
    `<h2>Crie suas perguntas</h2>
        <div class="perguntaQuizz 1">
            <h3>Pergunta 1</h3>
            <div class="inputs">
                <input type="text" placeholder="Texto da pergunta" class="textoPergunta-1" data-identifier="question">
                <input type="text" placeholder="Cor de fundo da pergunta" class="corPergunta-1" data-identifier="question">
                <h3>Resposta correta</h3>
                <input type="text" placeholder="Resposta correta" class="textoRespostaCorreta-1" data-identifier="question">
                <input type="text" placeholder="URL da imagem" class="linkImagemRespostaC-1" data-identifier="question">
                <h3>Respostas incorretas</h3>
                <input type="text" placeholder="Resposta incorreta 1" class="incorreta1-1" data-identifier="question">
                <input type="text" placeholder="URL da imagem 1" class="linkImagemRespostaI1-1" data-identifier="question">
                <input type="text" placeholder="Resposta incorreta 2" class="incorreta2-1" data-identifier="question">
                <input type="text" placeholder="URL da imagem 2" class="linkImagemRespostaI2-1" data-identifier="question">
                <input type="text" placeholder="Resposta incorreta 3" class="incorreta3-1" data-identifier="question">
                <input type="text" placeholder="URL da imagem 3" class="linkImagemRespostaI3-1" data-identifier="question">
            </div>
        </div>
    <div class="perguntasTotalQuizz">
    </div>   
    <div class="botaoCriandoQuizz" onclick="validarPerguntaQuizz()">
        <span class="textoBotao">
            Prosseguir para criar níveis
        </span>
    </div>`

    for (let i = 1; i < qtePerguntas; i++) {
        let perguntas = document.querySelector(".perguntasTotalQuizz")
        perguntas.innerHTML += `
        <div class="perguntaQuizz perguntaQuizzFechada ${i+1}">
        <span class="tituloARemover">Pergunta ${i+1}</span>
            <div class="inputs escondido">
                <h3>Pergunta ${i+1}</h3>
                <input type="text" placeholder="Texto da pergunta" class="textoPergunta-${i+1}" data-identifier="question">
                <input type="text" placeholder="Cor de fundo da pergunta" class="corPergunta-${i+1}" data-identifier="question">
                <h3>Resposta correta</h3>
                <input type="text" placeholder="Resposta correta" class="textoRespostaCorreta-${i+1}" data-identifier="question">
                <input type="text" placeholder="URL da imagem" class="linkImagemRespostaC-${i+1}" data-identifier="question">
                <h3>Respostas incorretas</h3>
                <input type="text" placeholder="Resposta incorreta 1" class="incorreta1-${i+1}" data-identifier="question">
                <input type="text" placeholder="URL da imagem 1" class="linkImagemRespostaI1-${i+1}" data-identifier="question">
                <input type="text" placeholder="Resposta incorreta 2" class="incorreta2-${i+1}" data-identifier="question">
                <input type="text" placeholder="URL da imagem 2" class="linkImagemRespostaI2-${i+1}" data-identifier="question">
                <input type="text" placeholder="Resposta incorreta 3" class="incorreta3-${i+1}" data-identifier="question">
                <input type="text" placeholder="URL da imagem 3" class="linkImagemRespostaI3-${i+1}" data-identifier="question">
            </div>
        <ion-icon class="botaoExpandir" name="create-outline" data-identifier="expand" onclick="expandir(this)"></ion-icon>        
        </div>`
    }
}

function validarPerguntaQuizz () {
        textoPergunta = document.querySelector(".textoPergunta-1").value;
        corPergunta = document.querySelector(".corPergunta-1").value;
        textoRespostaCorreta = document.querySelector(".textoRespostaCorreta-1").value;
        textoRespostaIncorreta = document.querySelector(".incorreta1-1").value;
        imagemRespostaCorreta = document.querySelector(".linkImagemRespostaC-1").value;
        imagemRespostaIncorreta = document.querySelector(".linkImagemRespostaI1-1").value;
        let corCorreta = /^#[0-9A-F]{6}$/i.test(corPergunta)
        let validado = document.querySelector(".perguntasDoQuizz")
        let validado2 = document.querySelector(".niveisDoQuizz")
        let validacao1; let validacao2;

        if (textoPergunta === '' || textoPergunta.length < 20) {
            alert("Texto da pergunta deve conter no mínimo 20 caracteres")
        } else if (corCorreta === false) {
            alert(`Insira uma cor no formato hexadecimal (começar em "#", seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)`)
        } else if (textoRespostaCorreta === "" || textoRespostaIncorreta === "" || imagemRespostaIncorreta === "") {
            alert("Inserir ao menos uma resposta correta e uma resposta incorreta (com links das imagens)")
        } else if (isValidUrl(imagemRespostaCorreta) === false || imagemRespostaCorreta === "" || isValidUrl(imagemRespostaIncorreta) === false || imagemRespostaIncorreta === "") {
            alert("URL inválida")
        } else validacao1 = true

        for (let i = 1; i < qtePerguntas; i++) {
            let textoPerguntaI = document.querySelector(`.textoPergunta-${i+1}`).value;
            let corPerguntaI = document.querySelector(`.corPergunta-${i+1}`).value;
            let corCorretaI = /^#[0-9A-F]{6}$/i.test(corPerguntaI)
            let textoRespostaCorretaI = document.querySelector(`.textoRespostaCorreta-${i+1}`).value;
            let textoRespostaIncorretaI = document.querySelector(`.incorreta1-${i+1}`).value;
            let imagemRespostaCorretaI = document.querySelector(`.linkImagemRespostaC-${i+1}`).value;
            let imagemRespostaIncorretaI = document.querySelector(`.linkImagemRespostaI1-${i+1}`).value;

            if (textoPerguntaI === '' || textoPerguntaI.length < 20) {
                alert("Texto da pergunta deve conter no mínimo 20 caracteres")
            } else if (corCorretaI === false) {
                alert(`Insira uma cor no formato hexadecimal (começar em "#", seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)`)
            } else if (textoRespostaCorretaI === "" || textoRespostaIncorretaI === "" || imagemRespostaIncorretaI === "") {
                alert("Inserir ao menos uma resposta correta e uma resposta incorreta (com links das imagens)")
            } else if (isValidUrl(imagemRespostaCorretaI) === false || imagemRespostaCorretaI === "" || isValidUrl(imagemRespostaIncorretaI) === false || imagemRespostaIncorretaI === "") {
                alert("URL inválida")
            } else validacao2 = true
        }

        if (validacao1 && validacao2) {
            validado.classList.add("escondido"), validado2.classList.remove("escondido"); 
        }

    validado2.innerHTML = 
    `<h2>Agora, decida os níveis</h2>
    <div class="nivelQuizz 1">
        <h3>Nível 1</h3>
        <div class="inputs">  
            <input type="text" placeholder="Título do nível" class="tituloNivel-1" data-identifier="level">
            <input type="text" placeholder="% de acerto mínima" class="pctAcerto-1" data-identifier="level">
            <input type="text" placeholder="URL da imagem do nível" class="linkImagemNivel-1" data-identifier="level">
            <input type="text" placeholder="Descrição do nível" class="descricaoNivel-1" data-identifier="level">
        </div>
    </div>
    <div class="nivelTotalQuizz">
    </div>
    <div class="botaoCriandoQuizz" onclick="criarQuizz()">
        <span class="textoBotao">
            Finalizar Quizz
        </span>
    </div>`

    for (let i = 1; i < qteNiveis; i++) {
        let niveisTotalQuizz = document.querySelector(".nivelTotalQuizz") 
        niveisTotalQuizz.innerHTML += `
        <div class="nivelQuizz nivelQuizzFechado ${i+1}">
        <span class="tituloARemover">Nível ${i+1}</span> 
            <div class="inputs escondido">
                <h3>Nível ${i+1}</h3> 
                <input type="text" placeholder="Título do nível" class="tituloNivel-${i+1}" data-identifier="level">
                <input type="text" placeholder="% de acerto mínima" class="pctAcerto-${i+1}" data-identifier="level">
                <input type="text" placeholder="URL da imagem do nível" class="linkImagemNivel-${i+1}" data-identifier="level">
                <input type="text" placeholder="Descrição do nível" class="descricaoNivel-${i+1}" data-identifier="level">
            </div>
        <ion-icon class="botaoExpandir" name="create-outline" data-identifier="expand" onclick="expandir(this)"></ion-icon>
        </div>`
    }
}

function criarQuizz () {
    tituloNivel = document.querySelector(".tituloNivel-1").value;
    pctAcerto = document.querySelector(".pctAcerto-1").value;
    linkImagemNivel = document.querySelector(".linkImagemNivel-1").value;
    descricaoNivel = document.querySelector(".descricaoNivel-1").value;
    let validado = document.querySelector(".niveisDoQuizz");
    let validado2 = document.querySelector(".quizzCriado");
    let validacao1; let validacao2;

    
    if (tituloNivel.length < 10 || tituloNivel === '') {
        alert("Texto da pergunta deve conter no mínimo 10 caracteres")
    } else if (pctAcerto < 0 && pctAcerto > 100 || pctAcerto === "") {
        alert("Porcentagem de acerto mínima entre 0% e 100%") 
    } else if (isValidUrl(linkImagemNivel) === false || linkImagemNivel === "") {
        alert("URL inválida") 
    } else if (descricaoNivel.length < 30) {
        alert("Texto da descrição deve conter no mínimo 30 caracteres")
    } else validacao1 = true;

    for (let i = 1; i < qteNiveis; i++) {
        let tituloNivelI = document.querySelector(`.tituloNivel-${i+1}`).value;
        let pctAcertoI = document.querySelector(`.pctAcerto-${i+1}`).value;
        let linkImagemNivelI = document.querySelector(`.linkImagemNivel-${i+1}`).value;
        let descricaoNivelI = document.querySelector(`.descricaoNivel-${i+1}`).value;
        if (tituloNivelI.length < 10 || tituloNivelI === '') {
            alert("Texto da pergunta deve conter no mínimo 10 caracteres")
        } else if (pctAcertoI < 0 && pctAcertoI > 100 || pctAcertoI === "") {
            alert("Porcentagem de acerto mínima entre 0% e 100%") 
        } else if (isValidUrl(linkImagemNivelI) === false || linkImagemNivelI === "") {
            alert("URL inválida") 
        } else if (descricaoNivelI.length < 30) {
            alert("Texto da descrição deve conter no mínimo 30 caracteres")
        } else validacao2 = true
    }

    if (validacao1 && validacao2) { 
        validado.classList.add("escondido"), validado2.classList.remove("escondido");
    }

    let imagemQuizz = document.querySelector(".imagemQuizz")
    imagemQuizz.innerHTML = ` 
    <div class="quizz ${quizzID}" data-identifier="quizz-card" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.1%, #000000 100%), url(${linkBannerQuizz})" onclick="quizzIndividual(this)">
        <span class="listaDeQuizzes">
            ${tituloQuizz}
        </span>
    </div>`
}

function expandir (botao) {
    let divBotao = botao.parentElement
    let inputEscondido = divBotao.children[1]
    let botaoExpandir = document.querySelector(".botaoExpandir")
    let tituloARemover = document.querySelector(".tituloARemover")
    
    divBotao.classList.remove("perguntaQuizzFechada")
    divBotao.classList.remove("nivelQuizzFechado")
    inputEscondido.classList.remove("escondido")
    divBotao.removeChild(botaoExpandir)
    divBotao.removeChild(tituloARemover)
}

function voltarHome () {
    document.location.reload(true)
}

function isValidUrl(string) {
    try {
      new URL(string);
    } catch (_) {
      return false;  
    }
    return true;
}

