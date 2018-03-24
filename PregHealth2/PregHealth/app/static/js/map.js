
function load_county_data(){
    //var county_data = [];

    d3.json("static/countyData/data.json", function(error, valuedata){
        var data = valuedata.items;
        for(var i = 0;i < 34;i ++){
            county_data[i] = [];
            var county_list = data[i].counties;
            for(var j = 0;j < county_list.length;j ++){
                county_data[i][county_list[j].name] = county_list[j].value;
            }
        }

    });

    //console.log("county_data",county_data);
    //return county_data;
}

function  load_china_data() {
    //var values = [];
    d3.json("static/map/china_data.json", function(error, valuedata){

        //将读取到的数据存到数组，令其索引号为各省的名称
        for(var i=0; i<valuedata.provinces.length; i++){
            var name = valuedata.provinces[i].name;
            var value = valuedata.provinces[i].value;
            china_data[name] = value;
        }

    });
    //return values;
}

function get_county_maxvalue(id) {
    var maxvalue2 = 0;
    for(it in county_data[id-1]){
        if(maxvalue2<county_data[id-1][it]){
            maxvalue2 = county_data[id-1][it];
        }
    }

    return maxvalue2;
}

function setProv_transf_offset(){
   // var prov_transf_offset = [];

    prov_transf_offset[ "北京"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "天津"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "河北"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "山西"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "内蒙古"] = {"x":-5	 ,"y":-5};
    prov_transf_offset[ "辽宁"] = {"x":5	 ,"y":-5};
    prov_transf_offset[ "吉林"] = {"x":5	 ,"y":-5};
    prov_transf_offset[ "黑龙江"] = {"x":5	 ,"y":-5};
    prov_transf_offset[ "上海"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "江苏"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "浙江"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "安徽"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "福建"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "江西"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "山东"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "河南"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "湖北"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "湖南"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "广东"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "广西"] = {"x":5 ,"y":-5 };
    prov_transf_offset[ "海南"] = {"x":0	 ,"y":-5};
    prov_transf_offset[ "重庆"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "四川"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "贵州"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "云南"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "西藏"] = {"x":-5,"y":5};
    prov_transf_offset[ "陕西"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "甘肃"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "青海"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "宁夏"] = {"x":5 ,"y":-5};
    prov_transf_offset[ "新疆"] = {"x":	 -5,"y":-5};


}

function drawProvMap(provid) {
    d3.json("static/map/geometryProvince/"+provid+".json", function(error, provdata) {
        if (error)
            return console.error(error);
        center = provdata.cp;
        var projection = d3.geo.mercator()
            .center(center)
            .scale(600)
            .translate([width/2, height/2]);

        var path = d3.geo.path()
            .projection(projection)

        //包含各县路径的分组元素
        var prov = svg.append("g");
        //添加各种的路径元素
        var counties = prov.selectAll("path")
            .data( provdata.features )
            .enter()
            .append("path")
            .attr("class","county")
            .style("fill", "#ccc")
            .attr("d", path )
        ;


            //求最大值和最小值
            var maxvalue = get_county_maxvalue(provid);
            var minvalue = 0;

            //定义一个线性比例尺，将最小值和最大值之间的值映射到[0, 1]
            var linear = d3.scale.linear()
                .domain([minvalue, maxvalue])
                .range([0, 1]);


            //颜色插值函数
            var computeColor = d3.interpolate(lightestcolor,brightestcolor);

            //设定填充色
            counties.style("fill", function(d,i){
                var t = linear( county_data[provid-1][d.properties.name] );
                console.log("name",d.properties.name,"county_data",county_data[provid-1]);
                var color = computeColor(t);
                return color.toString();
            });

        });
}