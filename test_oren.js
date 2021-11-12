var user_index=0
var oren_end=false
var oren_final_begin=false
function pack_way(event){
    if(is_get_end==true){
        return
    }
    /* 
    beta控制手机的上下倾斜度，gamma控制手机的左右倾斜度
    beta 0-90 向下  -90-0 向上
    gamma 0-90 向右 -90-0 向左
    */
    const beta = event.beta,
    gamma = event.gamma;
    //先覆盖,或许是这里出现了抖动？
    const val_item={
        x:userPath.X,
        y:userPath.Y
    }
    topWallPx=parseInt(user_index%mazelength)*packageGap+0.3*packageGap+1+beginPath.Y
    downWallPx=parseInt(user_index%mazelength+1)*packageGap-0.3*packageGap-1+beginPath.Y
    leftWallPx=parseInt(user_index/mazelength)*packageGap+0.3*packageGap+1+beginPath.X
    rightWallPx=parseInt(user_index/mazelength+1)*packageGap-0.3*packageGap-1+beginPath.X
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


    strokeWeight(packageGap*0.6+1)
    stroke('rgba(2,29,58,1)')
    point(val_item.x,val_item.y)
    strokeWeight(packageGap*0.6)
    stroke('white')
    point(userPath.X, userPath.Y)


    if(oren_end==false&&user_index==mazelength*mazelength-1&&userPath.X>endPath.X-packageGap/2&&userPath.Y>endPath.Y-packageGap/2){
        oren_end=true
        is_get_end=true
        //终点奖励
        get_end()
    }
    if(oren_final_begin==false&&oren_end==true&&user_index==0&&userPath.X<beginPath.X+packageGap/2&&userPath.Y<=beginPath.Y+packageGap/2){
        //彩蛋奖励
        oren_final_begin=true

    }
    if(oren_end==true){
        tint(255,0)
        image(end_star[0],beginPath.X,beginPath.Y,packageGap*0.9,packageGap*0.9)
        tint(255,(30-user_index/mazelength-user_index%mazelength)/30*10)
        image(end_star[0],beginPath.X,beginPath.Y,packageGap*0.9,packageGap*0.9)
    }
    
}

window.addEventListener("deviceorientation",pack_way)