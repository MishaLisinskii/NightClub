// ============ Функции ============
// Для радиоКнопок ==========
function nextRadio(){
    document.querySelector(`#r${countR}`).removeAttribute('checked','checked');
    countR = (countR % totalR) + 1;
    document.querySelector(`#r${countR}`).setAttribute('checked','checked');
    countSpan = (countSpan % totalR) + 1;
    countTextRadio.textContent = countSpan;
}
function prevRadio(){
    document.querySelector(`#r${countR}`).removeAttribute('checked','checked');
    countR = (countR - 2 + totalR) % totalR + 1;
    document.querySelector(`#r${countR}`).setAttribute('checked','checked');
    countSpan = (countSpan - 2 + totalR) % totalR + 1;
    countTextRadio.textContent = countSpan;
}
// Для Слайдера ==========
function nextSlide(){
    selectSlide = (selectSlide % totalSlides) + 1;
    translateValue = (selectSlide - 1) * -16.7 + '%';
}
function prevSlide(){
    selectSlide = (selectSlide - 2 + totalSlides) % totalSlides + 1;
    translateValue = (selectSlide - 1) * -16.7 + '%';
}
// Для СлайдераСкриншотов ==========
function nextScreen(){
    selectScreen = (selectScreen % totalList) + 1;
    translateScreenValue = (selectScreen - 1) * -20 + '%';
    if(maxWidth700.matches){
        translateScreenValue = (selectScreen - 1) * -30 + '%';
        totalList = 11;
    }
}
function prevScreen(){
    selectScreen = (selectScreen - 2 + totalList) % totalList + 1;
    translateScreenValue = (selectScreen - 1) * -20 + '%';
    if(maxWidth700.matches){
        translateScreenValue = (selectScreen - 1) * -30 + '%';
        totalList = 11;
    }
}
// ============ Переменные ============
// Для РадиоКнопок ==========
let countSpan = 1;
let countR = 1;
let totalR = 6;
// Для Слайдера ========== 
let translateValue = null;
let totalSlides = 6;
let selectSlide = 1;
// Для Скрнишотов ==========
let translateScreenValue = null;
let totalList = 4;
let selectScreen = 1;
let clickedScren = null;
// Для ответов ==========
let clickedCount = null;

// ============Переменные-ДомСтруктуры ============
const buttonNext = document.querySelector('#button-next');
const buttonPrev = document.querySelector('#button-prev');
const countTextRadio = document.querySelector('#count-text-radio');
const sliderRoom = document.querySelector('.room-slider');
const sliderInfo = document.querySelector('.info-slider');
const buttonScreenPrev = document.querySelector('#buttonScreen-prev');
const buttonScreenNext = document.querySelector('#buttonScreen-next');
const screenShotsBlock = document.querySelector('.screenPhone');
const screenShots = document.querySelectorAll('.screnshots-block > img');
const question = document.querySelectorAll('.question');
const answer = document.querySelectorAll('.answer');
const burgerButton = document.querySelector('#burgerButton');
const dropMenu = document.querySelector('.dropMenu');
const renatageMap = document.querySelector('#renatageMap');
// Медиа параметры ==========
let maxWidth700 = window.matchMedia('(max-width: 700px)');
// ============ Прослушки Событий ============
// Кнопки переключения слайдов ==========
buttonNext.addEventListener('click', ()=>{
    nextRadio();
    nextSlide()
    sliderRoom.style.transform = `translateX(${translateValue})`; 
    sliderRoom.style.transition = 'all .3s ease'
    sliderInfo.style.transform = `translateX(${translateValue})`
    sliderInfo.style.transition = 'all .3s ease'
})
buttonPrev.addEventListener('click', ()=>{
    prevRadio();
    prevSlide();
    sliderRoom.style.transform = `translateX(${translateValue})`;
    sliderInfo.style.transform = `translateX(${translateValue})`
    sliderRoom.style.transition = 'all .3s ease'
    sliderInfo.style.transition = 'all .3s ease'
})
// Кнопки переключения Скриншотов ==========
buttonScreenNext.addEventListener('click', ()=>{
    nextScreen();
    screenShotsBlock.style.transform = `translate(${translateScreenValue})`
    screenShotsBlock.style.transition = 'all .3s ease'
})
buttonScreenPrev.addEventListener('click', ()=>{
    prevScreen();
    screenShotsBlock.style.transform = `translate(${translateScreenValue})`

})
// Увелечение Скриншота ==========
screenShots.forEach(element => {
    element.addEventListener('click', () =>{
        const clicked = element;
        if(clickedScren === 1){
            clickedScren = null;
            clicked.style.opacity = '';
            clicked.style.position = 'relative'
            clicked.style.left = '';
            clicked.style.zIndex = '';
            return clicked.style.transform='';
            
        }
        if(clicked){
            clickedScren++;
            clicked.style.opacity = '1';
            clicked.style.position = 'absolute';
            clicked.style.transform='scale(1.3)';
            clicked.style.zIndex = 3;
        }  
    })
});


// Открытие блока ответа ==========
question.forEach(element=>{
    element.addEventListener('click',()=>{
        const btn = element.querySelector('button img');
        const answerBlock = element.querySelector('.answer')
        let clicked = element.dataset.clicked === 'true';
        if(!clicked){
            answerBlock.style.display = 'inline-block';
            answerBlock.style.position = 'absolute';
            answerBlock.style.bottom = '0';
            answerBlock.style.zIndex = '-1';
            answerBlock.style.transform = 'translateY(20%)';
            answerBlock.style.transition = 'all 1s ease';
            requestAnimationFrame(()=>{
                answerBlock.style.transform = 'translateY(100%)';
            })
            element.classList.remove('answerClose')
            element.classList.add('answerOpen');
            btn.classList.remove('animationVectorDown');
            btn.classList.add('animationVectorUp');
            element.dataset.clicked = 'true';
        }
        if(clicked){
            answerBlock.style.transform = 'translateY(0%)';
            setTimeout(()=>{
                answerBlock.style.display = 'none';
            }, 500)
            element.classList.add('answerClose');
            btn.classList.remove('animationVectorUp');
            btn.classList.add('animationVectorDown');
            element.dataset.clicked = 'false';
        }
    })
})
burgerButton.addEventListener('click', ()=>{
    clickedCount++
    if(clickedCount === 1){
        burgerButton.classList.remove('animationVectorBack');
        burgerButton.classList.add('animationVectorScroll');
        document.querySelector('#up').style.backgroundColor = '#282B32';
        document.querySelector('#up').style.transition = 'background-color 1s linear';
        dropMenu.style.display = 'inline-block';
        dropMenu.style.transition= 'all 1s linear';
        requestAnimationFrame(()=>{
            dropMenu.style.transform = 'translateX(0)';
        })
        burgerButton.dataset.clickedButton = true;
    }
    if(clickedCount === 2){
        burgerButton.classList.remove('animationVectorScroll');
        burgerButton.classList.add('animationVectorBack');
        document.querySelector('#up').style.backgroundColor = '';
        dropMenu.style.transform = '';
        setTimeout(()=>{
            dropMenu.style.display = 'none'
        },1000)
        burgerButton.dataset.clickedButton = false;
        clickedCount = null;
    }
})