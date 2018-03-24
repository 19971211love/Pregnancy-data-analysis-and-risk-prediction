
window.bubbly=function(t){
	var o=t||{},
	e=function(){
		return Math.random()
	},
	r=o.canvas||document.createElement("canvas"),n=r.width,a=r.height;
	null===r.parentNode&&(r.setAttribute("style","position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;"),
	n=r.width=window.innerWidth,a=r.height=window.innerHeight,document.body.appendChild(r));
	var i=r.getContext("2d");
	i.shadowColor=o.shadowColor||"#fff",i.shadowBlur=o.blur||4;
	var l=i.createLinearGradient(0,0,n,a);l.addColorStop(0,o.colorStart||"#2AE"),l.addColorStop(1,o.colorStop||"#17B");
	for(var h=o.bubbles||Math.floor(.02*(n+a)),d=[],c=0;c<h;c++)d.push({f:(o.bubbleFunc||function(){return"hsla(0, 0%, 100%, "+.1*e()+")"}).call(),x:e()*n,y:e()*a,r:4+e()*n/25,a:e()*Math.PI*2,v:.1+.5*e()});
		!function t(){if(null===r.parentNode)return cancelAnimationFrame(t);!1!==o.animate&&requestAnimationFrame(t),i.globalCompositeOperation="source-over",i.fillStyle=l,i.fillRect(0,0,n,a),i.globalCompositeOperation=o.compose||"lighter",d.forEach(function(t){i.beginPath(),i.arc(t.x,t.y,t.r,0,2*Math.PI),i.fillStyle=t.f,i.fill(),t.x+=Math.cos(t.a)*t.v,t.y+=Math.sin(t.a)*t.v,t.x-t.r>n&&(t.x=-t.r),t.x+t.r<0&&(t.x=n+t.r),t.y-t.r>a&&(t.y=-t.r),t.y+t.r<0&&(t.y=a+t.r)})}()
};

	bubbly();
	console.log("hh");
	let configs = [
		{},
		{},
		{},
		{
		}
	];
		
	var radius = 80;
	var windowWidth = window.innerWidth; //当前的窗口的高度
    var windowHeight = window.innerHeight;

    var system = d3.select("div")
    			.attr("style","width:"+ windowWidth +"px;height:"+ windowHeight +"px;border:0px solid #f00;position:absolute;left:"+ 0 +"px;top:"+ 0 +"px; overflow:hidden;");

				
				
	var svg =d3.select("svg")
		.attr("id","mainsvg")
  		.attr("width", windowWidth)
  		.attr("height", windowHeight)
  		.attr("style", "outline: 2px solid #630")
  		.append("g");
		
	


  	var circle1 = svg.append("circle")
  		.attr("id","circle1")
		.attr("cx",windowWidth/2)
		.attr("cy",windowHeight/2)
		.attr("r",120)
		.style("fill","#4FC3F7");

  	var circle2 = svg.append("circle")
  		.attr("id","circle2")
		.attr("cx",windowWidth/2)
		.attr("cy",windowHeight/2)
		.attr("r",radius)
		.style("fill","#4FC3F7");

  	var circle3 = svg.append("circle")
  		.attr("id","circle3")
		.attr("cx",windowWidth/2)
		.attr("cy",windowHeight/2)
		.attr("r",radius)
		.style("fill","#4FC3F7");
		
	var circletext1,circletext2;

var str = "孕检数据分析，  与风险预测";
var text1 = svg.append("text")
	.attr("x",windowWidth/2 - 110)
  	.attr("y",windowHeight/2 - 60)
  	.attr("font-size",35)
  	.style('fill', 'white') 
  	.attr("font-family","微软雅黑")
	.attr("font-weight","bolder");

var strs = str.split("，") ;
text1.selectAll("tspan")
 	.data(strs)
 	.enter()
 	.append("tspan")
 	.attr("x",text1.attr("x"))
 	.attr("dy","1.5em")
 	.text(function(d){
  	return d;
 });
 
circle1.on("click", function(){
    //在这里添加交互内容
    console.log("qaq");

   	circle1.remove();
   	text1.remove();

   	circle2.transition()
		.duration(1500)
		.attr("cx", windowWidth/2 + 160)
		.style("fill","#4FC3F7");

	circle3.transition()
		.duration(1500)
		.attr("cx", windowWidth/2 - 160)
		.style("fill","#4FC3F7");

	circletext1 = system.append("a").attr("class","jump").attr("href", "http://127.0.0.1:5000/map") .html("群体分析")
        .attr("style","width:"+ radius*2 +"px;height:"+ (radius - 10) +"px;border:0px solid #f00;position:absolute;left:"+ (windowWidth/2 - 80) +"px;top:"+ (windowHeight/2 - 50) +"px; overflow:hidden;")
		.on("mouseover",function(){
			circle3.attr("transform","scale(1.1)")
					.attr("filter","url(#blurMe)");
		})
		.on("mouseout",function(){
			circle3.attr("transform","scale(1.0)")
					.attr("filter","url(#NotblurMe)");
		});
		
	circletext1.transition()
        .duration(1500)
        .attr("style","width:"+ radius*2 +"px;height:"+ (radius - 10) +"px;border:0px solid #f00;position:absolute;left:"+ (windowWidth/2 - 240) +"px;top:"+ (windowHeight/2 - 50) +"px; overflow:hidden;");

	var qaq = system.append("a").attr("class","jump") .attr("href", "http://127.0.0.1:5000/person") .html("个体分析")
        .attr("style","width:"+ radius*2 +"px;height:"+ (radius - 10) +"px;border:0px solid #f00;position:absolute;left:"+ (windowWidth/2 - 80) +"px;top:"+ (windowHeight/2 - 50) +"px; overflow:hidden;")
		.on("mouseover",function(){
			console.log("nihaoai");
			circle2.attr("transform","scale(1.1)")
					.attr("filter","url(#blurMe)");
		})
		.on("mouseout",function(){
			circle2.attr("transform","scale(1.0)")
					.attr("filter","url(#NotblurMe)");
		});
		
	qaq.transition()
        .duration(1500)
        .attr("style","width:"+ radius*2 +"px;height:"+ (radius - 10) +"px;border:0px solid #f00;position:absolute;left:"+ (windowWidth/2 + 80) +"px;top:"+ (windowHeight/2 - 50) +"px; overflow:hidden;");
});



