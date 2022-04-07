const margin = { top: 5, bottom: 5, left: 5, right: 5 };



var l;







function racegraph(data){

var svgrace = d3.select("#driverpos")
                .append("svg")
                .attr("width", "90%")
                .attr("height", "90%")
                .attr("id", "linesvg")
                .append("g").attr("transform", `translate(${margin.left},${margin.top})`);



var xExtent = d3.extent(data, d => d.lap);
var yExtent = d3.extent(data, d => d.position);

const x = d3.scaleLinear()
            .domain([ xExtent[0], xExtent[1]])
            .range([0,300]);

const y = d3.scaleLinear()
            .domain([ yExtent[0], yExtent[1]])
            .range([300,0]);

svgrace.append("g")
        .attr("transform", "translate(0," + 250 +")")
        .call(d3.axisBottom(x));

svg.append("g")
    .call(d3.axisLeft(y))
    .attr("transform", "translate(20, 0)");







}



