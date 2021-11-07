function phone_oren_way(event){
    /* 
    beta控制手机的上下倾斜度，gamma控制手机的左右倾斜度
    beta 0-90 向下  -90-0 向上
    gamma 0-90 向右 -90-0 向左
    */
    const beta = event.beta,
        gamma = event.gamma;
    strokeWeight(packageGap*0.55)
    stroke('white')
    point(userPath.X, userPath.Y)
    console.log(userPath)
    var index=point_index()
    // up and down
    const thePackageWay=userPath.Y+packageGap*0.55<parseInt(index/mazelength+1)*packageGap+5
    &&userPath.Y-packageGap*0.55>parseInt(max(index/mazelength-1,0))*packageGap+5
    &&userPath.X+packageGap*0.55<parseInt(index%mazelength+1)*packageGap+5
    &&userPath.X-packageGap*0.55>parseInt(max(index%mazelength-1,0))*packageGap+5
        // const packageGap=screenFace.height/15
        //down
        if(beta>0){
            //向下移动的时候，好像没有什么要特别关注的
            if(thePackageWay||canWeGo(index,index+1)){
                userPath.Y+=add_path(beta)
            }
        }//up
        else if(beta<0){
            //向上移动的时候，需要额外判断边界墙
            if(thePackageWay||canWeGo(index,index-1)){
                userPath.Y-=add_path(beta)
            }
        }
    // left and right
        if(gamma>0){
            if(thePackageWay||canWeGo(index,index+mazelength)){
                userPath.X+=add_path(gamma)
            }
        }else if(gamma<0){
            if(thePackageWay||canWeGo(index,index-mazelength)){
                userPath.X-=add_path(gamma)
            }
        }

}
var user_index=0


function pack_way(event){
    const beta = event.beta,
    gamma = event.gamma;
    strokeWeight(packageGap*0.55)
    stroke('white')
    point(userPath.X, userPath.Y)
    if(abs(beta*0.5)>abs(gamma)){
        //up
        if(beta<0){
            //如果上升后原来这个格子里面
            if(
                -packageGap*0.1+userPath.Y>5+parseInt(user_index%15)*packageGap+0.5*packageGap
                
                ){
                userPath.Y-=packageGap*0.1
            }//否则，就这个格子和上一个格子是否打通了
            else if(canWeGo(user_index,user_index-1)){
                userPath.Y-=packageGap*0.1
                user_index-=1
            }
        }else if(beta>0){
            //down
            //如果下降后还在原来的格子里面
            if(packageGap*0.1+userPath.Y<5+parseInt(user_index%15+1)*packageGap-0.5*packageGap){
                userPath.Y+=packageGap*0.1
            }else if(canWeGo(user_index,user_index+1)){
                userPath.Y+=packageGap*0.1
                user_index+=1
            }
        }
    }else{
        //right
        if(gamma>0){
            if(packageGap*0.1+userPath.X<parseInt(user_index/15+1)*packageGap-0.5*packageGap){
                userPath.X+=packageGap*0.1
            }else if(canWeGo(user_index,user_index+15)){
                userPath.X+=packageGap*0.1
                user_index+=15
            }
        }//left
        else if(gamma<0){
            if(-packageGap*0.1+userPath.X>parseInt(user_index/15)*packageGap+0.5*packageGap){
                userPath.X-=packageGap*0.1
            }else if(canWeGo(user_index,user_index-15)){
                userPath.X-=packageGap*0.1
                user_index-=15
            }
        }
    }

}



function max(a,b){
    return a>b?a:b
}

function point_index(){
    /*
    当点位于(0,0)向(0,1)移动时，无论是否有墙都必须可以移动，直到碰到墙
    */
    return mazelength*parseInt((userPath.X-5-0.5*packageGap)/packageGap)+parseInt((userPath.Y-5-0.5*packageGap)/packageGap)

}

function add_path(area){
    return parseInt(packageGap/180*abs(area))
}

// window.addEventListener("deviceorientation",phone_oren_way)
window.addEventListener("deviceorientation",pack_way)