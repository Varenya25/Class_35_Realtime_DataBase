var ball;
var dataBase;
var pos;

function setup(){
    dataBase = firebase.database();
    createCanvas(500,500);
    ball = createSprite(10,10,10,10);
    ball.shapeColor = "red";
    
    var dbNode = dataBase.ref ("ball/position"); // refer to location in DB
    dbNode.on ("value", readPosition, showError); // listener or read
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

/*function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}*/
function readPosition(data){
    pos = data.val ();
    console.log (pos.x);
    console.log (pos.y);
    // assign back to ball
    ball.x = pos.x;
    ball.y = pos.y;
}
function showError(){
    console.log("error occoured")
}
function writePosition(x,y){
    var dbNode = dataBase.ref ("ball/position"); // refer to location in DB
    dbNode.set ({x:ball.x+x, y:ball.y+y});
}
