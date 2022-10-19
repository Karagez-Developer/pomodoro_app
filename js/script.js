// Необходимые элементы управления
const selectWork = document.querySelector('#work-time');
const selectBreak = document.querySelector('#break-time');
const numTimer = document.querySelector('.number');
const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const skipBtn = document.querySelector('#skip-btn');
const selects = document.getElementsByTagName('select');
const input = document.querySelector('input');
const song = document.querySelector('.song');
const inner = document.querySelector('.inner');
const body = document.body;

// Элементы анимации

const leftAnimation = document.querySelector('.circle .left .progress');
const rightAnimation = document.querySelector('.circle .right .progress');


let valWork = '25';
let valBreak = '5';

// Получаем значение из select для работы
selectWork.addEventListener('change', function(e) {
    e.preventDefault();

    valWork = this.value;
    valWork = valWork.match(/[0-9]/g).join('');

    numTimer.textContent = valWork + ':00';

    clearInterval(timer);

    numTimer.classList.toggle('active');

    startBtn.src = './img/continue.png';

    // Обнуляем анимацию
    leftAnimation.style.animation = 'none';
    rightAnimation.style.animation = 'none';
    rightAnimation.style.animationDelay = '0s';
})



// Продолжить и пауза
startBtn.addEventListener('click', function(e) {
    e.preventDefault();

    numTimer.classList.toggle('active');

    if (numTimer.classList.contains('active')) {

        startBtn.src = './img/pause.png';
        startBtn.style.width = '36px';
        startBtn.style.height = '36px';

        if (numTimer.textContent.length === 4) {
            numTimer.textContent = '0' + numTimer.textContent;
        }

        // Запуск самого таймера
        let time = ( +(numTimer.textContent.slice(0, 2)) + ( +(numTimer.textContent.slice(3, 5)) / 60 ) ) * 60;
        console.log(numTimer.textContent);
        console.log(time);
        timer = setInterval(() => {
                        
            // Анимация во времени
            leftAnimation.style.animationPlayState = 'running';
            rightAnimation.style.animationPlayState = 'running';
            leftAnimation.style.animation = `left ${time}s linear both`;
            rightAnimation.style.animation = `right ${time}s linear both`;
            rightAnimation.style.animationDelay = `${time}s`;

            let seconds = time % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            let minutes = time / 60 % 60;
        
            if ( time < 0 ) {
                body.classList.toggle('break');
                clearInterval(timer);
            }
            else {
                numTimer.textContent = `${Math.trunc(minutes)}:${seconds}`;
            }
        
            --time;
        }, 1000)
    }
    else if (!numTimer.classList.contains('active')) {
        startBtn.src = './img/continue.png';
        clearInterval(timer);
        leftAnimation.style.animationPlayState = 'paused';
        rightAnimation.style.animationPlayState = 'paused';
    }
})


// Таймер Функция

let timer;


// Стоп (сброс)

stopBtn.addEventListener('click', function(e) {
    if (!body.classList.contains('break')) {
        numTimer.classList.toggle('active');
        startBtn.src = './img/continue.png';
        // Преводим в исходное состояние значение таймера
        numTimer.textContent = valWork + ':00';
    }
    else if (body.classList.contains('break')) {
        numTimer.classList.toggle('active');
        startBtn.src = './img/continue.png';
        // Преводим в исходное состояние значение таймера
        if (valBreak == '5') {
            numTimer.textContent = '0' + valBreak + ':00';
        }
        else if (valBreak == '10') {
            numTimer.textContent = valBreak + ':00'; 
        }

    }
    clearInterval(timer);
    // Обнуляем анимацию
    leftAnimation.style.animation = 'none';
    rightAnimation.style.animation = 'none';
    rightAnimation.style.animationDelay = '0s';
})

// Кнопка скипа

skipBtn.addEventListener('click', function(e) {
    e.preventDefault();

    body.classList.toggle('break');

    if (body.classList.contains('break')) {

        startBtn.src = './img/continue.png';

        // Обнуляем анимацию
        leftAnimation.style.animation = 'none';
        rightAnimation.style.animation = 'none';
        rightAnimation.style.animationDelay = '0s';

        clearInterval(timer);

        body.style.backgroundColor = '#66d1ff';
        inner.style.backgroundColor = '#66d1ff';

        if (valBreak == '5') {
            numTimer.textContent = '0' + valBreak + ':00';
        }
        else if (valBreak == '10') {
            numTimer.textContent = valBreak + ':00'; 
        }

        // Получаем значение из select для перерыва
        selectBreak.addEventListener('change', function(e) {
            e.preventDefault();

            valBreak = this.value;
            valBreak = valBreak.match(/[0-9]/g).join('');

            console.log(valBreak);

            if (valBreak == '5') {
                numTimer.textContent = '0' + valBreak + ':00';
            }
            else if (valBreak == '10') {
                numTimer.textContent = valBreak + ':00'; 
            }

            startBtn.src = './img/continue.png';

            numTimer.classList.toggle('active');

            clearInterval(timer);

            // Обнуляем анимацию
            leftAnimation.style.animation = 'none';
            rightAnimation.style.animation = 'none';
            rightAnimation.style.animationDelay = '0s';
        })

    }
    else if (!body.classList.contains('break')) {

        startBtn.src = './img/continue.png';

        // Обнуляем анимацию
        leftAnimation.style.animation = 'none';
        rightAnimation.style.animation = 'none';
        rightAnimation.style.animationDelay = '0s';

        numTimer.classList.toggle('active');

        clearInterval(timer);

        body.style.backgroundColor = '#e03131';
        inner.style.backgroundColor = '#e03131';

        numTimer.textContent = valWork + ':00';
    }
})

// Музыка


let audio = new Audio('./audio/chill.mp3');

input.addEventListener('change', function(e) {
    e.preventDefault();

    if (input.checked === true) {
        audio.play();
    }
    else if (input.checked === false) {
        audio.pause();
    }

})

































