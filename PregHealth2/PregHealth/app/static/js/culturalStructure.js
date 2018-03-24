var obj = document.styleSheets[0]; // [object StyleSheetList] 样式表的个数<link>var rule = null;// [object CSSRule]

if (obj.cssRules){

    rule = obj.cssRules[0];  // 非IE [object CSSRuleList]

} else {

    rule = obj.rules[0];     // IE [object CSSRuleList]

} 

var containterW =  parseInt(rule.style.width.slice(0,-2));
var containterH =  parseInt(rule.style.height.slice(0,-2));

var margin = {top: 20, right: 20, bottom: 20, left: 20};  
var width = containterW - margin.left - margin.right;
var height = containterH - margin.top - margin.bottom;

var svg = d3.select("#container").append("svg")  
    .attr("width", containterW)  
    .attr("height", containterH)
    .attr("style","outline: 2px solid #630")
    .append("g")  
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 


var culturalData = [{"eduLevel":"研究生","numOfM":123,"numOfF":200},
					{"eduLevel":"大专","numOfM":379,"numOfF":200},
					{"eduLevel":"高中","numOfM":30,"numOfF":10},
					{"eduLevel":"初中","numOfM":379,"numOfF":400},
					{"eduLevel":"小学","numOfM":240,"numOfF":271},
					{"eduLevel":"文盲","numOfM":321,"numOfF":201}]

var x = d3.scale.ordinal()  
    .rangeRoundBands([0, height], .1);  
  
var y = d3.scale.linear()  
    .rangeRound([0, width-120]);

var xAxis = d3.svg.axis()  
    .scale(x)  
    .orient("left");  
  
var yAxis = d3.svg.axis()  
    .scale(y)  
    .orient("top")  
    .tickFormat(d3.format(".2s")); 

  x.domain(culturalData.map(function(d) { return d.eduLevel; }));  
  y.domain([0, d3.max(culturalData, function(d) { 

  	if(d.numOfM > d.numOfM)
  		return d.numOfM; 
  	else
  		return d.numOfF;
  })]);  
  
  svg.append("g")  
      .attr("class", "x axis")  
      .attr("transform", "translate(50,0)")  
      .call(xAxis)  
     .append("text") 
      .attr("x",30)   
      .attr("y", height + 10)  
      .attr("dy", ".0em")  
      .style("text-anchor", "end") 
      .text("culturalLevel");

  svg.append("g")  
      .attr("class", "y axis")  
      .attr("transform", "translate(50,0)")
      .call(yAxis)  
    .append("text")    
      .attr("x", width-40)  
      .attr("dy", ".0em")  
      .style("text-anchor", "end") 
      .text("Population");

var bar_height = 30;

var bar = svg.selectAll(".bar")
  .data(culturalData)
  .enter()
  .append("g")
  .attr("class", "bar")
  .attr("transform", function(d){ return "translate(50,"+ x(d.eduLevel) +")";});

bar.append("rect")
	.attr("class","male")
	.attr("width",function(d){return y(d.numOfM);})
	.attr("height",bar_height);
	
bar.append("rect")
	.attr("class","female")
	.attr("width",function(d){return y(d.numOfF);})
	.attr("height",bar_height);
	

bar.append("text")
	.attr("class", "femaleText")  
	.text(function(d){return d.numOfF;})
	.attr("x",function(d){return y(d.numOfF-0.2);})
	.style("text-anchor", "end") 
	.attr("y",bar_height/2)
	.attr("dy",5);

bar.append("text")
	.attr("class", "maleText")  
	.text(function(d){return d.numOfM;})
	.attr("x",function(d){return y(d.numOfM-0.2);})
	.style("text-anchor", "end") 
	.attr("y",bar_height/2)
	.attr("dy",5);


var year = 2015;
var year0 = 2010;
var year1 = 2020;

window.focus();
d3.select(window).on("keydown", function() {
    switch (d3.event.keyCode) {
      case 37: year = Math.max(year0, year - 1); break;
      case 39: year = Math.min(year1, year + 1); break;
    }
    update();
  });

function update(){

  for(var i = 0; i < 6; i ++){
		culturalData[i].numOfM = parseInt(Math.random() * 400);
		culturalData[i].numOfF = parseInt(Math.random() * 400);
	}

 
 var element=document.getElementById("header");
  element.innerHTML="某省" + year + "年各文化阶层人口数量";

  console.log("jason");
	
	var bar = svg.selectAll(".bar")
					.data(culturalData);
	bar.selectAll(".female")	
		.attr("width",function(d){return y(d.numOfF);});
	bar.selectAll(".male")	
		.attr("width",function(d){return y(d.numOfM);});
	bar.selectAll(".femaleText")
		.text(function(d){return d.numOfF;})
		.attr("x",function(d){return y(d.numOfF-0.2);});
	bar.selectAll(".maleText")
		.text(function(d){return d.numOfM;})
		.attr("x",function(d){return y(d.numOfM-0.2);});
}


