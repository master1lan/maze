
function get_end(){
    document.getElementById("end").style.visibility="visible";
}

function play_final(end_star,degree){
    if(window.innerHeight>window.innerWidth){
        //android
        image(end_star[4],0,0,window.innerWidth,canvasPosition.top-5)
        image(end_star[4],0,canvasPosition.bottom,window.innerWidth,canvasPosition.top)
        star_with_android(end_star,degree)
    }else{
        //pc
        image(end_star[4],0,0,canvasPosition.left,window.innerHeight)
        image(end_star[4],canvasPosition.right,0,canvasPosition.left,window.innerHeight)
        star_with_pc(end_star,degree)
    }
}


//这里要针对pc和android分别渲染
function star_with_pc(end_star,degree){
    //分为左边和右边
    //左边像素范围 [0,canvasPosition.left]
    //B612
    image(end_star[1],beginPath.X-packageGap,beginPath.Y,packageGap,packageGap*2);
    image(end_star[2],packageGap*4-Math.random(),0+Math.random(),packageGap*3,packageGap*6)
    image(end_star[2],packageGap*1-Math.random(),0+Math.random(),packageGap*5,packageGap*10)
    image(end_star[3],packageGap*1-Math.random(),0+Math.random(),packageGap*2,packageGap*4)
    // 右边像素范围 [canvasPosition.right,window.innerWidth]
    image(end_star[3],endPath.X+packageGap*2-Math.random(),0+Math.random(),packageGap*2,packageGap*4)
    image(end_star[2],endPath.X+packageGap*3-Math.random(),0+Math.random(),packageGap*3,packageGap*6)
}

function star_with_android(end_star,degree){
    //分为上面和下面
    //上面像素范围 [0,canvasPosition.top]

    //B612
    image(end_star[1],beginPath.X,0,packageGap,packageGap*2);
    image(end_star[2],beginPath.X+packageGap*3-Math.random(),0+Math.random(),packageGap*2,packageGap*4);
    image(end_star[3],beginPath.X+packageGap*7-Math.random(),0+Math.random(),packageGap*1.5,packageGap*3);
    image(end_star[2],beginPath.X+packageGap*9-Math.random(),0+Math.random(),packageGap*2.5,packageGap*5);
    image(end_star[3],beginPath.X+packageGap*13-Math.random(),0+Math.random(),packageGap,packageGap*2);
    //下面像素范围 [canvasPosition.bottom,window.innerHeight]
    image(end_star[3],beginPath.X,endPath.Y,packageGap*2,packageGap*4);
    image(end_star[2],beginPath.X+packageGap*3+Math.random(),endPath.Y+Math.random(),packageGap*2,packageGap*4);
    image(end_star[3],beginPath.X+packageGap*7+Math.random(),endPath.Y+Math.random(),packageGap*2,packageGap*4);
    image(end_star[3],beginPath.X+packageGap*9+Math.random(),endPath.Y+Math.random(),packageGap*2,packageGap*4);
    image(end_star[2],beginPath.X+packageGap*12+Math.random(),endPath.Y+Math.random(),packageGap*2,packageGap*4);
    image(end_star[3],beginPath.X+packageGap*14+Math.random(),endPath.Y+Math.random(),packageGap*2,packageGap*4);
}


function max(a,b){
    return a>b?a:b;
}

