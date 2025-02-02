///// POPULARITY METER AND QUIZ/////

//initialize score variable
var score = 0;

//show popularity meter on page load
$(document).ready(function () {
    scoreFunction();
});
function scoreFunction(){
    if (localStorage.getItem("currScore") >= 0){
        score = localStorage.getItem("currScore");
        document.getElementById("popularity-meter").value = score;
    }
}

//When the correct answer is clicked
var plus = document.getElementsByClassName("plus-btn");
var plusFunction = function()
{
    //only do so if there is data stored previously in local storage
    if (localStorage.getItem("currScore") >= 0){
        //get local storage value and store in variable score
        score = localStorage.getItem("currScore");
    }

    //point increment by 5
    for(let i = 0; i < 5; i++){
        score++;
    }

    /* if ((localStorage.getItem("currScore") >= 50) && (window.location.href == scene.html)) {
        document.getElementById("skip").style.display = "block";
        document.getElementById("skip").onclick = function() {
            document.getElementById(divId).style.display = "none";
            document.getElementById("s7-18").style.display = "block";
            document.getElementById("skip").style.display = "none";
        }
    }
     */
    

    //show popup when score reached 50%
    if (score == 50) {
        document.getElementById("goalNotif").style.display = "block";
        setTimeout(removeTxt, 2900);
        function removeTxt() {
            document.getElementById("goalNotif").style.display = "none";
        }
    } else {
        //show +5 point pop up and fadeout after 2s
        document.getElementById("pointNotif").style.display = "block";
        setTimeout(removeTxt, 1900);
        function removeTxt() {
            document.getElementById("pointNotif").style.display = "none";
        }
    }

    //setting increment input value
    document.getElementById("popularity-meter").value = score;

    //un-disable minus button only if score is greater than 0, to prevent negative score 
    if(score > 0){
        document.querySelector(".minus-btn").removeAttribute("disabled");
        document.querySelector(".minus-btn").classList.remove("disabled");
    }

    //store score in local storage
    localStorage.setItem("currScore", score);
    console.log("score is: " + score);
}

for (var i = 0; i < plus.length; i++) {
    plus[i].addEventListener('click', plusFunction, false);
}

//When the wrong answer is clicked
var minus = document.getElementsByClassName("minus-btn");
var minusFunction = function()
{
    console.log("minus button is clicked");
    //disable minus button if score is less than 5
    if(score <= 5){
        document.querySelector(".minus-btn").setAttribute("disabled", "disabled")
    }else {
        document.querySelector(".minus-btn").removeAttribute("disabled");
        document.querySelector(".minus-btn").classList.remove("disabled");
    }
    //get local storage value and store in variable score
    score = localStorage.getItem("currScore");

    //point increment by 5
    // for(let i = 0; i < 5; i++){
    //     score--;
    // }

    //reflect score on the meter bar
    document.getElementById("popularity-meter").value = score;

    //store score in local storage
    localStorage.setItem("currScore", score);
    console.log("score is: " + score);
}
for (var i = 0; i < minus.length; i++) {
    minus[i].addEventListener('click', minusFunction, false);
}


//When correct capture is taken from camera
var camera = document.getElementById("cam");
var polarBear = document.getElementById("small-pb");
var coral1 = document.getElementById("coral1");
var coral2 = document.getElementById("coral2");
var coral3 = document.getElementById("coral3");
var fire = document.getElementById("fire");
var map = document.getElementById("map-icon");

let isCaptured = false;

var capturedCount = 0;
console.log(capturedCount);
sessionStorage.setItem("captured", capturedCount);

var capturedCount2 = sessionStorage.getItem("captured");

