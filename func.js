const userPath={
    X:30,
    Y:30
}

function setup(){
    createCanvas(600,600);
    drawChessBoard();//绘制棋盘
    findway()
}

function draw(){
    // strokeWeight(15)
    // stroke('black')
    // point(userPath.X, userPath.Y)
    // square(userPath.X-10, userPath.Y-10 ,18)
    // fill('black')
    
}

var beat=[]
for(let i=0;i<225;i++){
    beat[i]=[]
    for(let j=0;j<225;j++){
        beat[i][j]=1
    }
}


var flag=false
var quene=[0]

function dfs(index){
    if(index==224){
        console.log("yes, indeed!")
        flag=true
        return;
    }
    if(flag){
        return ;
    }
    //down
    if(canWeGo(index,index+1)&&beat[index][index+1]==1){
        console.log([index,index+1])
        beat[index][index+1]=0
        beat[index+1][index]=0

        quene.push(index+1)
        dfs(index+1)
        if(flag){
            return ;
        }
        beat[index][index+1]=1
        beat[index+1][index]=1
        // quene.pop()
    }//right
    if(canWeGo(index,index+15)&&beat[index][index+15]==1){
        console.log([index,index+15])
        beat[index][index+15]=0
        beat[index+15][index]=0

        quene.push(index+15)
        dfs(index+15)
        
        if(flag){
            return ;
        }
        beat[index][index+15]=1
        beat[index+15][index]=1
        // quene.pop()
    }//up
    if(canWeGo(index,index-1)&&beat[index][index-1]==1){
        console.log([index,index-1])
        beat[index][index-1]=0
        beat[index-1][index]=0
        quene.push(index-1)
        dfs(index-1)
        if(flag){
            return ;
        }
        beat[index][index-1]=1
        beat[index-1][index]=1
        // quene.pop()
    }//left
    if(canWeGo(index,index-15)&&beat[index][index-15]){
        console.log([index,index-15])
        beat[index][index-15]=0
        beat[index-15][index]=0
        quene.push(index-15)
        dfs(index-15)
        if(flag){
            return ;
        }
        beat[index][index-15]=1
        beat[index-15][index]=1
        // quene.pop()
    }
    
}

function road(){
    var index
    if(quene.length){
        index=quene.shift()
        strokeWeight(15)
        stroke('black')
        point((parseInt(index/15)+1)*30,(parseInt(index%15)+1)*30)
    }
    setTimeout(function(){
        road()
    },100)
}

setTimeout(function(){
    dfs(0)
    road()
},3000)




function keyPressed(){
    var moveUp = keyCode == 38 //|| key=="W"
    var moveLeft = keyCode == 37 //|| key=="S"
    var moveDown = keyCode == 40 //|| key=="A"
    var moveRight = keyCode == 39 //|| key=="D"
    var index=15*(userPath.X/30-1)+(userPath.Y/30)-1
    var addPath=[0,0]
    console.log({index})
    if(moveUp){
        console.log("up!")
        addPath[1]=canWeGo(index,index-1)==0?0:-30
    }else if(moveDown){
        console.log("down!")
        addPath[1]=canWeGo(index,index+1)==0?0:30
    }else if(moveLeft){
        console.log("left!")
        addPath[0]=canWeGo(index-15,index)==0?0:-30
    }else if(moveRight){
        console.log("right!")
        addPath[0]=canWeGo(index+15,index)==0?0:30
    }
    strokeWeight(16)
    stroke('white')
    point(userPath.X, userPath.Y)
    
    userPath.X+=addPath[0]
    userPath.Y+=addPath[1]
    addPath=[0,0]

}


function findway(){
    if(search(0)!=search(mazelength*mazelength-1)){
        var num = parseInt(Math.random() * mazelength*mazelength );
        //产生一个小于196的随机数
        var neihbour=getnei(num);
        if(search(num)!=search(neihbour)){
        isling[num][neihbour]=1;
        isling[neihbour][num]=1;
        drawline(num,neihbour);//划线
        union(num,neihbour);
        }
        // setTimeout(function(){
        //     findway()},5)
        findway()
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
    stroke(255)
    strokeWeight(4)
    if(x1-x2==1||x1-x2==-1)//左右方向的点  需要上下划线
    {
        line(29+x3*30, y3*30+16,29+x3*30+2,y3*30+16+28)
        // context.clearRect(29+x3*30, y3*30+16,2,28);
    }
    else{
        line(x3*30+16, 29+y3*30,x3*30+16+28,29+y3*30+2)
        // context.clearRect(x3*30+16, 29+y3*30,28,2);
    }
}

function drawChessBoard(){//绘画
    for(var i=0;i<mazelength+1;i++){
        line(15+i*30,15,15+i*30,15+30*mazelength)
        line(15,15+i*30,15+30*mazelength,15+i*30)
    }
}

function abs(a){
    return a>0?a:-a
}


