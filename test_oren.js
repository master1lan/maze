function phone_oren_way(event){
    /* 
    beta控制手机的上下倾斜度，gamma控制手机的左右倾斜度
    beta 0-90 向下  -90-0 向上
    gamma 0-90 向右 -90-0 向左
    */
    const beta = event.beta,
        gamma = event.gamma;
    strokeWeight(packageGap*0.52)
    stroke('white')
    point(userPath.X, userPath.Y)
    var index=point_index()
    console.log(userPath.Y)
    // up and down
    if(abs(beta)>abs(gamma)){
        // const packageGap=screenFace.height/15
        //down
        if(beta>0){
            //no wall on down 
            if(canWeGo(index,index+1)){
                userPath.Y+=add_path(beta)
            }else if(userPath.Y<parseInt(index/mazelength+1)*packageGap-0.1*packageGap){
                userPath.Y+=add_path(beta)
            }
        }//up
        else if(beta<0){
            if(canWeGo(index,index-1)){
                userPath.Y-=add_path(beta)
            }else if(userPath.Y>(max(index/mazelength-1,0.5))*packageGap+0.1*packageGap){
                userPath.Y-=add_path(beta)
            }
        }
    }// left and right
    else{
        if(gamma>0){
            if(canWeGo(index,index+mazelength)){
                userPath.X+=add_path(gamma)
            }else if(userPath.X<parseInt(index%mazelength+1)*packageGap-0.1*packageGap){
                userPath.X+=add_path(gamma)
            }
        }else if(gamma<0){
            if(canWeGo(index,index-mazelength)){
                userPath.X-=add_path(gamma)
            }else if(userPath.X>max(index%mazelength-1,0.5)*packageGap+0.1*packageGap){
                userPath.X-=add_path(gamma)
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
    return parseInt(packageGap/90*abs(area))
}

window.addEventListener("deviceorientation",phone_oren_way)