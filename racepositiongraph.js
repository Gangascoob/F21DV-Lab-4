const margin = { top: 5, bottom: 5, left: 5, right: 5 };



var l;







function racegraph(data){

var svgrace = d3.select("#driverpos")
                .append("svg")
                .attr("width", "150%")
                .attr("height", "100%")
                .attr("id", "linesvg")
                .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

let laps = [];
let positions = [];

/*
var xExtent = [d3.min(data.lap), d3.max(data.lap)];
console.log(xExtent);
*/


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



const x = d3.scaleLinear()
            .domain([ xExtent[0], xExtent[1]])
            .range([0,700]);

const y = d3.scaleLinear()
            .domain([ yExtent[1], yExtent[0]])
            .range([280,0]);

svgrace.append("g")
        .attr("transform", "translate(20," + 310 +")")
        .call(d3.axisBottom(x).ticks(xExtent[1]).tickSize(2));

svgrace.append("g")
    .call(d3.axisLeft(y).ticks(yExtent[1]))
    .attr("transform", "translate(20, 30)");
    //.attr("transform", "translate(20, 0)");

var groupedracedata = d3.group(racedata, d=>d.driver);

console.log(groupedracedata);

var dataNest = Array.from(d3.group(racedata, d=>d.driver), ([key, value]) => ({key, value}));
console.log(dataNest);








svgrace.selectAll(".line")
        .append("g")
        .attr("class", "line")
        .data(groupedracedata)
        .enter()
        .append("path")
        .attr("d", function(d){
            return d3.line().x(d=>x(+d.lap))
                            .y(d=>y(+d.position))
        })
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2);




}



