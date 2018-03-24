function disappear(i)
{
    if(i<8)
    {
        var x=document.getElementsByName(i);
        for(var j=0;j<x.length;j++)
        {
            x.item(j).src ="../../static/job/"+ i+".svg";
        }
        document.getElementById("t"+i).style.display="none";
    }
    else
    {
        var x=document.getElementsByName(document.getElementById("p"+i).name);
        for(var j=0;j<x.length;j++)
        {
            x.item(j).src = "../../static/job/"+document.getElementById("p"+i).name+".svg";
        }
        document.getElementById("t"+document.getElementById("p"+i).name).style.display="none";
    }
}
function show(i)
{
    if(i<8)
    {
        var x=document.getElementsByName(i);
        for(var j=0;j<x.length;j++)
        {
            x.item(j).src = "../../static/job/"+i+"_2.svg";
        }
        document.getElementById("t"+i).style.display = "block";
    }
    else
    {
        var x=document.getElementsByName(document.getElementById("p"+i).name);
        for(var j=0;j<x.length;j++)
        {
            x.item(j).src = "../../static/job/"+document.getElementById("p"+i).name+"_2.svg";
        }
        document.getElementById("t"+document.getElementById("p"+i).name).style.display = "block";
    }
}
function get()
{
    var old=new Array(41,293,212,95,64,1079,137);
    var max=0;
    for(var i=0;i<7;i++)
    {
        max=max+old[i];
    }
    var data=new Array();
    for(var i=0;i<7;i++)
    {
        data[i]=Math.round(old[i]/max * 100)/100;
    }
    document.getElementById("t1").innerHTML="农民："+data[0];
    document.getElementById("t2").innerHTML="工人："+data[1];
    document.getElementById("t3").innerHTML="服务业："+data[2];
    document.getElementById("t4").innerHTML="经商："+data[3];
    document.getElementById("t5").innerHTML="家务："+data[4];
    document.getElementById("t6").innerHTML="教师/公务员/职员等："+data[5];
    document.getElementById("t7").innerHTML="其他："+data[6];
    return data;
}
function minlist(a)
{
    var data=new Array(1,2,3,4,5,6,7);
    for(var j=0;j<a.length-1;j++)
    {
        for(var i=0; i<a.length-1-j;i++)
        {
            if(a[i]>a[i+1])
            {
                var temp=a[i];
                a[i]=a[i+1];
                a[i+1]=temp;
                var temp1=data[i];
                data[i]=data[i+1];
                data[i+1]=temp1;
            }
        }
    }
    var b=new Array(a,data);
    return b;
}
function dividep(p,t,c)
{
    var top=c[1];
    var left=c[0];
    var bottom=c[1];
    var right=c[0];
    while(p>0.00001)
    {
        document.getElementById("p"+c[0]+c[1]).src="../../static/job/"+t+".svg";
        document.getElementById("p"+c[0]+c[1]).name=t;

        p=p-0.05;
        bottom=c[1];
        right=c[0];

        if(c[2]==0)
        {
            if(c[0]==5)
            {
                c[1]=c[1]+1;
                c[2]=1;
                c[0]=5;
            }
            else
            {
                c[0]=c[0]+1;
            }
        }
        else
        {
            if(c[0]==1)
            {
                c[1]=c[1]+1;
                c[2]=0;
                c[0]=1;
            }
            else
            {
                c[0]=c[0]-1;
            }
        }

        if(c[1]==5 || p==0)
        {
            break;
        }
    }
    if(top==bottom)
    {
        document.getElementById("p"+t).style.top=(100*top+160)+"px";
        document.getElementById("p"+t).style.left=( ((Math.abs(left-right)+1)*150-100)/2+Math.min(right,left)*150+550 )+"px";
    }
    else
    {
        document.getElementById("p"+t).style.top=((100*(bottom-top+1)-100)/2+160+100*top)+"px";
        if((bottom-top)>1)
        {
            document.getElementById("p"+t).style.left="900px";
        }
        else
        {
            if(top%2==0)
            {
                document.getElementById("p"+t).style.left=( ((Math.abs(left-right)+1)*150-100)/2+Math.min(right,left)*150+550-(Math.min(right,left)-1)*75 )+"px";
            }
            else
            {
                document.getElementById("p"+t).style.left=( ((Math.abs(left-right)+1)*150-100)/2+Math.min(right,left)*150+550+(5-Math.max(right,left))*75 )+"px";
            }
        }
    }
    return c;
}
function init()
{
    var datas=minlist(get());
    var datat=datas[1];
    var datap=datas[0];
    var lr=[1,1,0];//left ; line ; isasc 0 asc 1 desc
    for(var i=0;i<datat.length;i++)
    {
        lr=dividep(datap[i],datat[i],lr);
    }

}

