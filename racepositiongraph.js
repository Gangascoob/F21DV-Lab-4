const margin = { top: 5, bottom: 5, left: 5, right: 5 };





//selects the driverpos div and appends svg
var svgrace = d3.select("#driverpos")
                .append("svg")
                .attr("width", "150%")
                .attr("height", "120%")
                .attr("id", "linesvg")
                .append("g").attr("transform", `translate(${margin.left},${margin.top})`)
                
;

//initialises x-axis of set size, transforms it into more appropriate placement and attributes the myXaxis class to it.
var x = d3.scaleLinear().range([0, 700])
var xAxis = d3.axisBottom().scale(x);
svgrace.append("g")
        .attr("transform", "translate(50, 310)")
        .attr("class", "myXaxis")
        
;
//same as above for y-axis
var y = d3.scaleLinear().range([280, 0]);
var yAxis = d3.axisLeft().scale(y);
svgrace.append("g")
        .attr("class","myYaxis")
        .attr("transform", "translate(50,30)")
;

//appends x-axis title
svgrace.append("text")
        .attr("text-anchor", "end")
        .attr("x", 350)
        .attr("y", 340)
        .text("Lap Number")
;        
//appends and rotates y-axis title
svgrace.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("x", 150)
        .attr("y", 30)
        .text("Driver Position")
;

//main function for updating graph
function updategraph(data){


let laps = [];
let positions = [];

//loops through the data, pushing lap values into the laps array and position values into position array
for(i=0; i<data.length; i++){
    laps.push(data[i].lap);
}
for(i=0; i<data.length; i++){
    positions.push(data[i].position);
}

//transforms the laps and positions arrays into maps with number values rather than strings.
var positionnumbers = positions.map(s => +s);
var lapnumbers = laps.map(s => +s);

//returns [min,max] of laps and positions to be used in scale limits
var yExtent = d3.extent(positionnumbers);
var xExtent = d3.extent(lapnumbers);



//sets domains of x-axis and y-axis based on the Extent arrays and transitions the axis values to the new ones.
x.domain([ xExtent[0], xExtent[1]]);
svgrace.selectAll(".myXaxis").transition()
    .duration(500)
    .call(xAxis)
;
           
y.domain([ yExtent[1], yExtent[0]])
svgrace.selectAll(".myYaxis").transition()
        .duration(500)
        .call(yAxis)
;
            
//groups the data into driver-groups (e.g. all of driver 1's data is one group) and transforms into array.
var dataNest = Array.from(d3.group(racedata, d=>d.driver), ([key, value]) => ({key, value}));

//function for drawing lines - used later.
var linefunction = d3.line()
                     .x(function(d){return x(+d.lap);})
                     .y(function(d){return y(+d.position);})
;

//selects all current lines and removes them so that new ones can be drawn in.
d3.selectAll(".line").transition().remove();

//since data is in groups, forEach has to be run through it as the standard technique didn't work
//this made it difficult to attempt to merge the data smoothly, hence simply removing the previous lines beforehand.
dataNest.forEach(function(d,i){

        svgrace.append("path")
            .attr("class", "line")
            .transition()
            .duration(750)
            .attr("fill", "none")
            .attr("stroke-width", 1.5)
            .attr("d", linefunction(d.value))
            .attr("stroke", function(){
                //returns team specific colour based on driver id

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
                //see idselector function
                return idselector(d);
            })
            .attr("opacity", 1)
            .attr("transform", "translate(50, 30)");

    

//attributes team id based on driver id.
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



})


}



