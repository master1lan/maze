//下面是适配pc端的设置

var fullsize_end=false
var fullsize_final_begin=false

function keyPressed(){
    // if(is_get_end==true){
    //     return
    // }
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
    // if(fullsize_end==false&&index==mazelength*mazelength-1){
    //     fullsize_end=true
    //     is_get_end=true
    //     //终点奖励
    //     get_end()
    //     play_final(end_star,0)
    // }
    // if(fullsize_final_begin==false&&fullsize_end==true&&index==0){
    //     //彩蛋奖励
    //     fullsize_final_begin=true
    //     console.log("yes")

    // }
    // if(fullsize_end==true){
    //     tint(255,0)
    //     image(end_star[0],beginPath.X,beginPath.Y,packageGap*0.9,packageGap*0.9)
    //     tint(255,(30-index/mazelength-index%mazelength)/30*10)
    //     image(end_star[0],beginPath.X,beginPath.Y,packageGap*0.9,packageGap*0.9)
    // }
    strokeWeight(packageGap*0.6)
    stroke('white')
    point(userPath.X, userPath.Y)
}
