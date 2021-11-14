/**
 * 这个文件包含所有设备都会用到的函数和参数
 */
const end_star=[]
//正方形大小，中间量
const squareSize=window.innerHeight>window.innerWidth?
window.innerWidth:window.innerHeight;

//迷宫大小，优化所有的边距
const mazeSize={
    height:squareSize-squareSize%105,
    width:squareSize-squareSize%105
}

//严格按照值来绘制，迷宫的所有边界坐标
const canvasPosition={
    //迷宫左边边界
    left:(window.innerWidth-mazeSize.width)/2,
    //迷宫右边边界
    right:(window.innerWidth+mazeSize.width)/2,
    //迷宫上边边界
    top:(window.innerHeight-mazeSize.height)/2,
    //迷宫下边边界
    bottom:(window.innerHeight+mazeSize.height)/2
}

//每一个格子的宽度
const packageGap=mazeSize.height/mazelength

//迷宫起始点的位置
const beginPath={
    X:canvasPosition.left,
    Y:canvasPosition.top
}

//迷宫终止点的位置
const endPath={
    X:canvasPosition.right,
    Y:canvasPosition.bottom
}

//球的起始点位置应该根据迷宫起始点的位置进行定位
const userPath={
    X:beginPath.X+packageGap/2,
    Y:beginPath.Y+packageGap/2
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
        // setTimeout(function(){
        //     findway()},5)
            findway();
    }
}

function setup(){
    //创建一个全浏览器窗口大小的canvas
    createCanvas(window.innerWidth,window.innerHeight);
    drawChessBoard()
    findway()
    strokeWeight(packageGap*0.6)
    stroke('white')
    point(userPath.X, userPath.Y)
    // end_star.push(loadImage('img/rose.png'))
    // end_star.push(loadImage('img/B612.png'))
    // end_star.push(loadImage('img/planet.png'))
    // end_star.push(loadImage('img/star.png'))
    // end_star.push(loadImage('img/origin.png'))
}


/*
    2D:line(x1,y1,x2,y2)
*/

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
        line(parseInt(x3+1)*packageGap+beginPath.X, y3*packageGap+beginPath.Y,
        parseInt(x3+1)*packageGap+beginPath.X,(y3+1)*packageGap+beginPath.Y)
    }
    else{
        //横线
        line(x3*packageGap+beginPath.X,parseInt(y3+1)*packageGap+beginPath.Y,
        (x3+1)*packageGap+beginPath.X,parseInt(y3+1)*packageGap+beginPath.Y)
    }
}


function drawChessBoard(){//绘画
    stroke("white")
    strokeWeight(3)
    //为什么粗细会不同呢
    for(var i=0;i<mazelength+1;i++){
        //竖线
        line(beginPath.X+i*packageGap,beginPath.Y,
            beginPath.X+i*packageGap,endPath.Y)
        //横线
        line(beginPath.X,beginPath.Y+i*packageGap,
            endPath.X,beginPath.Y+i*packageGap)
    }
    //在224那里话一个东西怎么画呢？
}


function abs(a){
    return a>0?a:-a;
}