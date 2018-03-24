
function per3(){
    d3.select("#s3").remove();
    d3.select("#s").append("div")
		.attr("id","s3")
		.style("background-color","#FFFFFF")
		.style("height","400px")
		.style("width","700px")
        .style("float","left");
    //$(body).append("<div id=\"s3\" style=\"background-color:#eeeeee;height:300px; width:600px;float:left;\"></div>");


    var hh1=new Array(41,293,212,95,64,1079,137);
    var hh2=new Array(318,2414,2217,933,454,13574,1068)
    var percentage = new Array(0.2,0.3,0.4,0.5,0.6,0.7,0.8);
    for(var i=0;i<7;i++)
    {
        percentage[i]=Math.round(hh2[i]/(hh1[i]+hh2[i]) * 100)/100;
    }
//farmer//worker//server//business//house//teacher//another

    var textH = 20;


    var containterW = 680;//parseInt(rule.style.width.slice(0, -2));
    var containterH =350; //parseInt(rule.style.height.slice(0, -2)) - textH * 2;

    var divW = containterW/4;
    var divH = containterH/2;

//返回值是一个包含width height top right bottom left的对象
    var rect = document.querySelector("#s3").getBoundingClientRect()
    console.log(rect);

    console.log(divW);
    console.log(divH);


    var jobW = new Array();
    var jobC = new Array();
    var text = new Array();
    var jobName = new Array("farmer","worker","server","business","house","teacher","another");

    console.log(rect.top);

    for(var i = 0;i < 4; i ++){
        jobW[i] = d3.select("#s3").append("div")
            .attr("style","width:"+ divW +"px;height:"+ divH * (1 - percentage[i]) +"px;border:0px solid #f00;position:absolute;left:"+ (rect.left+divW*i) +"px;top:"+ 250 +"px; overflow:hidden;")
            .append("g");
        jobC[i] = d3.select("#s3").append("div")
            .attr("style","width:"+ divW +"px;height:"+ divH * percentage[i] +"px;border:0px solid #ddd;position:absolute;left:"+ (rect.left+divW*i) +"px;top:"+ (250+divH * (1 - percentage[i])) +"px; overflow:hidden;")
            .append("g");
        text[i] = d3.select("#s3").append("div")
            .attr("id",i)
            .attr("style","text-align:center;width:"+ divW +"px;height:"+ textH +"px;border:0px solid #111;position:absolute;left:"+ (rect.left+divW*i) +"px;top:"+ (250+divH) +"px; overflow:hidden;")
            .append("g");

        console.log(d3.select("#s3"));

        jobW[i].append("img")
            .attr("src","../../../static/job/"+jobName[i]+"W.jpg")
            .attr("position","absolute")
            .attr("width",divW)
            .attr("height",divH);

        jobC[i].append("img")
            .attr("src","../../../static/job/"+jobName[i]+"C.jpg")
            .attr("style","position:absolute; top:-"+divH * (1 - percentage[i])+"px; left:0px;")
            .attr("width",divW)
            .attr("height",divH);

        var div=document.getElementById(i);
        var span=document.createElement('span');
        span.innerHTML=jobName[i]+' : ' + percentage[i] * 100 + '%';
        div.appendChild(span);
    }



    for(var i = 4;i < 7; i ++){
        jobW[i] = d3.select("#s3").append("div")
            .attr("style","width:"+ divW +"px;height:"+ divH * (1 - percentage[i]) +"px;border:0px solid #f00;position:absolute;left:"+ (rect.left + divW/2 + divW*(i-4)) +"px;top:"+ (250 + divH + textH)+"px; overflow:hidden;")
            .append("g");
        jobC[i] = d3.select("#s3").append("div")
            .attr("style","width:"+ divW +"px;height:"+ divH * percentage[i] +"px;border:0px solid #ddd;position:absolute;left:"+ (rect.left + divW/2 +  divW*(i-4)) +"px;top:"+ (250 +divH + textH +divH * (1 - percentage[i])) +"px; overflow:hidden;")
            .append("g");
        text[i] = d3.select("#s3").append("div")
            .attr("id",i)
            .attr("style","text-align:center;width:"+ divW +"px;height:"+ textH +"px;border:0px solid #111;position:absolute;left:"+ (rect.left + divW/2 +  divW*(i-4)) +"px;top:"+ (250 +divH + textH +divH) +"px; overflow:hidden;")
            .append("g");

        jobW[i].append("img")
            .attr("src","../../../static/job/"+jobName[i]+"W.jpg")
            .attr("position","absolute")
            .attr("width",divW)
            .attr("height",divH);

        jobC[i].append("img")
            .attr("src","../../../static/job/"+jobName[i]+"C.jpg")
            .attr("style","position:absolute; top:-"+divH * (1 - percentage[i])+"px; left:0px;")
            .attr("width",divW)
            .attr("height",divH);

        var div=document.getElementById(i);
        var span=document.createElement('span');
        span.innerHTML=jobName[i]+' : ' + percentage[i] * 100 + '%';
        div.appendChild(span);
    }



}
