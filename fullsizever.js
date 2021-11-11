/*
    for auto fullscreen
*/
const autosize=window.innerHeight>window.innerWidth?window.innerWidth:window.innerHeight;

const screenFace={
    height:autosize-autosize%105,
    width:autosize-autosize%105
}

const canvasMargin={
    LR:(window.innerWidth-screenFace.width)/2,
    TD:(window.innerHeight-screenFace.height)/2
}

const packageGap=screenFace.height/mazelength

const userPath={
    X:packageGap/2+5,
    Y:packageGap/2+5
}


function setup(){
    createCanvas(screenFace.width+10,screenFace.height+10);
    let divCanvas=select('canvas')
    divCanvas.style('position','absolute')
    divCanvas.style('top',canvasMargin.TD)
    divCanvas.style('bottom',canvasMargin.TD)
    divCanvas.style('left',canvasMargin.LR)
    divCanvas.style('right',canvasMargin.LR)
    drawChessBoard();//绘制棋盘
    findway()
}
//严重影响感官
// function draw(){
    // strokeWeight(packageGap*0.6)
    // stroke('black')
    // point(userPath.X, userPath.Y)
// }

var fullsize_224=false
var fullsize_0=false

function keyPressed(){
    var moveUp = keyCode == 38 //|| key=="W"
    var moveLeft = keyCode == 37 //|| key=="S"
    var moveDown = keyCode == 40 //|| key=="A"
    var moveRight = keyCode == 39 //|| key=="D"
    var index=parseInt(
        mazelength*((userPath.X-5-0.5*packageGap)/packageGap)+
        ((userPath.Y-5-0.5*packageGap)/packageGap)
    )
    var addPath=[0,0]
    // console.log({index})
    if(moveUp){
        // console.log("up!")
        addPath[1]=canWeGo(index,index-1)==0?0:-packageGap
    }else if(moveDown){
        // console.log("down!")
        addPath[1]=canWeGo(index,index+1)==0?0:packageGap
    }else if(moveLeft){
        // console.log("left!")
        addPath[0]=canWeGo(index-mazelength,index)==0?0:-packageGap
    }else if(moveRight){
        // console.log("right!")
        addPath[0]=canWeGo(index+mazelength,index)==0?0:packageGap
    }
    strokeWeight(packageGap*0.6+1)
    stroke('white')
    point(userPath.X, userPath.Y)
    userPath.X+=addPath[0]
    userPath.Y+=addPath[1]
    var index=parseInt(
        mazelength*((userPath.X-5-0.5*packageGap)/packageGap)+
        ((userPath.Y-5-0.5*packageGap)/packageGap)
    )
    //
    if(fullsize_224==false&&index==224&&userPath.X>packageGap*14.5&&userPath.Y>packageGap*14.5){
        fullsize_224=true
        // console.log("wow")
        //终点奖励
    }
    if(fullsize_0==false&&fullsize_224==true&&user_index==0&&userPath.X<=packageGap*0.5+5&&userPath.Y<=packageGap*0.5+5){
        //彩蛋奖励
        fullsize_0=true
    }
    var addPath=[0,0]
    strokeWeight(packageGap*0.6)
    stroke('black')
    point(userPath.X, userPath.Y)
    // console.log({index})

}

function findway(){
    if(search(0)!=search(mazelength*mazelength-1)){
        var num = parseInt(Math.random() * mazelength*mazelength );
        var neihbour=getnei(num);
        if(search(num)!=search(neihbour)){
        isling[num][neihbour]=1;
        isling[neihbour][num]=1;
        drawline(num,neihbour);//划线
        union(num,neihbour);
        }
        setTimeout(function(){
            findway()},5)
            // findway();
    }
}




function drawline(a,b)//划线，要判断是上下还是左右
{
    var x1=parseInt(a/mazelength);
    var y1=a%mazelength;
    var x2=parseInt(b/mazelength);
    var y2=b%mazelength;        
    var x3=(x1+x2)/2;
    var y3=(y1+y2)/2;
    // stroke('green')
    stroke("rgba(2,29,58,1)")
    strokeWeight(4)
    if(x1-x2==1||x1-x2==-1)//左右方向的点  需要上下划线
    {
        //竖线
        line(parseInt(x3+1)*packageGap+5, y3*packageGap+5,
        parseInt(x3+1)*packageGap+5,(y3+1)*packageGap+5)
        // line(29+x3*30, y3*30+16,29+x3*30+2,y3*30+16+28)
    }
    else{
        //横线
        line(x3*packageGap+5,parseInt(y3+1)*packageGap+5,
        (x3+1)*packageGap+5,parseInt(y3+1)*packageGap+5)
        // line(x3*30+16, 29+y3*30,x3*30+16+28,29+y3*30+2)
    }
}

/*
    2D:line(x1,y1,x2,y2)
*/

function drawChessBoard(){//绘画
    stroke("white")
    strokeWeight(3)
    //为什么粗细会不同呢
    for(var i=0;i<mazelength+1;i++){
        //竖线
        line(i*packageGap+5,5,
            i*packageGap+5,screenFace.height+5)
        // line(15+i*30,15,15+i*30,15+30*mazelength)
        //横线
        line(5,i*packageGap+5,
            screenFace.width+5,i*packageGap+5)
        // line(15,15+i*30,15+30*mazelength,15+i*30)
    }
    //在224那里话一个东西怎么画呢？
}

function abs(a){
    return a>0?a:-a
}


