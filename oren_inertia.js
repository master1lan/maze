/**
 * 这个对象实现惯性，监控陀螺仪的方向，实时匹配设备偏向
 */
const orenItem={
    //小球坐标
    index:0,
    //小球趋势分量,-1,0,1
    x_trend:0,
    y_trend:0,
    end:false,
    final_begin:false,
}
/**
 * 这个对象实现迷宫墙，需要一个函数实时更新参数
 */
const Wall={
    top:parseInt(orenItem.index%mazelength)*packageGap+0.3*packageGap+2+beginPath.Y,
    bottom:parseInt(orenItem.index%mazelength+1)*packageGap-0.3*packageGap-2+beginPath.Y,
    left:parseInt(orenItem.index/mazelength)*packageGap+0.3*packageGap+2+beginPath.X,
    right:parseInt(orenItem.index/mazelength+1)*packageGap-0.3*packageGap-2+beginPath.X,
}

// 根据index改变墙边界坐标
const changeWall=(indexBefore,indexAfter)=>{
    //上下，只需要改变上下墙边界的坐标，左右同理
    let addItem=parseInt((indexAfter-indexBefore)*packageGap)
    if(abs(indexBefore-indexAfter)==1){
        Wall.top+=addItem
        Wall.bottom+=addItem
    }//左右
    else if(abs(indexBefore-indexAfter)==mazelength){
        Wall.left+=addItem/15
        Wall.right+=addItem/15
    }else{
        return;
    }
}

//绘制小球
function draw(){
    if(is_get_end==true){
        return
    }
    

    if(orenItem.x_trend==0&&orenItem.y_trend==0) return;

    //right
    if(orenItem.x_trend>0){
        if(packageGap*0.05+userPath.X<Wall.right){
            console.log("right without index change")
            letItGo("right",false);
        }
        else if(
            canWeGo(orenItem.index,orenItem.index+mazelength)&&
            userPath.Y<Wall.bottom&&
            userPath.Y>Wall.top
        ){
            console.log("right with index change")
            letItGo("right",true);
        }

    }
    //left
    else if(orenItem.x_trend<0){
        if(-packageGap*0.05+userPath.X>Wall.left){
            console.log("left without index change")
            letItGo("left",false);
        }
        else if(
            canWeGo(orenItem.index,orenItem.index-mazelength)&&
            userPath.Y<Wall.bottom&&
            userPath.Y>Wall.top
        ){
            console.log("left with index change")
            letItGo("left",true);
        }
    }
    //down
    if(orenItem.y_trend>0) {
        // orenItem.y_speed=0.05*packageGap;
        // 如果下降后原来这个格子里面
        if(packageGap*0.05+userPath.Y<Wall.bottom){
            letItGo("down",false);
            // console.log("down without index change")
        }
        //进入下一个格子
        else if(
            canWeGo(orenItem.index,orenItem.index+1)&&
            userPath.X>Wall.left&&
            userPath.X<Wall.right
        ){
            // console.log("down with index change")
            letItGo("down",true);
        }
    }
    //up
    else if(orenItem.y_trend<0){
        // 如果上升后原来这个格子里面
        if(-packageGap*0.05+userPath.Y>Wall.top){
            // console.log("up without index change")
            letItGo("up",false);
        }
        //进入上一个格子
        else if(
            canWeGo(orenItem.index,orenItem.index-1)&&
            userPath.X>Wall.left&&
            userPath.X<Wall.right
        ){
            // console.log("up with index change")
            letItGo("up",true);
        }
    }

    if(orenItem.index==mazelength*mazelength-1&&orenItem.end==false){
        orenItem.end=true;
        is_get_end=true;
        get_end()
    }
    if(orenItem.end==true&&orenItem.index==0&&orenItem.final_begin==false){
        orenItem.final_begin=true;
        finalGift()
    }

    if(orenItem.end==true){
        const path_origin=parseInt(orenItem.index/mazelength)+(orenItem.index%mazelength)     //欧式距离的另类表示，[0,2*mazelength-2]
        // console.log(path_origin)
        if(path_origin<2*4){
            image(end_star[0],beginPath.X+2,beginPath.Y+2,packageGap*0.9,packageGap*0.9)
        }else if(path_origin<2*6){
            image(end_star[7],beginPath.X+2,beginPath.Y+2,packageGap*0.9,packageGap*0.9)
        }else if(path_origin<2*10){
            image(end_star[6],beginPath.X+2,beginPath.Y+2,packageGap*0.9,packageGap*0.9)
        }else if(path_origin<2*13){
            image(end_star[5],beginPath.X+2,beginPath.Y+2,packageGap*0.9,packageGap*0.9)
        }else{
            image(end_star[4],beginPath.X+2,beginPath.Y+2,packageGap*0.9,packageGap*0.9)
        }
    }
    
}


//监视陀螺仪
const orenInertia=(event)=>{
    /* 
    beta控制手机的上下倾斜度，gamma控制手机的左右倾斜度
    beta 0-90 向下  -90-0 向上
    gamma 0-90 向右 -90-0 向左
    */
    const beta = event.beta,
    gamma = event.gamma;

    if(beta>0) orenItem.y_trend=1;
    else if(beta==0) orenItem.y_trend=0;
    else orenItem.y_trend=-1;

    if(gamma>0) orenItem.x_trend=1;
    else if(gamma==0) orenItem.x_trend=0;
    else orenItem.x_trend=-1;
}

window.addEventListener("deviceorientation",orenInertia);

const paintItem={
    before:{
        radius:packageGap*0.6+1,
        color:"rgba(2,29,58,1)",
    },
    after:{
        radius:packageGap*0.6,
        color:"white",
    }
}

const letItGo=(direction,changeindex)=>{

    if(direction=="up"){
        paintBall(paintItem.before.radius,paintItem.before.color);
        userPath.Y-=packageGap*0.05;
        paintBall(paintItem.after.radius,paintItem.after.color);
        if(changeindex){
            changeWall(orenItem.index,orenItem.index-1);
            orenItem.index-=1;
        }
    }else if(direction=="down"){
        paintBall(paintItem.before.radius,paintItem.before.color);
        userPath.Y+=packageGap*0.05;
        paintBall(paintItem.after.radius,paintItem.after.color);
        if(changeindex){
            changeWall(orenItem.index,orenItem.index+1);
            orenItem.index+=1;
        }
    }else if(direction=="left"){
        paintBall(paintItem.before.radius,paintItem.before.color);
        userPath.X-=packageGap*0.05;
        paintBall(paintItem.after.radius,paintItem.after.color);
        if(changeindex){
            changeWall(orenItem.index,orenItem.index-mazelength);
            orenItem.index-=mazelength;
        }
    }else if(direction=="right"){
        paintBall(paintItem.before.radius,paintItem.before.color);
        userPath.X+=packageGap*0.05;
        paintBall(paintItem.after.radius,paintItem.after.color);
        if(changeindex){
            changeWall(orenItem.index,orenItem.index+mazelength);
            orenItem.index+=mazelength;
        }
    }

}

const paintBall=(radius,color)=>{
    strokeWeight(radius)
    stroke(color)
    point(userPath.X, userPath.Y)
}