function camClicked(){
    camera.style.transform = "scale(0.45, 0.45)";

    //Check if camera overlaps object
            
    var rect2 = camera.getBoundingClientRect();

    if(polarBear != null){
        var rect1 = polarBear.getBoundingClientRect();

        if (!
            (rect1.top > (rect2.bottom * 0.90) ||
            rect1.right < (rect2.left * 1.3) ||
            rect1.bottom < rect2.top ||
            rect1.left > (rect2.right * 0.7)))
        {
            isCaptured = true;
            console.log("overlapping");

            map.setAttribute('onclick', "window.location.href='scene5.html'; placeVisited('visited', 'arcticVisited');");
            map.id = "icon-glow2";

            setTimeout(showTxt, 200);
            function showTxt() {
                document.getElementById("game-txt").innerHTML = "Captured ✓";
                document.getElementById("game-txt").style.color = "green";

                document.getElementById("game-txt").style.backgroundColor = "white";
                document.getElementById("game-txt").style.padding = "1% 1.5%";
                document.getElementById("game-txt").style.borderRadius = "50px";
            }

            setTimeout(removeTxt, 2000);

            function removeTxt() {
                //remove text
                document.getElementById("game-txt").innerHTML = "";
                document.getElementById("game-txt").style.backgroundColor = "";
                document.getElementById("game-txt").style.padding = "";
                document.getElementById("game-txt").style.borderRadius = "";
            }

            //check if image has already been successfully taken
            capturedCount2 ++;
            console.log(capturedCount2);

            if(capturedCount2 <= 1){
                for(let i = 0; i < 5; i++){
                    score++;
                }

                document.getElementById("pointNotif").style.display = "block";
                setTimeout(removeTxt, 2000);

                function removeTxt() {
                    document.getElementById("pointNotif").style.display = "none";
                }
            }

            //setting increment input value
            document.getElementById("popularity-meter").value = score;
    
            //store score in local storage
            localStorage.setItem("currScore", score);
            console.log("score is: " + score);
                
        }else{
            isCaptured = false;

            setTimeout(showTxt, 200);
            function showTxt() {
                document.getElementById("game-txt").innerHTML = "Not Captured ✗";
                document.getElementById("game-txt").style.color = "red";
                document.getElementById("game-txt").style.backgroundColor = "white";
                document.getElementById("game-txt").style.padding = "1% 1.5%";
                document.getElementById("game-txt").style.borderRadius = "50px";
            }

            setTimeout(removeTxt, 2000);

            function removeTxt() {
                //remove text
                document.getElementById("game-txt").innerHTML = "";
                document.getElementById("game-txt").style.backgroundColor = "";
                document.getElementById("game-txt").style.padding = "";
                document.getElementById("game-txt").style.borderRadius = "";
            }
            
        }
    }

    if(coral1 != null && coral2!= null && coral3 != null){
        var rect3 = coral1.getBoundingClientRect();
        var rect5 = coral3.getBoundingClientRect();

        if (!(rect3.top > (rect2.bottom * 0.7) ||
                rect3.right < (rect2.left  * 1.7) ||
                rect3.bottom < rect2.top ||
                rect3.left > rect2.right)
    
            ||!(rect5.top > (rect2.bottom * 0.67) ||
                rect5.right < rect2.left ||
                rect5.bottom < rect2.top ||
                rect5.left > (rect2.right * 0.83))
        ){
            isCaptured = true;
            console.log("overlapping");

            map.setAttribute('onclick', "window.location.href='scene5.html'; placeVisited('visited3', 'coralVisited');");
            map.id = "icon-glow2";

            setTimeout(showTxt, 200);
            function showTxt() {
                document.getElementById("game-txt").innerHTML = "Captured ✓";
                document.getElementById("game-txt").style.color = "green";
                document.getElementById("game-txt").style.backgroundColor = "white";
                document.getElementById("game-txt").style.padding = "1% 1.5%";
                document.getElementById("game-txt").style.borderRadius = "50px";
            }

            setTimeout(removeTxt, 2000);

            function removeTxt() {
                //remove text
                document.getElementById("game-txt").innerHTML = "";
                document.getElementById("game-txt").style.backgroundColor = "";
                document.getElementById("game-txt").style.padding = "";
                document.getElementById("game-txt").style.borderRadius = "";
            }

            //check if image has already been successfully taken
            capturedCount2 ++;
            console.log(capturedCount2);
            
            if(capturedCount2 <= 1){
                for(let i = 0; i < 5; i++){
                    score++;
                }

                document.getElementById("pointNotif").style.display = "block";
                setTimeout(removeTxt, 2000);

                function removeTxt() {
                    document.getElementById("pointNotif").style.display = "none";
                }
            }
            
            //setting increment input value
            document.getElementById("popularity-meter").value = score;
    
            //store score in local storage
            localStorage.setItem("currScore", score);
            console.log("score is: " + score);
                
        }else{
            isCaptured = false;
            setTimeout(showTxt, 200);
            function showTxt() {
                document.getElementById("game-txt").innerHTML = "Not Captured ✗";
                document.getElementById("game-txt").style.color = "red";
                document.getElementById("game-txt").style.backgroundColor = "white";
                document.getElementById("game-txt").style.padding = "1% 1.5%";
                document.getElementById("game-txt").style.borderRadius = "50px";
            }

            setTimeout(removeTxt, 2000);

            function removeTxt() {
                //remove text
                document.getElementById("game-txt").innerHTML = "";
                document.getElementById("game-txt").style.backgroundColor = "";
                document.getElementById("game-txt").style.padding = "";
                document.getElementById("game-txt").style.borderRadius = "";
            }
        }

        //console.log(rect3);
    }
    
    if(fire != null){
        var rect6 = fire.getBoundingClientRect();

        if (!
            (rect6.top > (rect2.bottom * 0.65) ||
            rect6.right < (rect2.left * 1.5) ||
            rect6.bottom < (rect2.top * 1.6) ||
            rect6.left > (rect2.right * 0.7)))
        {
            isCaptured = true;
            console.log("overlapping");

            map.setAttribute('onclick', "window.location.href='scene5.html'; placeVisited('visited2', 'amazonVisited');");
            map.id = "icon-glow2";

            setTimeout(showTxt, 200);
            function showTxt() {
                document.getElementById("game-txt").innerHTML = "Captured ✓";
                document.getElementById("game-txt").style.color = "green";
                document.getElementById("game-txt").style.backgroundColor = "white";
                document.getElementById("game-txt").style.padding = "1% 1.5%";
                document.getElementById("game-txt").style.borderRadius = "50px";
            }

            setTimeout(removeTxt, 2000);

            function removeTxt() {
                //remove text
                document.getElementById("game-txt").innerHTML = "";
                document.getElementById("game-txt").style.backgroundColor = "";
                document.getElementById("game-txt").style.padding = "";
                document.getElementById("game-txt").style.borderRadius = "";
            }
            
            //check if image has already been successfully taken
            capturedCount2 ++;
            console.log(capturedCount2);

            if(capturedCount2 <= 1){
                for(let i = 0; i < 5; i++){
                    score++;
                }

                document.getElementById("pointNotif").style.display = "block";
                setTimeout(removeTxt, 2000);

                function removeTxt() {
                    document.getElementById("pointNotif").style.display = "none";
                }
            }

            //setting increment input value
            document.getElementById("popularity-meter").value = score;
    
            //store score in local storage
            localStorage.setItem("currScore", score);
            console.log("score is: " + score);
                
        }else{
            isCaptured = false;

            setTimeout(showTxt, 200);
            function showTxt() {
                document.getElementById("game-txt").innerHTML = "Not Captured ✗";
                document.getElementById("game-txt").style.color = "red";
                document.getElementById("game-txt").style.backgroundColor = "white";
                document.getElementById("game-txt").style.padding = "1% 1.5%";
                document.getElementById("game-txt").style.borderRadius = "50px";
            }

            setTimeout(removeTxt, 2000);

            function removeTxt() {
                //remove text
                document.getElementById("game-txt").innerHTML = "";
                document.getElementById("game-txt").style.backgroundColor = "";
                document.getElementById("game-txt").style.padding = "";
                document.getElementById("game-txt").style.borderRadius = "";
            }
        }
    }

    console.log(isCaptured);

    // TAKE SCREENSHOT

    //create new element for screenshot
    var imageTaken = document.createElement("newImg");

    imageTaken.setAttribute('id','newImg');
    imageTaken.setAttribute('class','output');

    var currentDiv = document.getElementById("parent-cam"); 
    currentDiv.insertBefore(imageTaken, currentDiv.cam); 

    // Use the html2canvas function to take a screenshot and append it to the output div

    html2canvas(document.body, {
        x: window.scrollX + rect2.left,
        y: window.scrollY + rect2.top,
        width: rect2.width,
        height: rect2.height,
                
    }).then(canvas => {
        document.getElementById('newImg').appendChild(canvas);
    });

    camera.setAttribute('onmousedown','');

    //remove image after 3 seconds
    setTimeout(appeardiv, 3000);

    function appeardiv() {
        //remove image and restore camera functionality
        imageTaken.remove();
        camera.setAttribute('onmousedown','camClicked(); playEffect("camera-se");');
    }
            
};

