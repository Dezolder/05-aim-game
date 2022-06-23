const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
let time = 0
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let score = 0
const colors = ['#16217b', '#1b297c', '#4a42a8', '#7159bd', '#8861ba','#00abca', '#a667bd']

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => {
    // const aim = event.target
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

// DEBUG
// startGame()

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {

    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`

}

function finishGame() {
timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Ваш счёт: <span class="primary" >${score}</span></h1>`
}
function createRandomCircle() {
    const circle = document.createElement('div')
    const { width, height } = board.getBoundingClientRect()
    const size = getRandomNumber(10, 60)
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    circle.style.background = colors[getRandomNumber(0, colors.length)]

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}