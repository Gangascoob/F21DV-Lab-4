const margin = { top: 5, bottom: 5, left: 5, right: 5 };



var l;







function racegraph(data){

var svgrace = d3.select("#driverpos")
                .append("svg")
                .attr("width", "90%")
                .attr("height", "90%")
                .attr("id", "linesvg")
                .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

let laps = [];
let positions = [];
let positionnumbers = [];
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

positionnumbers = positions.map(s => +s);


var minlaps = d3.min(laps, s=>+s);
var maxlaps = d3.max(laps, s=>+s);

console.log(minlaps + " " + maxlaps);



var yExtent = d3.extent(positionnumbers);

console.log(yExtent);

const x = d3.scaleLinear()
            .domain([ minlaps, maxlaps])
            .range([0,420]);

const y = d3.scaleLinear()
            .domain([ yExtent[0], yExtent[1]])
            .range([320,0]);

svgrace.append("g")
        .attr("transform", "translate(20," + 320 +")")
        .call(d3.axisBottom(x).ticks(maxlaps));

svgrace.append("g")
    .call(d3.axisLeft(y))
    .attr("transform", "translate(20, 0)");
    //.attr("transform", "translate(20, 0)");







}



