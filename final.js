
function get_end(){
    document.getElementById("end").style.visibility="visible";
}

function play_final(end_star){
    if(window.innerHeight>window.innerWidth){
        //android
        // image(end_star[4],0,0,window.innerWidth,canvasPosition.top-5)
        // image(end_star[4],0,canvasPosition.bottom,window.innerWidth,canvasPosition.top)
        star_with_android(end_star)
    }else{
        //pc
        // image(end_star[4],0,0,canvasPosition.left,window.innerHeight)
        // image(end_star[4],canvasPosition.right,0,canvasPosition.left,window.innerHeight)
        star_with_pc(end_star)
    }
}


//这里要针对pc和android分别渲染
function star_with_pc(end_star){
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

function star_with_android(end_star){
    //分为上面和下面
    //上面像素范围 [0,canvasPosition.top]

    //B612
    image(end_star[1],beginPath.X,0,beginPath.Y/2*0.3,beginPath.Y*0.3);
    image(end_star[2],beginPath.X+beginPath.Y/2*0.9,0,beginPath.Y/2*0.6,beginPath.Y*0.6);
    image(end_star[3],beginPath.X+packageGap*7,0,beginPath.Y/2*0.4,beginPath.Y*0.4);
    image(end_star[2],beginPath.X+packageGap*9,0,beginPath.Y/2*0.8,beginPath.Y*0.8);
    image(end_star[3],beginPath.X+packageGap*13,0,beginPath.Y/2*0.2,beginPath.Y*0.2);
    //下面像素范围 [canvasPosition.bottom,window.innerHeight]
    image(end_star[3],beginPath.X-packageGap,endPath.Y,packageGap*2,packageGap*4);
    image(end_star[2],beginPath.X+packageGap*2,endPath.Y,beginPath.Y/2*0.4,beginPath.Y*0.4);
    image(end_star[3],beginPath.X+packageGap*6,endPath.Y,beginPath.Y/2*0.5,beginPath.Y*0.5);
    image(end_star[3],beginPath.X+packageGap*8,endPath.Y,beginPath.Y/2*0.3,beginPath.Y*0.3);
    image(end_star[2],beginPath.X+packageGap*11,endPath.Y,beginPath.Y/2*0.8,beginPath.Y*0.8);
    image(end_star[3],beginPath.X+packageGap*13,endPath.Y,beginPath.Y/2*0.6,beginPath.Y*0.6);
}


function max(a,b){
    return a>b?a:b;
}