function job3()
{
    d3.select("#s3").remove();
    d3.select("#s").append("div")
        .attr("id","s3")
        .style("background-color","#FFFFFF")
        .style("height","400px")
        .style("width","700px")
        .style("float","left");

    var jobW=new Array();
    var k=0;
    var left1=0;
    var top1=0;
    var img1=100;

    d3.select("#s3").append("img")
        .attr("src","../../../static/job/0.jpg")
        .attr("width", 700)
        .attr("height", 400)
        .style("opacity",0.4);

    for(var i = 1;i < 5; i ++) {
        for(var j=1;j<6;j++)
        {
            jobW[k] = d3.select("#s3").append("div")
                .attr("id",j+""+i)
                .style("left",700+left1+"px")
                .style("top",250+top1+"px")
                .style("position", "absolute")
                .on("mouseover",function(){
                    console.log(this.id);
                    var x=document.getElementsByName(document.getElementById("p"+this.id).name);
                    for(var jj=0;jj<x.length;jj++)
                    {
                        x.item(jj).src = "../../static/job/"+document.getElementById("p"+this.id).name+"_2.svg";
                    }
                    document.getElementById("t"+document.getElementById("p"+this.id).name).style.display = "block";
                })
                .on("mouseout",function(){
                    var x=document.getElementsByName(document.getElementById("p"+this.id).name);
                    for(var j=0;j<x.length;j++)
                    {
                        x.item(j).src = "../../static/job/"+document.getElementById("p"+this.id).name+".svg";
                    }
                    document.getElementById("t"+document.getElementById("p"+this.id).name).style.display="none";
                })
                .append("g");

            //id="11" style="position:absolute;:;top:100px;"onmouseover="show(this.id)" onmouseout=""

            jobW[k].append("img")
                .attr("src", "../../../static/job/1.svg")
                .attr("position", "absolute")
                .attr("width", 150)
                .attr("height", img1)
                .attr("id","p"+(j*10+i))
                .attr("name","1");

            //var x=document.getElementsByName(document.getElementById("p"+(j*10+i)).name);
            //console.log(x);

            //<img id="p11" name="1" src="../../static/job/ width="100" height="100"/>
            k=k+1;
            left1=left1+150;
        }
        left1=0;
        top1=top1+img1;

    }
    for(j=1;j<8;j++)
    {
        jobW[k] = d3.select("#s3").append("div")
            .attr("id","p"+j)
            .style("left",700+left1+"px")
            .style("top",250+top1+"px")
            .style("position", "absolute")
            .attr("name",j)
            .on("mouseover",function(){
                var x=document.getElementsByName(this.name);
                for(var j=0;j<x.length;j++)
                {
                    x.item(j).src = "../../static/job/"+this.name+"_2.svg";
                }
                document.getElementById("t"+this.name).style.display = "block";
            })
            .on("mouseout",function(){
                var x=document.getElementsByName(this.name);
                for(var j=0;j<x.length;j++)
                {
                    x.item(j).src ="../../static/job/"+ this.name+".svg";
                }
                document.getElementById("t"+this.name).style.display="none";
            })
            .append("g");

        //id="11" style="position:absolute;:;top:100px;"onmouseover="show(this.id)" onmouseout=""
        //<div id="p1" style="position:absolute;left:470px;top:250px;"onmouseover="show(1)" onmouseout="disappear(1)">
    //<p style=":none;:red;:" id="t1">农民：10%</p>

        jobW[k].append("p")
            //.style("position", "absolute")
            .style("display", "none")
            .style("color", "#ff0a14")
            .attr("id","t"+j)
            .style("font-size","20px");


        //<img id="p11" name="1" src="../../static/job/ width="100" height="100"/>
        k=k+1;
    }
    init();
}