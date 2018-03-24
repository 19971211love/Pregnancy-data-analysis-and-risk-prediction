
function age3()
{
    d3.select("#s3").remove();
    d3.select("#s").append("div")
        .attr("id","s3")
        .style("background-color","#FFFFFF")
        .style("height","400px")
        .style("width","700px")
        .style("float","left");
  /*var obj = document.styleSheets[0]; // [object StyleSheetList] 样式表的个数<link>var rule = null;// [object CSSRule]

    if (obj.cssRules) {

        rule = obj.cssRules[0]; // 非IE [object CSSRuleList]

    } else {

        rule = obj.rules[0]; // IE [object CSSRuleList]

    }*/

    var containterW = 700;//parseInt(rule.style.width.slice(0, -2));
    var containterH = 400;//parseInt(rule.style.height.slice(0, -2));

    var margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    };
    var width = containterW - margin.left - margin.right;
    var height = containterH - margin.top - margin.bottom;

    var svg = d3.select("#s3").append("svg")
        .attr("width", containterW)
        .attr("height", containterH)
        .attr("style", "outline: 0px solid #630")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var ageData = [{
        "age": "10-15",
        "sumM": 649,
        "sumF": 410,
    }, {
        "age": "15-20",
        "sumM": 633,
        "sumF": 543
    }, {
        "age": "20-25",
        "sumM": 423,
        "sumF": 621
    }, {
        "age": "25-30",
        "sumM": 523,
        "sumF": 221
    }, {
        "age": "30-35",
        "sumM": 323,
        "sumF": 421
    }, {
        "age": "35-40",
        "sumM": 193,
        "sumF": 100
    }, {
        "age": "40-45",
        "sumM": 423,
        "sumF": 521
    }]

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, height], .1);

    var y = d3.scale.linear()
        .rangeRound([0, width - 120]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("left");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("top")
        .tickFormat(d3.format(".2s"));

    x.domain(ageData.map(function(d) {
        return d.age;
    }));
    y.domain([0, d3.max(ageData, function(d) {

        if (d.sumM > d.sumF)
            return d.sumM;
        else
            return d.sumF;

    })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(50,0)")
        .call(xAxis)
        .append("text")
        .attr("x", 30)
        .attr("y", height + 10)
        .attr("dy", ".0em")
        .style("text-anchor", "end")
        .text("ageLevel");

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(50,0)")
        .call(yAxis)
        .append("text")
        .attr("x", width - 40)
        .attr("dy", ".0em")
        .style("text-anchor", "end")
        .text("Population");


    var bar_height = 30;

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0.0);

    var bar = svg.selectAll(".bar")
        .data(ageData)
        .enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", function(d) {
            return "translate(50," + x(d.age) + ")";
        });

    bar.append("rect")
        .attr("class", "male")
        .attr("width", function(d) {
            return y(d.sumM);
        })
       // .attr("fill-opacity","6")
        //.attr("fill","#e377c2")
        .attr("height", bar_height)
        .on("mouseover", function(d, i) {
            d3.select(this)
                .attr("fill", "yellow");


            showMin(d,i);

            tooltip.style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
                .style("opacity", 1.0);

        })
        .on("mouseout", function(d, i) {
            d3.select(this)
                .transition()
                .duration(500)
                .attr("fill", "steelblue");

            tooltip.style("opacity", 0.0);

            var p = tooltip.select("svg");
            p.remove();

        });

    bar.append("rect")
        .attr("class", "male")
        .attr("width", function(d) {
            return y(d.sumF);
        })
        //.attr("fill","#1f77b4")
        //.attr("fill-opacity","6")
        //.attr("fill","#e377c2")
        .attr("height", bar_height)
        .on("mouseover", function(d, i) {
            d3.select(this)
                .attr("fill", "yellow");


            showMin(d,i);

            tooltip.style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
                .style("opacity", 1.0);

        })
        .on("mouseout", function(d, i) {
            d3.select(this)
                .transition()
                .duration(500)
                .attr("fill", "steelblue");

            tooltip.style("opacity", 0.0);

            var p = tooltip.select("svg");
            p.remove();

        });


    bar.append("text")
        .attr("class", "femaleText")
        .text(function(d) {
            return d.sumF;
        })
        .attr("x", function(d) {
            return y(d.sumF - 0.2);
        })
        .style("text-anchor", "end")
        .attr("y", bar_height / 2)
        .attr("dy", 5);

    bar.append("text")
        .attr("class", "maleText")
        .text(function(d) {
            return d.sumM;
        })
        .attr("x", function(d) {
            return y(d.sumM - 0.2);
        })
        .style("text-anchor", "end")
        .attr("y", bar_height / 2)
        .attr("dy", 5);


    var year = 2015;
    var year0 = 2010;
    var year1 = 2020;

    window.focus();
    d3.select(window).on("keydown", function() {
        switch (d3.event.keyCode) {
            case 37:
                year = Math.max(year0, year - 1);
                break;
            case 39:
                year = Math.min(year1, year + 1);
                break;
        }
        update();
    });

    function update() {
        /*

        for(var i = 0; i < 6; i ++){
              culturalData[i].numOfM = parseInt(Math.random() * 400);
              culturalData[i].numOfF = parseInt(Math.random() * 400);
          }

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

          */
    }


    function showMin(d,i) {

        var obj = document.styleSheets[0]; // [object StyleSheetList] 样式表的个数<link>var rule = null;// [object CSSRule]

        if (obj.cssRules) {

            rule = obj.cssRules[7]; // 非IE [object CSSRuleList]

        } else {

            rule = obj.rules[7]; // IE [object CSSRuleList]

        }

        var tooltipW = parseInt(rule.style.width.slice(0, -2));
        var tooltipH = parseInt(rule.style.height.slice(0, -2));
        var minwidth = tooltipW - margin.left - margin.right;
        var minheight = tooltipH - margin.top - margin.bottom;

        console.log(minwidth);

        var minagedata = new Array();

        minagedata[0] =  [{
            "minage": "11",
            "numM": 93,
            "numF": 121
        }, {
            "minage": "12",
            "numM": 13,
            "numF": 101
        }, {
            "minage": "13",
            "numM": 23,
            "numF": 129
        }, {
            "minage": "14",
            "numM": 53,
            "numF": 90
        }, {
            "minage": "15",
            "numM": 223,
            "numF": 50
        }]

        minagedata[1] =  [{
            "minage": "16",
            "numM": 93,
            "numF": 121
        }, {
            "minage": "17",
            "numM": 13,
            "numF": 101
        }, {
            "minage": "18",
            "numM": 23,
            "numF": 129
        }, {
            "minage": "19",
            "numM": 53,
            "numF": 90
        }, {
            "minage": "20",
            "numM": 223,
            "numF": 50
        }]

        minagedata[2] =  [{
            "minage": "21",
            "numM": 93,
            "numF": 121
        }, {
            "minage": "22",
            "numM": 13,
            "numF": 101
        }, {
            "minage": "23",
            "numM": 23,
            "numF": 129
        }, {
            "minage": "24",
            "numM": 53,
            "numF": 90
        }, {
            "minage": "25",
            "numM": 223,
            "numF": 50
        }]

        minagedata[3] =  [{
            "minage": "26",
            "numM": 93,
            "numF": 121
        }, {
            "minage": "27",
            "numM": 13,
            "numF": 101
        }, {
            "minage": "28",
            "numM": 23,
            "numF": 129
        }, {
            "minage": "29",
            "numM": 53,
            "numF": 90
        }, {
            "minage": "30",
            "numM": 223,
            "numF": 50
        }]

        minagedata[4] =  [{
            "minage": "31",
            "numM": 93,
            "numF": 121
        }, {
            "minage": "32",
            "numM": 13,
            "numF": 101
        }, {
            "minage": "33",
            "numM": 23,
            "numF": 129
        }, {
            "minage": "34",
            "numM": 53,
            "numF": 90
        }, {
            "minage": "35",
            "numM": 223,
            "numF": 50
        }]

        minagedata[5] =  [{
            "minage": "36",
            "numM": 93,
            "numF": 121
        }, {
            "minage": "37",
            "numM": 13,
            "numF": 101
        }, {
            "minage": "38",
            "numM": 23,
            "numF": 129
        }, {
            "minage": "39",
            "numM": 53,
            "numF": 90
        }, {
            "minage": "40",
            "numM": 223,
            "numF": 50
        }]

        minagedata[6] =  [{
            "minage": "41",
            "numM": 93,
            "numF": 121
        }, {
            "minage": "42",
            "numM": 13,
            "numF": 101
        }, {
            "minage": "43",
            "numM": 23,
            "numF": 129
        }, {
            "minage": "44",
            "numM": 53,
            "numF": 90
        }, {
            "minage": "45",
            "numM": 223,
            "numF": 50
        }]





        var svg = tooltip.append("svg")
            .attr("width", tooltipW)
            .attr("height", tooltipH)
            .attr("style", "outline: 2px solid #630")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, minheight], .1);

        var y = d3.scale.linear()
            .rangeRound([0, minwidth - 60]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("left");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("top")
            .tickFormat(d3.format(".2s"));

        x.domain(minagedata[i].map(function(d) {
            return d.minage;
        }));
        y.domain([0, d3.max(minagedata[i], function(d) {
            if (d.numM > d.numF)
                return d.numM;
            else
                return d.numF;

        })]);

        svg.append("g")
            .attr("class", "min x axis")
            .attr("transform", "translate(15,0)")
            .call(xAxis)
            .append("text")
            .attr("x", 30)
            .attr("y", minheight + 10)
            .attr("dy", ".0em")
            .style("text-anchor", "end")
            .text("ageLevel");

        svg.append("g")
            .attr("class", "min y axis")
            .attr("transform", "translate(15,0)")
            .call(yAxis)
            .append("text")
            .attr("x", minwidth)
            .attr("dy", ".0em")
            .style("text-anchor", "end")
            .text("Population");


        var bar_height = 20;



        var bar = svg.selectAll(".bar")
            .data(minagedata[i])
            .enter()
            .append("g")
            .attr("class", "bar")
            .attr("transform", function(d) {
                return "translate(15," + x(d.minage) + ")";
            });

        bar.append("rect")
            .attr("class", "male")
            .attr("width", function(d) {
                return y(d.numM);
            })
            .attr("height", bar_height);

        bar.append("rect")
            .attr("class", "male")
            .attr("width", function(d) {
                return y(d.numF);
            })
            .attr("height", bar_height);


        bar.append("text")
            .attr("class", "femaleText")
            .text(function(d) {
                return d.numF;
            })
            .attr("x", function(d) {
                return y(d.numF - 0.2);
            })
            .style("text-anchor", "end")
            .attr("y", bar_height / 2)
            .attr("dy", 5);

        bar.append("text")
            .attr("class", "maleText")
            .text(function(d) {
                return d.numM;
            })
            .attr("x", function(d) {
                return y(d.numM - 0.2);
            })
            .style("text-anchor", "end")
            .attr("y", bar_height / 2)
            .attr("dy", 5);






    }
}