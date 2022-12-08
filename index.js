let timerInput =document.getElementById("timerInput"),
startStop=document.getElementById("start"),
stopwatchBtn=document.getElementById("stopwatch"),
timerBtn=document.getElementById("timerBtn"),
reset=document.getElementById("reset"),
spanContainer =document.querySelector(".spanContainer"),
timerSection =document.querySelector(".timer"),
stopwatchSection =document.querySelector(".stopwatch"),
spans=document.querySelectorAll(".spanContainer span:not(.char)"),
spanChar=document.querySelectorAll(".spanContainer span.char"),
progres=document.querySelector("main .progres"),
mySpans=[...spans].reverse(), arrTimer, stopWatchTime, 
seconds = 00;
tens = 00;
OutputSeconds = document.getElementById("second");
OutputTens = document.getElementById("tens");;
mood="timer",
statMoodTimer="start",
statMoodWatch="start";
    // when the user start typing
    timerInput.addEventListener("keyup",()=>{

        //reselect the items
        timerInput.style.borderColor="#8ab4f8"
        spanContainer.classList.remove("heddenAfter")
        spans =document.querySelectorAll(".spanContainer span:not(.char)"),
        mySpans =[...spans].reverse();
        spans.forEach(span=>span.style.display="inline-block")
        spanChar.forEach(span=>span.style.display="inline-block")
        spans.forEach(span=>span.style.color="#70757a")
        spanChar.forEach(span=>span.style.color="#70757a")
        arrTimer=Array.from(timerInput.value).reverse()


        mySpans.forEach((span,i)=>{
            span.textContent=arrTimer[i]||"0"
        })
    })
// to custamize the input,span style 
    document.addEventListener('click',(e)=>{
        if(e.target.id != "timerInput"){
            for (let i = 0; i < spans.length; i++) {
                if(spans[i].innerHTML == "0" ){
                    spans[i].style.display="none"
                }else{
                    spanContainer.classList.add("heddenAfter")
                    timerInput.style.borderColor="#70757a"
                    spans.forEach(span=>span.style.color="#e8eaed")
                    spanChar.forEach(span=>span.style.color="#e8eaed")
                    mySpans[0].style.display=="none"?spanChar[2].style.display="none":spanChar[2].style.display="inline-block";
                    mySpans[2].style.display=="none"?spanChar[1].style.display="none":spanChar[1].style.display="inline-block";
                    mySpans[4].style.display=="none"?spanChar[0].style.display="none":spanChar[0].style.display="inline-block";
                    break;
                }
            } 
        }
    })
//when click on the start btn
let counter,fullTime;
    startStop.addEventListener("click",()=>{
        reset.style.opacity="1"
        if(mood=="timer"){
        if(startStop.dataset.type=="start"){
            startStop.dataset.type="stop"
            startStop.innerHTML="stop"
            statMoodTimer="stop"
            let s =parseInt(`${spans[4].textContent}${spans[5].textContent}`),
                m =parseInt(`${spans[2].textContent}${spans[3].textContent}`),
                h =parseInt(`${spans[0].textContent}${spans[1].textContent}`),
                countDownDate=(s*1000)+(m*60*1000)+(h*60*60*1000),
                fullTime=(s*1000)+(m*60*1000)+(h*60*60*1000);
                counter = setInterval(()=>{
                    progres.style.width=`${100-(countDownDate*100/fullTime)}%`
                countDownDate-=1000;
                if(countDownDate==0){
                    clearInterval(counter)
                }
                let newH= Math.floor(countDownDate/(1000*60*60))
                let newM= Math.floor((countDownDate%(1000*60*60))/(60*1000))
                let newS= Math.floor((countDownDate%(1000*60))/1000)
                
                let finalS =newS<10?`0${newS.toString()}`:`${newS.toString()}`
                spans[5].innerHTML=finalS[1]
                spans[4].innerHTML=finalS[0]
                let finalM=newM<10?`0${newM.toString()}`:`${newM.toString()}`
                spans[3].innerHTML=finalM[1]
                spans[2].innerHTML=finalM[0]
                let finalH=newH<10?`0${newH.toString()}`:`${newH.toString()}`
                spans[1].innerHTML=finalH[1]
                spans[0].innerHTML=finalH[0]
                
            },1000)}
            else{
                startStop.dataset.type="start"
            startStop.innerHTML="start"
            statMoodTimer="start"
                clearInterval(counter)

            }
        }
        // watch
        else{
            //
            if(startStop.dataset.type=="start"){
                startStop.dataset.type="stop"
                startStop.innerHTML="stop"
                statMoodWatch="stop"
                clearInterval(stopWatchTime);
                stopWatchTime = setInterval(startTimer, 10);
            }else{
                startStop.dataset.type="start"
                startStop.innerHTML="start"
                statMoodWatch="start"
                clearInterval(stopWatchTime);
            }
        }
    })
    //reset
    reset.addEventListener('click',()=>{
        
        if(mood=="timer"){
            statMoodTimer="start"
            startStop.dataset.type=statMoodTimer
            startStop.innerHTML=statMoodTimer
                clearInterval(counter)
                spans[5].innerHTML="0"
                spans[4].innerHTML="0"
                spans[3].innerHTML="5"
                spans[2].innerHTML="0"
                spans[1].innerHTML="0"
                spans[0].innerHTML="0"
                reset.style.opacity="0.3"
        }else{
            statMoodWatch="start"
            startStop.dataset.type=statMoodTimer
        startStop.innerHTML=statMoodTimer
            
            clearInterval(stopWatchTime);
        tens = "00";
        seconds = "00";
        OutputSeconds.innerHTML = seconds;
        OutputTens.innerHTML = tens;
        }

    })

// // /1000 => s /60 => m /60=> h /24 =>day /30 month  /12  => year
// // let newDate = new Date().getTime();//ملوش لازمة 

stopwatchBtn.addEventListener("click",()=>{
    mood="stopwatch"
    timerBtn.classList.remove("active")
    stopwatchBtn.classList.add("active")
    timerSection.style.display="none"
    stopwatchSection.style.display="block"
    startStop.dataset.type=statMoodWatch
    startStop.innerHTML=statMoodWatch
    progres.style.display="none"
})
timerBtn.addEventListener("click",()=>{
    mood="timer"
    stopwatchBtn.classList.remove("active")
    timerBtn.classList.add("active")
    timerSection.style.display="block"
    stopwatchSection.style.display="none"
    startStop.dataset.type=statMoodTimer
    startStop.innerHTML=statMoodTimer
    progres.style.display="inline-block"
})



// stop watch

    function startTimer(){
        tens++;
        if(tens <= 9){
            OutputTens.innerHTML = "0" + tens;
        }

        if(tens > 9){
            OutputTens.innerHTML = tens;
        }

        if(tens > 99){
            seconds++;
            OutputSeconds.innerHTML = "0" + seconds;
            tens = 0;
            OutputTens.innerHTML = "0" + 0;
        }

        if(seconds > 9){
            OutputSeconds.innerHTML = seconds;
        }
    }