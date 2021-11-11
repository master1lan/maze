function get_end(){
    image(img_end,beginPath.X,beginPath.Y,mazeSize.width*0.5,mazeSize.height*0.5);
}


//这里要针对pc和android分别渲染
function star__with_pc(){
    //分为左边和右边
    //左边像素范围 [0,canvasPosition.left]
    
    //右边像素范围 [canvasPosition.right,window.innerWidth]
}