function resetCapturedCount(){
    capturedCount = 0;
}
        

/////////SWITCH QUIZ QUESTIONS////////////
//same code from next button, but removed timer to apply to quiz buttons.
//Note: put "scene" in className of each quiz questions div
//Note: put "nextBtn" follow by an increment number in id of each answer buttons

//store the question divs of the specified className into an array
var IdStore = new Array();
function storeSceneId(){
    var className = document.getElementsByClassName('scene');
    var classNameCount = className.length;
    
    for(var j = 0; j < classNameCount; j++){
        IdStore.push(className[j].id);
    }
    console.log("IDs stored in local storage: " + IdStore);
}
storeSceneId();

//show or hide the div when answer button 1 is clicked
var currentIndex = 0
var next = document.getElementsByClassName("btn");

var myFunction = function() {               

    if (currentIndex < IdStore.length-1) {
        console.log('next'); 
        currentIndex += 1;
        console.log("currentIndex is: " + currentIndex);
        var divId = IdStore[currentIndex];
    
        
        console.log("divId and currentIndex: " + divId, currentIndex);
        document.getElementById(divId).style.display = "block";
        var prevIndex = currentIndex - 1;
        console.log("prevIndex is: " + prevIndex);
        if (prevIndex >= 0) {
            var preId = IdStore[prevIndex];
            document.getElementById(preId).style.display = "none";
        }
        
    }

    
}


for (var i = 0; i < next.length; i++) {
    next[i].addEventListener('click', myFunction, false);
}


//Retrieving changed name from local storage
var inputVal = localStorage.getItem("newName");
console.log(inputVal);

if (inputVal == "" || inputVal == null){

    var all2 = document.querySelectorAll('p');

    all2.forEach(x => x.innerHTML = x.innerHTML.replace(/Aeryn/gi, "Aeryn"));
    console.log("name is null");
}

else{
    var all = document.querySelectorAll('p');
    all.forEach(x => x.innerHTML = x.innerHTML.replace(/Aeryn/gi, inputVal));
}

//Chapter Divider
var ch1 = document.getElementById("ch1");
var chap1 = document.getElementById("divider1");
$(".fill-div").click(function() {
    document.getElementById('fill').className = 'chapAni';
    document.getElementById('divider1').className = 'divAni';
    if (ch1.style.opacity == 0){
        console.log("hide");
        setTimeout(function () {
            chap1.style.display = "none";
        }, 800);
    }
});


document.getElementById("bg-music").volume = 0.05;

// $(window).on('load', function () {
//     $('#loading').hide();
// }) 