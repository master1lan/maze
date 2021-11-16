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
        // console.log("yes")
        finalGift()
    }
    if(fullsize_end==true){
        //准备几个不同透明度的rose
        const path_origin=parseInt(index/mazelength)+(index%mazelength)     //欧式距离的另类表示，[0,2*mazelength-2]
        // console.log(path_origin)
        if(path_origin<2*4){
            image(end_star[0],beginPath.X+2,beginPath.Y+2,packageGap*0.9,packageGap*0.9);
        }else if(path_origin<2*6){
            image(end_star[7],beginPath.X+2,beginPath.Y+2,packageGap*0.9,packageGap*0.9);
        }else if(path_origin<2*10){
            image(end_star[6],beginPath.X+2,beginPath.Y+2,packageGap*0.9,packageGap*0.9);
        }else if(path_origin<2*13){
            image(end_star[5],beginPath.X+2,beginPath.Y+2,packageGap*0.9,packageGap*0.9);
        }else{
            image(end_star[4],beginPath.X+2,beginPath.Y+2,packageGap*0.9,packageGap*0.9);
        }
    }
    strokeWeight(packageGap*0.6)
    stroke('white')
    point(userPath.X, userPath.Y)
}
