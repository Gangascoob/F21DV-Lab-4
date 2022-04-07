const margin = { top: 10, bottom: 10, left: 10, right: 20 };



var l;







function racegraph(data){

var svgrace = d3.select("#driverpos")
                .append("svg")
                .attr("width", "90%")
                .attr("height", "90%")
                .attr("id", "linesvg");

const g = svgrace.append("g").attr("transform", `translate(${margin.left},${margin.top})`);



var xExtent = d3.extent(data, d => d.lap);
x = d3.scaleLinear().domain([xExtent[0], xExtent[1]]).range([0, 400]);

var yMax = d3.max(data, d=>d.position);
yScale = d3.scaleLinear().domain([0, yMax]).range([300, 0]);




xAxis = svgrace.append("g")
                .call(d3.axisBottom(x))
                .ticks(50)
                .attr("transform", "translate(0, 250)");

yAxis = svgrace.append("g")
                .call(d3.axisLeft(yScale))
                .ticks(20);
                



}



