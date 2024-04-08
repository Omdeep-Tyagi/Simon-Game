let gameSeq=[];// game jo random color layega
let userSeq=[];// user jo click karega

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;

let h2=document.querySelector("h2"); 

document.addEventListener("keypress",function()
{
    if(started==false)
    {
        console.log("game is started");
        started=true;
        levelup();
    }
});

// step 1 done
function gameFlash(btn)

{
     btn.classList.add("flash");
     setTimeout(function()
     {
        btn.classList.remove("flash");
     },250);
}

function userFlash(btn)
{
     btn.classList.add("userflash");
     setTimeout(function()
     {
        btn.classList.remove("userflash");
     },250);
}


function levelup()
{
    userSeq=[]; //whenever level up hoga....userseq wala array fir se empty hoga..and dobara enter karna hoga
    level++;
    h2.innerText=`Level ${level}`;
    
    //random btn choosen
    let randIdx=Math.floor(Math.random()*3);//0 to 3 index choosen
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameFlash(randBtn);

    gameSeq.push(randColor);
    console.log(gameSeq);

}

//step 2 done

function btnPress()
{
    //console.log("btn was pressed");
    let btn=this; // button ayega i.e. div
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);//last index by user check hoga
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress);
}

//step 3 done

function checkAns(idx)
{
    //console.log("curr level :",level);//curr level is size of gameseq

    if(userSeq[idx]===gameSeq[idx]) 
    { 
        //console.log("same value");
        if(userSeq.length == gameSeq.length) //if values same h but length same nhi h ie user middle position par h in userSeq and again vo btn press karega
        { 
            setTimeout(levelup,1000);//on last idx par ye hoga
        }

    }
    else
    {
        h2.innerHTML=`Game Over! Your score was <b>${level-1}</b>. <br>Press any key to start.`;
        let data=document.querySelector(".score").innerText;
        if(data<(level-1)) document.querySelector(".score").innerText=level-1;

        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function()
        {
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();

    }

}

function reset()
{
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}