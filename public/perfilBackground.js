const canvas = document.getElementById('matrix-perfil')
const perfil = document.querySelector('.perfil')
const context = canvas.getContext('2d')

canvas.width = perfil.clientWidth
canvas.height = perfil.clientHeight

const bin = '01'

const fontSize = 18
const columns = canvas.width / fontSize

const rainDrops = []

for (let x = 0; x < columns; x++) {
  rainDrops[x] = 1
}
//2C3E50
const draw = () => {
  context.fillStyle = 'rgba(0,0,0,0.05)'
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = '#2C3E50'
  context.font = fontSize + 'px monospace'

  for (let i = 0; i < rainDrops.length; i++) {
    const text = bin.charAt(Math.floor(Math.random() * bin.length))
    context.fillText(text, i * fontSize, rainDrops[i] * fontSize)

    if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      rainDrops[i] = 0
    }
    rainDrops[i]++
  }
}

setInterval(draw, 60)

window.onresize = function () {
  location.reload()
}
