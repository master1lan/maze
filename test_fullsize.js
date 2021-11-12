/**
 * this file should fill pc and android
 */
//必须在开始的时候渲染
 const end_star=[]

const squareSize=window.innerHeight>window.innerWidth?
                window.innerWidth:window.innerHeight;

const mazeSize={
    height:squareSize-squareSize%105,
    width:squareSize-squareSize%105
}

//严格按照值来绘制
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

function setup(){
    //创建一个全浏览器窗口大小的canvas
    createCanvas(window.innerWidth,window.innerHeight);
    drawChessBoard()
    findway()
    strokeWeight(packageGap*0.6)
    stroke('white')
    point(userPath.X, userPath.Y)
    end_star.push(loadImage('img/rose.png'))
    end_star.push(loadImage('img/B612.png'))
    end_star.push(loadImage('img/planet.png'))
    end_star.push(loadImage('img/star.png'))
    end_star.push(loadImage('img/origin.png'))
}


function draw(){
    if((fullsize_end==true||oren_end==true)&&is_get_end==false){
        play_final(end_star,0)
    }
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
    strokeWeight(3)
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



//下面是适配pc端的设置

var fullsize_end=false
var fullsize_final_begin=false

function keyPressed(){
    if(is_get_end==true){
        return
    }
    var moveUp = keyCode == 38 //|| key=="↑"
    var moveLeft = keyCode == 37 //|| key=="↓"
    var moveDown = keyCode == 40 //|| key=="←"
    var moveRight = keyCode == 39 //|| key=="→"
    var index=(
        parseInt(mazelength*((userPath.X-(beginPath.X+packageGap/2))/packageGap))+
        parseInt((userPath.Y-(beginPath.Y+packageGap/2))/packageGap)
    )
    var addPath=[0,0]
    if(moveUp){
        // console.log("up!")
        addPath[1]=canWeGo(index,index-1)==0?0:-packageGap
        index-=1
    }else if(moveDown){
        // console.log("down!")
        addPath[1]=canWeGo(index,index+1)==0?0:packageGap
        index+=1
    }else if(moveLeft){
        // console.log("left!")
        addPath[0]=canWeGo(index-mazelength,index)==0?0:-packageGap
        index-=mazelength
    }else if(moveRight){
        // console.log("right!")
        addPath[0]=canWeGo(index+mazelength,index)==0?0:packageGap
        index+=mazelength
    }
    strokeWeight(packageGap*0.6+1)
    stroke('rgba(2,29,58,1)')
    point(userPath.X, userPath.Y)
    userPath.X+=addPath[0]
    userPath.Y+=addPath[1]
    //pc端的移动距离是固定的
    if(fullsize_end==false&&index==mazelength*mazelength-1){
        fullsize_end=true
        is_get_end=true
        //终点奖励
        get_end()
    }
    if(fullsize_final_begin==false&&fullsize_end==true&&index==0){
        //彩蛋奖励
        fullsize_final_begin=true
        

    }
    if(fullsize_end==true){
        tint(255,0)
        image(end_star[0],beginPath.X,beginPath.Y,packageGap*0.9,packageGap*0.9)
        tint(255,(30-index/mazelength-index%mazelength)/30*10)
        image(end_star[0],beginPath.X,beginPath.Y,packageGap*0.9,packageGap*0.9)
    }
    strokeWeight(packageGap*0.6)
    stroke('white')
    point(userPath.X, userPath.Y)
}
