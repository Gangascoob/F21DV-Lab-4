const margin = { top: 5, bottom: 5, left: 5, right: 5 };



var l;



var div = d3.select("#linesvg").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0)
;

var svgrace = d3.select("#driverpos")
                .append("svg")
                .attr("width", "150%")
                .attr("height", "120%")
                .attr("id", "linesvg")
                .append("g").attr("transform", `translate(${margin.left},${margin.top})`)
;


var x = d3.scaleLinear().range([0, 700])
var xAxis = d3.axisBottom().scale(x);
svgrace.append("g")
        .attr("transform", "translate(50, 310)")
        .attr("class", "myXaxis")
        
;

var y = d3.scaleLinear().range([280, 0]);
var yAxis = d3.axisLeft().scale(y);
svgrace.append("g")
        .attr("class","myYaxis")
        .attr("transform", "translate(50,30)")
;



function updategraph(data){







let laps = [];
let positions = [];


for(i=0; i<data.length; i++){
    laps.push(data[i].lap);
}
for(i=0; i<data.length; i++){
    positions.push(data[i].position);
}

var positionnumbers = positions.map(s => +s);
var lapnumbers = laps.map(s => +s);


var yExtent = d3.extent(positionnumbers);
var xExtent = d3.extent(lapnumbers);




x.domain([ xExtent[0], xExtent[1]]);
svgrace.selectAll(".myXaxis").transition()
    .duration(1500)
    .call(xAxis)
;
           


y.domain([ yExtent[1], yExtent[0]])
svgrace.selectAll(".myYaxis").transition()
        .duration(1500)
        .call(yAxis)
;
            

var dataNest = Array.from(d3.group(racedata, d=>d.driver), ([key, value]) => ({key, value}));


var linefunction = d3.line()
                     .x(function(d){return x(+d.lap);})
                     .y(function(d){return y(+d.position);})
;


dataNest.forEach(function(d,i){

    var u = svgrace.selectAll(".line")
                    .data(d)

        u.enter()
            .append("path")
            .attr("class", "line")
            .merge(u)
            .transition()
            .duration(1500)
            .attr("fill", "none")
            .attr("stroke-width", 1.5)
            .attr("d", linefunction(d.value))
            .attr("stroke", function(){
                if(d.key == "846" || d.key == "817"){
                    //MCLAREN
                    return "#FF8700";
                }
                if(d.key == "1" || d.key == "822"){
                    //MERCEDES
                    return "#00D2BE";
                }
                if(d.key == "830" || d.key == "815"){
                    //REDBULL
                    return "#0508a8";
                }
                if(d.key == "832" || d.key == "844"){
                    //FERRARI
                    return "#DC0000";
                }
                if(d.key == "4" || d.key =="839"){
                    //ALPINE
                    return "#0044ff";
                }
                if(d.key == "842" || d.key == "852"){
                    //ALPHATAURI
                    return "#2B4562";
                }
                if(d.key == "8" || d.key == "841" || d.key == "9"){
                    //ALFAROMEO
                    return "#490303";
                }
                if(d.key == "849" || d.key == "847"){
                    //WILLIAMS
                    return "#588ef1";
                }
                if(d.key == "854" || d.key == "853"){
                    //HAAS
                    return "#D9D9D9";
                }
                if(d.key == "20" || d.key == "840"){
                    //ASTONMARTIN
                    return "#006F62";
                }

                else return "black";
            })
            .attr("id", function(){
                return idselector(d);
            })
            .attr("opacity", 0)
            .attr("transform", "translate(50, 30)");

    
})

function idselector(d){

    
    if(d.key == "846" || d.key == "817"){
        //MCLAREN
        return "mclaren";
    }
    if(d.key == "1" || d.key == "822"){
        //MERCEDES
        return "mercedes";
    }
    if(d.key == "830" || d.key == "815"){
        //REDBULL
        return "redbull";
    }
    if(d.key == "832" || d.key == "844"){
        //FERRARI
        return "ferrari";
    }
    if(d.key == "4" || d.key =="839"){
        //ALPINE
        return "alpine";
    }
    if(d.key == "842" || d.key == "852"){
        //ALPHATAURI
        return "alphatauri";
    }
    if(d.key == "8" || d.key == "841" || d.key == "9"){
        //ALFAROMEO
        return "alfaromeo";
    }
    if(d.key == "849" || d.key == "847"){
        //WILLIAMS
        return "williams";
    }
    if(d.key == "854" || d.key == "853"){
        //HAAS
        return "haas";
    }
    if(d.key == "20" || d.key == "840"){
        //ASTONMARTIN
        return "astonmartin";
    }
}



}






