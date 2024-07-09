var bird = document.querySelector(".bird");
var obstacals = document.querySelectorAll(".obstacale");
var scoreMsg = document.querySelector(".Scorevalue");
var opitonMenu = document.getElementById("exampleModal");
var modalscore = document.getElementById("modalscore");
var startmsg = document.getElementById("startmsg");
var changemode = document.getElementById("changemode");
var playground = document.querySelector(".playground").getBoundingClientRect();
var highsocreTitle = document.getElementById("highsocreTitle");
var livesbox = document.querySelector(".livesValue");
var highscore;
var _gravity ;
var _movespeed ;
var _flyspeed;
var _isplaying = false;
var score ;
var _gapSize;
let obstacle_seperation = 0;
var bird_dy = 0;
// var obstacle_sprite = "pillar.png";
var changemode_flag = false;
var lifes = 3;
// console.error("DEVLOPED BY shaikh sufiyan and piyush ghante")

if(document.cookie === ''){
    document.cookie = "highscore="+ 0 + ";" + "expires=" + new Date(3333,1,1);
}
highscore = document.cookie.split('=')[1];
highsocreTitle.innerText = 'Highscore : '+ highscore;

document.addEventListener("keypress", (e)=>{
    if(e.key == "Enter" && _isplaying == false) {
        _isplaying = true
        init();
        play();
     
    }
 
})

document.addEventListener("dblclick" , (e)=>{
    if(!_isplaying)
   {   
        _isplaying = true
    init();
    play();
   }
})

function start(){
    _isplaying = true
        init();
        play();
}

function antigravity(){
    
    if(changemode.value == "antigravity"){
               
          changemode_flag = true;
              changemode.value = "gravity";
              changemode.innerText.replace("Anti-Gravity mode", "Normal mode");
              
    }
    else if(changemode.value == "gravity"){
        changemode_flag = false;
        changemode.value = "antigravity";
        changemode.innerText.replace( "Normal mode" , "Anti-Gravity mode");
    }
   
     init();

}


function init(){
   
    
    $("#exampleModal").modal("hide") 
    bird.src = "assets/red.png"
    if(changemode_flag)
    {
        _flyspeed = -5;
        _gravity = -0.2;

    }else{
    _gravity = 0.2;
    _flyspeed = 5;
    }
    // playground.height = 100 + "vh";
    // playground.width = 100 + "vw";
    bird.style.top = '40vh';
    _movespeed = 3;
     score = 0;
   _gapSize = 35;
     lifes = 3;
   
   highscore = document.cookie.split('=')[1];
    highsocreTitle.innerText = 'Highscore : '+ highscore;
    scoreMsg.innerHTML = "0";
   obstacals.forEach((obs)=>{
         obs.remove();
   })

  
}



function play(){
    startmsg.style.visibility = "hidden";
  requestAnimationFrame(createObstacales);
  requestAnimationFrame(Addgravity);
  requestAnimationFrame(move);
 
}

function move(){

    if(!_isplaying) return
    obstacals = document.querySelectorAll(".obstacale");

    obstacals.forEach((obs)=>{
        var prop_boundary = obs.getBoundingClientRect();
        var bird_boundary = bird.getBoundingClientRect();

        //Collision detection
        if(
            bird_boundary.left < prop_boundary.left + prop_boundary.width &&
            bird_boundary.left + bird_boundary.width > prop_boundary.left &&    
            bird_boundary.top <  prop_boundary.top + prop_boundary.height &&
            bird_boundary.top + bird_boundary.height > prop_boundary.top
        ){
            end();
        } 
        if(bird_boundary.left > prop_boundary.right && 
            bird_boundary.left <= prop_boundary.right + _movespeed){

            score += 0.5;
            scoreMsg.innerHTML = score

           
            if(score > highscore ){
                setCookie();
            }

            if(score == 10){
                
                bird.src = "blue.png";
                _gapSize -= 5;
            }
            else if(score == 60)
            { 
                bird.src = "assets/green.png";
                
                _gapSize -= 5;
            
            }
            else if(score == 100) 
            {
                bird.style.width = 100 + "px";
                bird.style.height = 60 + "px";
                bird.src = "assets/black.png"
                _gapSize -= 5;
                // width: 140px;
                // height: 80px;
            }
        }

       if(prop_boundary.left <= 0){
           obs.remove();
       }
        else{
        obs.style.left = prop_boundary.left - _movespeed + 'px';
        }
    })


    requestAnimationFrame(move)
}



function createObstacales(){
      
    if(!_isplaying) return

    if(obstacle_seperation >120) {
        obstacle_seperation = 0;
    var slice = Math.floor(Math.random() * 40) + 8;

    var newObstatcle_up = document.createElement('div');
        // newObstatcle_up.src = obstacle_sprite
    newObstatcle_up.classList.add("obstacale");
    newObstatcle_up.style.top = slice - 70 + 'vh';
    newObstatcle_up.style.left = 100 + 'vw';
    
    document.body.appendChild(newObstatcle_up);

    var newObstacel_down = document.createElement('div');
    newObstacel_down.classList.add('obstacale');
    newObstacel_down.style.top = slice + _gapSize + 'vh';
    newObstacel_down.style.left = 100 + 'vw';
    // newObstacel_down.src = obstacle_sprite
    document.body.appendChild(newObstacel_down);
    }

   obstacle_seperation++;
   requestAnimationFrame(createObstacales)
}


function Addgravity(){
    if(!_isplaying) return
    var bird_boundary = bird.getBoundingClientRect();
    bird_dy += _gravity;
  document.addEventListener("keydown", (e)=>{
    
       if(e.key == ' ' ){
        //    bird.style.top = bird_boundary.top - _flyspeed + 'px';
          bird_dy = - _flyspeed;

       }
       
  })

  document.addEventListener("click" , (e)=>{
        bird_dy = - _flyspeed;
  })

  if(bird_boundary.top <= 0 || bird_boundary.bottom >= playground.bottom ){
    end()
  }

  bird.style.top = bird_boundary.top + bird_dy + 'px';

       requestAnimationFrame(Addgravity);
}

function end(){

    // opitonMenu.show()
    
    modalscore.innerHTML = "Your score : " + score
    $("#exampleModal").modal("show")
    _isplaying = false;
    scoreMsg.innerHTML = "Game Over"
    startmsg.style.visibility = "visible";
    // score=0;
   
}





function setCookie(){
    document.cookie =   "highscore=" + score  + ";" + "expires=" + new Date(2030,1,1);
    // document.cookie =
    highscore =  document.cookie.split('=')[1];
    
    highsocreTitle.innerText = "High-Score : " + highscore;
 
}

