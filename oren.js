var user_index=0
var oren_224=false
var oren_0=false
function pack_way(event){
    /* 
    beta控制手机的上下倾斜度，gamma控制手机的左右倾斜度
    beta 0-90 向下  -90-0 向上
    gamma 0-90 向右 -90-0 向左
    */
    const beta = event.beta,
    gamma = event.gamma;
    strokeWeight(packageGap*0.6+1)
    stroke('white')
    point(userPath.X, userPath.Y)
    topWallPx=5+parseInt(user_index%mazelength)*packageGap+0.3*packageGap+1
    downWallPx=5+parseInt(user_index%mazelength+1)*packageGap-0.3*packageGap-1
    leftWallPx=5+parseInt(user_index/mazelength)*packageGap+0.3*packageGap+1
    rightWallPx=5+parseInt(user_index/mazelength+1)*packageGap-0.3*packageGap-1
    //up
    if(beta<0){
        //如果上升后原来这个格子里面
        if(-packageGap*0.05+userPath.Y>topWallPx){
                userPath.Y-=packageGap*0.05
        }//这里是重中之重
        else if(
            canWeGo(user_index,user_index-1)&&
            userPath.X>leftWallPx&&
            userPath.X<rightWallPx
            ){
            userPath.Y-=packageGap*0.05
            user_index-=1
        }
    }
    else if(beta>0){
        //down
        //如果下降后还在原来的格子里面
        if(packageGap*0.05+userPath.Y<downWallPx){
            userPath.Y+=packageGap*0.05
        }else if(
            canWeGo(user_index,user_index+1)&&
            userPath.X>leftWallPx&&
            userPath.X<rightWallPx
            ){
            userPath.Y+=packageGap*0.05
            user_index+=1
        }
    }
    //right
    if(gamma>0){
        if(packageGap*0.05+userPath.X<rightWallPx){
            userPath.X+=packageGap*0.05
        }else if(
            canWeGo(user_index,user_index+15)&&
            userPath.Y>topWallPx&&
            userPath.Y<downWallPx
            ){
            userPath.X+=packageGap*0.05
            user_index+=15
        }
    }//left
    else if(gamma<0){
        if(-packageGap*0.05+userPath.X>leftWallPx){
            userPath.X-=packageGap*0.05
        }else if(
            canWeGo(user_index,user_index-15)&&
            userPath.Y>topWallPx&&
            userPath.Y<downWallPx
            ){
            userPath.X-=packageGap*0.05
            user_index-=15
        }
    }
    strokeWeight(packageGap*0.6)
    stroke('black')
    point(userPath.X, userPath.Y)
    if(oren_224==false&&user_index==mazelength*mazelength-1&&userPath.X>packageGap*14.5&&userPath.Y>packageGap*14.5){
        oren_224=true
        // console.log("yes!")
        //终点奖励
    }
    if(oren_0==false&&oren_224==true&&user_index==0&&userPath.X<=packageGap*0.5+5&&userPath.Y<=packageGap*0.5+5){
        //彩蛋奖励
        oren_0=true
    }
}

window.addEventListener("deviceorientation",pack_way)