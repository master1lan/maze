const mazelength=15
const tree = [];//存放是否联通
const isling=[];//判断是否相连

for(let i=0;i<mazelength;i++){
    tree[i]=[];
    for(let j=0;j<mazelength;j++){
        tree[i][j]=0;//初始值为0
    }
}
for(let i=0;i<mazelength*mazelength;i++){
    isling[i]=[];
    for(let j=0;j<mazelength*mazelength;j++){
        isling[i][j]=0;//初始值为0
    }
}

function getnei(a)//获得邻居号  random
{
    var x=parseInt(a/mazelength);//要精确成整数
    var y=a%mazelength;
    var mynei=new Array();//储存邻居
    if(x-1>=0){mynei.push((x-1)*mazelength+y);}//上节点
    if(x+1<14){mynei.push((x+1)*mazelength+y);}//下节点
    if(y+1<14){mynei.push(x*mazelength+y+1);}//有节点
    if(y-1>=0){mynei.push(x*mazelength+y-1);}//下节点
    var ran=parseInt(Math.random() * mynei.length );
    return mynei[ran];
}
function search(a)//找到根节点
{
    if(tree[parseInt(a/mazelength)][a%mazelength]>0)//说明是子节点
    {
        return search(tree[parseInt(a/mazelength)][a%mazelength]);//不能压缩路径路径压缩
    }
    else
        return a;
}
function value(a)//找到树的大小
{
    if(tree[parseInt(a/mazelength)][a%mazelength]>0)//说明是子节点
    {
        return tree[parseInt(a/mazelength)][a%mazelength]=value(tree[parseInt(a/mazelength)][a%mazelength]);//不能路径压缩
    }
    else
        return -tree[parseInt(a/mazelength)][a%mazelength];
}
function union(a,b)//合并
{
    var a1=search(a);//a根
    var b1=search(b);//b根
    if(a1==b1){}
    else{
        if(tree[parseInt(a1/mazelength)][a1%mazelength]<tree[parseInt(b1/mazelength)][b1%mazelength])//这个是负数()，为了简单减少计算，不在调用value函数
        {
            tree[parseInt(a1/mazelength)][a1%mazelength]+=tree[parseInt(b1/mazelength)][b1%mazelength];//个数相加  注意是负数相加
            tree[parseInt(b1/mazelength)][b1%mazelength]=a1;       //b树成为a树的子树，b的根b1直接指向a；
        }else
        {
            tree[parseInt(b1/mazelength)][b1%mazelength]+=tree[parseInt(a1/mazelength)][a1%mazelength];
            tree[parseInt(a1/mazelength)][a1%mazelength]=b1;//a所在树成为b所在树的子树
        }
    }
}

  
    

const canWeGo=(x,y)=>{
    if(x<0||y<0){
        return 0
    }
    if(x>isling.length-1||y>isling.length-1){
        return 0
    }
    return isling[x][y]
}