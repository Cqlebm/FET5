let X_CLASS = 'x'
let CIRCLE_CLASS = 'circle'
let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let cellElements = document.querySelectorAll('[data-cell]')
let board = document.getElementById('board')
let winningMessageElement = document.getElementById('winningMessage')
let winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true })   
    })
    setBoardHoverClass()
}

function handleClick(e){
    console.log('clicked')
    let cell = e.target
    let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else{
        swapTurns()
    setBoardHoverClass()
    }
}

function endGame(draw){
    if (draw){
        winningMessageElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageTextElement.classList.add('show')
}

function isDraw(){
    return cellElements.every(cell =>{
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){

    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    setBoardHoverClass.classList.remove(X_CLASS)
    setBoardHoverClass.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        setBoardHoverClass.classList.add(CIRCLE_CLASS)
    } else{
        setBoardHoverClass.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return winningCombinations.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

