const postText = document.querySelector('#postText')

function adicionarTitulo() {
  postText.value += '<h4> </h4>'
}

function adicionarTexto() {
  postText.value += '<p> </p>'
}

function adicionarCode() {
  postText.value += '<code> </code>'
}

function adicionarPre() {
  postText.value += '<pre> </pre>'
}
