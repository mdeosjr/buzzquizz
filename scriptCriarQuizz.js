function telaDeCriarQuizz () {
    const listaQuizzes = document.querySelector(".telaQuizzes")
    const criandoQuizzes = document.querySelector(".criandoQuizz")
    listaQuizzes.classList.add("escondido")
    criandoQuizzes.classList.remove("escondido")
}

function validarInfosBasicas () {
    let titulo = document.querySelector(".titulo").value;
    let qtePerguntas = document.querySelector(".qtePerguntas").value;
    let qteNiveis = document.querySelector(".qteNiveis").value;
    let linkImagem = document.querySelector(".linkImagem").value
    let validado = document.querySelector(".infosBasicas")
    let validado2 = document.querySelector(".perguntasDoQuizz")

    if (titulo === "" || titulo.length < 20 || titulo.length > 65) {
        alert("Título deve conter no mínimo 20 caracteres e no máximo 65")
    } else if (qtePerguntas < 3 || qtePerguntas === "") {
        alert("Mínimo de 3 perguntas")
    } else if (qteNiveis < 2 || qteNiveis === "") {
        alert("Mínimo de 2 níveis")
    } else if (isValidUrl(linkImagem) === false || linkImagem === "") {
        alert("URL inválida")
    }
    else validado.classList.add("escondido"), validado2.classList.remove("escondido");
}

function validarPerguntaQuizz () {
    let textoPergunta = document.querySelector(".textoPergunta").value;
    let corPergunta = document.querySelector(".corPergunta").value;
    let textoResposta = document.querySelector(".textoRespostaCorreta").value;
    let textoRespostaIncorreta = document.querySelector(".incorreta1").value;
    let linkImagem = document.querySelector(".linkImagemRespostaC").value;
    let linkImagemIncorreta = document.querySelector(".linkImagemRespostaI1").value;
    let corCorreta = /^#[0-9A-F]{6}$/i.test(corPergunta)

    if (textoPergunta === '' || textoPergunta.length < 20) {
        alert("Texto da pergunta deve conter no mínimo 20 caracteres")
    } else if (corCorreta === false) {
        alert(`Insira uma cor no formato hexadecimal (começar em "#", seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)`)
    } else if (textoResposta === "" || textoRespostaIncorreta === "" || linkImagemIncorreta === "") {
        alert("Texto da resposta não pode estar vazio")
    } else if (isValidUrl(linkImagem) === false || linkImagem === "") {
        alert("URL inválida")
    } 
    else return;
}

function criarQuizz () {
    let tituloNivel = document.querySelector(".tituloNivel").value;
    let pctAcerto = document.querySelector(".pctAcerto").value;
    let linkImagemNivel = document.querySelector(".linkImagemNivel").value;
    let descricaoNivel = document.querySelector(".descricaoNivel").value;
    // let linkImagem = document.querySelector(".linkImagemRespostaC").value;
    // let linkImagemIncorreta = document.querySelector(".linkImagemRespostaI1").value;
    console.log(isValidUrl(linkImagemNivel))

    if (tituloNivel.length < 10 || tituloNivel === '') {
        alert("Texto da pergunta deve conter no mínimo 10 caracteres")
    } else if (pctAcerto < 0 && pctAcerto > 100 || pctAcerto === "") {
        alert("Porcentagem de acerto mínima entre 0% e 100%") 
    } else if (isValidUrl(linkImagemNivel) === false || linkImagemNivel === "") {
        alert("URL inválida") 
    } else if (descricaoNivel.length < 30) {
        alert("Texto da descrição deve conter no mínimo 30 caracteres")
    }
}

function isValidUrl(string) {
    try {
      new URL(string);
    } catch (_) {
      return false;  
    }
    return true;
}
