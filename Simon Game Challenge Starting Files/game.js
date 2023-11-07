
buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var started =false;
var level = 0;


//Cand se apasa o tasta pentru prima data se modifica valuarea lui started 
//ca comanda sa nu mai fie activa
$(document).keypress(function(){
    if (!started) {
        $('h1').text("Level " + level );
        nextSequence();
        started = true;
    }
});


// cand oricare dintre elementele cu clasa btn este apasat,
// se ia id ul elementul care dupa se stocheaza intr un array
// userClickedPatter
// se da play la soundul potrivit
// se verifica raspunsul cu argumentul == ultimul element/ultimul index din array
$('.btn').click(function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1);
})


//se verifica daca ultimul element din gamePattern este la fel cu ultimul element din userClickedPattern
// aka daca butonul apasat de user este acelasi cu cel apasat de computer
// daca lungimea arrayurilor este egala inseamna ca secventa s-a terminat si trebuie trecuta la urm aka la urm level
// daca butonul apasat este gresit se schimba tema siteului si se reseteaza jocul
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("succes");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }
    }else{
        var audio = new Audio("./sounds/wrong.mp3")
        audio.play();
        console.log("wrong");
        $('body').addClass("game-over");
        setTimeout(function(){
            $('body').removeClass("game-over")
        },200);

        $("h1").text("Game over, Press any key yo restart")

        startOver();
    }
};


//userCickedPattern se reseteaza astfel incat de fiecare data cand computerul genereaza
//urmatorul pattern sa poate sa fie comparate
//in gamePattern se adauga un nou element
function nextSequence(){
    userClickedPattern =[];

    level++;
    $('h1').text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var randomID = "#" + randomChosenColour;
    $(randomID).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    
}
//creeaza sunetoul potrivit
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour){
    var i = "#" + currentColour;
    $(i).addClass("pressed");

    setTimeout(function(){
        $(i).removeClass('pressed')
    }, 100);
};
//se reseteaza valorile astfel incat jocul sa poate sa fie luat de la capat
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}