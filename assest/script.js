const btstartquiz = document.querySelector('.startquis-botton'),
      areawelcome = document.querySelector('.starquiz'),
      questionArea = document.querySelector('.questionarea'),
      progrebar = document.querySelector('.progress--bar'),
      questiontext = document.querySelector('.question-text span'),
      optiontext = document.querySelector('.question-area-options'),
      chagephoto = document.querySelector('#changephoto'),
      showresult = document.querySelector('.showresult'),
      showresulttextup = document.querySelector('.showresult-text--up'),
      showresulttextdown = document.querySelector('.showresult-text--down'),
      showresulimg = document.querySelector('.showresult img');
      
let currentquestion = 0,
    questionmax = 10,
    correctAnswers = 0,
    questionmoment =0,
    list = [];

listnumbers()
console.log(list)

btstartquiz.addEventListener('click', starquiz)
      

function starquiz() {
  
    questionmoment = questions[list[currentquestion]];
    areawelcome.style.display = 'none'

    if( currentquestion < ( questionmax - 1 )  ) {

       let percentprogressbar = Math.floor((currentquestion/ questions.length) * 100)
       progrebar.style.width = `${percentprogressbar}%`

       questiontext.innerHTML = questionmoment.question

       let optionstextshtml = ''

       for(let opquestions in questionmoment.options) {
        optionstextshtml+= ` <div class="options" data-op="${opquestions}">
                                <div data-op="${opquestions}" >
                                    <span data-op="${opquestions}" class="options--number" >${parseInt(opquestions) + 1}</span>
                                    <span data-op="${opquestions}" class="options--text">${questionmoment.options[opquestions]}</span>
                                </div>
                            </div>
                            `
       }

       optiontext.innerHTML = optionstextshtml

       const questionclick =  document.querySelectorAll('.options')

       questionclick.forEach((targequestion) => {

        targequestion.addEventListener('click',optionClickEvent)
            
       }) 
       
       let photo = Math.floor(Math.random() * 6)

       chagephoto.src = `./assest/images/qzimages-${photo}.jpg`

       questionArea.style.display = 'block'
       setTimeout(() => {
           questionArea.style.opacity = '100%';
       },100)

    } else {
     
        finishQuiz();
        questionArea.style.display = 'none'
    }

   
}

function optionClickEvent(item) {

    let clickedoption = parseInt(item.target.getAttribute('data-op'));

    if(questionmoment.answer === clickedoption ) {
        correctAnswers++;
    }

    currentquestion++;
    starquiz();

}

function finishQuiz() { 

    with(progrebar) {
        style.width = `100%`
        style.backgroundColor = '#F28705'
    }

    

    let lengthquest = questionmax,
        resultext = '',
        congratext = '',
        imagepath = '';


    if(correctAnswers < (lengthquest * 0.25)) {
        imagepath = './assest/images/naruto-sad.jpg'
        congratext = 'F, meu ninja!!!'        
        resultext =
            `
            <span class="showresult-text--result">
                Não foi dessa vez!! <br>
                Você acertou ${correctAnswers} de ${lengthquest}.
            </span>
            `

    } else if(correctAnswers <= (lengthquest * 0.5 )){

        imagepath = './assest/images/naruto-confused.jpg'
        congratext = 'Mais um pouco!!!'        
        resultext = 
            `<span class="showresult-text--result">
                Olha, foi quase!! <br>
                Você acertou ${correctAnswers} de ${lengthquest}.
            </span>
            `
        
    } else {
        imagepath = './assest/images/naruto-happy.jpg'
        congratext = 'Esse é o jeito ninja de ser!!!'        
        resultext = 
            `<span class="showresult-text--result">
                Narutin tá orgulhoso de você!! <br>
                Você acertou ${correctAnswers} de ${lengthquest}.
            </span>
            `
    }

    
    showresulttextup.innerHTML = congratext
    showresulttextdown.innerHTML = resultext
    showresulimg.src = imagepath

   
    showresult.style.display = 'block'
    
}
function listnumbers() {

    const maxNumbers = questions.length;
    for (let i = 0; i < maxNumbers; i++) {
    list[i] = i + 1;

    }

    let randomNumber;
    let tmp;


    for (let i = list.length; i;) {

        randomNumber = Math.random() * i-- | 0;
        tmp = list[randomNumber];
        // troca o número aleatório pelo atual
        list[randomNumber] = list[i];
        // troca o atual pelo aleatório
        list[i] = tmp;
        
    }

}