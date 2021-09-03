// our arrays
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false; // check if the game started
level = 0; // keep track of the levels

// starting the game for mobile
$(".mobile-button").on("click", function() {
    if(!started)
    {
        started = true;
        nextSequence();
    }
});

// changing title
if($(window).width() < 768)
{
    $("#level-title").text("Press START button");
}
else
{
    $("#level-title").text("Press A Key to Start");
}

$(window).resize(function() {
    if($(window).width() < 768)
    {
        $("#level-title").text("Press START button");
    }
    else
    {
        $("#level-title").text("Press A Key to Start");
    }
})


// start the game when press a key
$(document).on("keydown", function() {
    if(!started)
    {
        started = true;
        nextSequence();
    }
});

// function for playing sound
function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

// function for animating
function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// function for the next sequence
function nextSequence()
{
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// event handler when a button is clicked
$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

// check the answer
function checkAnswer(lastElement)
{
    if(gamePattern[lastElement] === userClickedPattern[lastElement])
    {
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)

        if($(window).width() > 768)
        {
            $("#level-title").text("Game Over, Press Any Key To Start");
        }
        else
        {
            $("#level-title").text("Game Over, Press START Button");
        }

        startOver();
    }
}

// function for restart the game
function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}