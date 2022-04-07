const margin = { top: 40, bottom: 10, left: 40, right: 20 };



var l;







function racegraph(data){

var svgrace = d3.select("#driverpos")
                .append("svg")
                .attr("width", "90%")
                .attr("height", "90%");

const g = svgrace.append("g").attr("transform", `translate(${margin.left},${margin.top})`);



var xExtent = d3.extent(data, d => d.lap);
xScale = d3.scaleLinear().domain(xExtent).range([0, "90%"]);

var yMax = d3.max(data, d=>d.position);
yScale = d3.scaleLinear().domain([0, yMax]).range(["90%", 0]);



//draw xAxis and xAxis label
xAxis = d3.axisBottom()
    .scale(xScale)

d3.select("svg")
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0,620)")
    .call(xAxis)
    .append("text")
    .attr("x", (900+70)/2) //middle of the xAxis
    .attr("y", "50") // a little bit below xAxis
    .text("Year")

//yAxis and yAxis label
yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10)

d3.select('svg')
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margin.left},20)`) //use variable in translate
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", "-150")
    .attr("y", "-50")
    .attr("text-anchor", "end")
    .text("US Media Ad Spending (Billions)")

}



