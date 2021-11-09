var user_index=0
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
    topWallPx=5+parseInt(user_index%15)*packageGap+0.3*packageGap+1
    downWallPx=5+parseInt(user_index%15+1)*packageGap-0.3*packageGap-1
    leftWallPx=5+parseInt(user_index/15)*packageGap+0.3*packageGap+1
    rightWallPx=5+parseInt(user_index/15+1)*packageGap-0.3*packageGap-1
    //up
    if(beta<0){
        //如果上升后原来这个格子里面
        if(-packageGap*0.1+userPath.Y>topWallPx){
                userPath.Y-=packageGap*0.1
        }//这里是重中之重
        else if(
            canWeGo(user_index,user_index-1)&&
            userPath.X>leftWallPx&&
            userPath.X<rightWallPx
            ){
            userPath.Y-=packageGap*0.1
            user_index-=1
        }
    }
    else if(beta>0){
        //down
        //如果下降后还在原来的格子里面
        if(packageGap*0.1+userPath.Y<downWallPx){
            userPath.Y+=packageGap*0.1
        }else if(
            canWeGo(user_index,user_index+1)&&
            userPath.X>leftWallPx&&
            userPath.X<rightWallPx
            ){
            userPath.Y+=packageGap*0.1
            user_index+=1
        }
    }
    //right
    if(gamma>0){
        if(packageGap*0.1+userPath.X<rightWallPx){
            userPath.X+=packageGap*0.1
        }else if(
            canWeGo(user_index,user_index+15)&&
            userPath.Y>topWallPx&&
            userPath.Y<downWallPx
            ){
            userPath.X+=packageGap*0.1
            user_index+=15
        }
    }//left
    else if(gamma<0){
        if(-packageGap*0.1+userPath.X>leftWallPx){
            userPath.X-=packageGap*0.1
        }else if(
            canWeGo(user_index,user_index-15)&&
            userPath.Y>topWallPx&&
            userPath.Y<downWallPx
            ){
            userPath.X-=packageGap*0.1
            user_index-=15
        }
    }

}

window.addEventListener("deviceorientation",pack_way)