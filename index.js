const Startbutt =document.querySelector(".Startbutt button");
const rulesBox = document.querySelector(".rulesBox");
const Exitbutt = document.querySelector(".buttons .butt1");
const Continue = document.querySelector(".buttons .butt2");
const Question1 = document.querySelector(".Question");
const option_list = document.querySelector(".myOptions");
const timeCount = document.querySelector(".TimeCount .seconds");
const timeLine = document.querySelector(".time_line");
const timeOff = document.querySelector(".Timeleft");
Startbutt.onclick = () =>{
    rulesBox.classList.add("activeInfo");
}
Exitbutt.onclick = () => {
    rulesBox.classList.remove("activeInfo");
}
Continue.onclick = () =>{
    rulesBox.classList.remove("activeInfo");
    Question1.classList.add("activeQuiz");
    showQuestin(0);
    startTimer(timeValue);
    startTimealine(0);
    // clearInterval(counter);
}
let que_count = 0;
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

const nextBtn = document.querySelector(".Nextbutt");

const result_Box = document.querySelector(".resultBox");
const Restart = document.querySelector(".restart");
const Quit = document.querySelector(".quit");

nextBtn.onclick = () =>{
    if(que_count < Questions.length - 1){
        que_count = que_count +1;
        showQuestin(que_count);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimealine(widthValue);
        nextBtn.style.display = "none";
    }
    else{
        console.log("You Have Completed Your Task 🥰");
        ShowresultBox();
    }
}

function showQuestin(index){
    const que_text = document.querySelector(".question1");

    let que_tag = "<span>"+Questions[index].number + "." + Questions[index].question + "</span>";

    let option_tag ='<div class="Options"><span>' + Questions[index].options[0] + '</span></div>'
     + '<div class="Options"><span>' + Questions[index].options[1] + '</span></div>' 
     + '<div class="Options"><span>' + Questions[index].options[2] + '</span></div>' 
     + '<div class="Options"><span>' + Questions[index].options[3] + '</span></div>'

    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const no_Que = document.querySelector(".Ques-no");
    let no_QueTag = '<p>'+ Questions[index].number +' Of 5 </p>';
    no_Que.innerHTML = no_QueTag;


    const option = option_list.querySelectorAll(".Options");

    for(let i=0; i < option.length; i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    };
};

let tickIcon = `<div class="tick"><i class="fa-solid fa-check"></i></div>`;

let crossIcon = `<div class="cross"><i class="fa-solid fa-xmark"></i></div>`;

function optionSelected(answer){

    let userAns = answer.textContent;
    let correctAns = Questions[que_count].answer;
    let all_options = option_list.children.length;

    clearInterval(counter);
    clearInterval(counterLine);

    if(userAns == correctAns){
        userScore = userScore +1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeend",tickIcon);
    }
    else{
        answer.classList.add("wrong");
        console.log("Wrong!!!!");
        answer.insertAdjacentHTML("beforeend",crossIcon);

        for(let i=0; i<all_options; i++){
          if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","Options correct");
            option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
                console.log("chossed");
            };
        };
    };

    for(let i=0; i<all_options; i++){
        option_list.children[i].classList.add("disabled");
        console.log("disabled");
    }

    nextBtn.style.display = "block";
}                            

function startTimer(time){
   counter = setInterval(timer,1000);
   
   function timer(){
    timeCount.textContent =time;
    time--;
    if(time<0){
        clearInterval(counter);
        timeCount.textContent="00";
        timeOff.textContent="Time Off";
        let correctAns = Questions[que_count].answer;
        let all_options = option_list.children.length;

        for(let i=0; i<all_options; i++){
            if(option_list.children[i].textContent == correctAns){
                  option_list.children[i].setAttribute("class","Options correct");
              option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
                  console.log("chossed");
              };
          };

          for(let i=0; i<all_options; i++){
            option_list.children[i].classList.add("disabled");
            console.log("disabled");
        }
    
        nextBtn.style.display = "block";

        
    }
    else if(time<10){
        timeCount.textContent="0" + time; 
    }
    else{
        timeCount.textContent =time;
    }
   }

}

function ShowresultBox(){
    rulesBox.classList.remove("activeInfo");
    Question1.classList.remove("activeQuiz");
    result_Box.classList.add("activeResult");

    const scoreText = document.querySelector(".Score");

    if(userScore > 4){
        let scoreTag = '<span>Congratulations!! 🎉 You Got <p>'+ userScore +'</p> Out Of <p>'+ Questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
     }
     else if(userScore > 3){
        let scoreTag = '<span>Good Effort 👏 You Got <p>'+ userScore +'</p> Out Of <p>'+ Questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
     }
     else if(userScore > 2){
         let scoreTag = '<span>Carry On 👌 You Got <p>'+ userScore +'</p> Out Of <p>'+ Questions.length +'</p></span>';
         scoreText.innerHTML = scoreTag;
      }
    else if(userScore > 0){
        let scoreTag = '<span> I Am Sorry 😔 You Got <p>'+ userScore +'</p> Out Of <p>'+ Questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
         let scoreTag ='<span>You Failed 🤡 You Got <p>'+ userScore +'</p> Out Of <p>'+ Questions.length +'</p></span>'; 
         scoreText.innerHTML = scoreTag;
     }
}

Restart.onclick = () => {

    Question1.classList.add("activeQuiz");

    result_Box.classList.remove("activeResult");

    let timeValue = 15;
    let que_count = 0;
    let widthValue = 0;
    showQuestin(que_count);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimealine(widthValue);
    
    nextBtn.style.display = "none";
    
}

Quit.onclick = () => {
    quitting();
}
function quitting(){
    window.location.reload();
}

function startTimealine(time){
    counterLine = setInterval(timer,50);
     function timer(){
        time=time+1;
        timeLine.style.width = time + "px";
        if(time>319){
            clearInterval(counterLine);
        }
     }
}





