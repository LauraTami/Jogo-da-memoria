const images=['Img1.jpg','Img2.jpg','Img3.jpg','Img4.jpg','Img5.jpg','Img6.jpg','Img7.jpg','Img8.jpg','Img9.jpg','Img10.jpg'];

let cards=[];
let firstCard=null;
let secondCard=null;
let lockCard=false;
let score=0;
let timeLeft=90;
let timerInterval;

function startGame(){
    const gameBoard=document.getElementById('gameBoard');
    const scoreDisplay= document.getElementById('score');
    const timerDisplay= document.getElementById('timer')
    gameBoard.innerHTML='';
    scoreDisplay.textContent=`Pontuação:${score}`;
    timerDisplay.textContent=`Tempo restante:${timeLeft}s`;
    cards=[];

    clearInterval(timerInterval);
    timerInterval=setInterval(()=>{
        timeLeft--;
        timerDisplay.textContent=`Tempo restante:${timeLeft}s`;
        if(timeLeft<=0){
            clearInterval(timerInterval);
            alert('Tempo esgotado!');
            resetGame();
        }
        else if(score==10){
            clearInterval(timerInterval);
            alert('Você venceu!')
            resetGame();
        }
    },1000);

    const shuffledImages= [...images, ...images].sort(()=>0.5-Math.random());

    shuffledImages.forEach((Img)=>{
        const card=document.createElement('div');
        card.classList.add('card');
        card.innerHTML=`<div class="card-inner">
        <div class="card-front"> </div>
        <div class="card-back" style="background-image:url(${Img});"> </div>
        </div>`;
        card.addEventListener('click',()=>flipCard(card));
        gameBoard.appendChild(card);
        cards.push(card);
    });
}
function flipCard(card){
    if(lockCard||card==firstCard||card.classList.contains('flip'))return;
    card.classList.add('flip');
    if(!firstCard){
        firstCard= card;
    }else{
        secondCard=card;
        checkForMatch();
    }
}
function checkForMatch(){
    const isMatch=firstCard.querySelector('.card-back').style.backgroundImage==secondCard.querySelector('.card-back').style.backgroundImage;
    if(isMatch){
        disableCards();
        updateScore();
    }else{
        unflipCards();
    }
}
function updateScore(){
    score++;
    const scoreDisplay= document.getElementById('score');
    scoreDisplay.textContent=`Pontuação:${score}`;
}
function disableCards(){
    firstCard.removeEventListener('click',()=>flipCard(firstCard));
    secondCard.removeEventListener('click',()=>flipCard(secondCard));
    resetBoard();
}
function resetBoard(){
    [firstCard, secondCard, lockCard]=[null, null, false];
}
function unflipCards(){
    lockCard=true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    },1000);
}
function resetGame(){
    score=0;
    timeLeft=90;
    startGame();
}
window.onload=()=>{
    document.getElementById('restart').addEventListener('click',resetGame);
    startGame();
};