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
yScale = d3.scaleLinear().domain([0, yMax]).range([400, 0]);



//draw xAxis and xAxis label
xAxis = svgrace.append("g")
                .call(d3.axisBottom(x))
                .attr("transform", "translate(0, 90%)");
    

svgrace.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0,420)")
    .call(x)
    .append("text")
    .attr("x", (400+70)/2) //middle of the xAxis
    .attr("y", "30") // a little bit below xAxis
    .text("Year")

//yAxis and yAxis label
yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10)

yAxis = svgrace.append("g")
                .call(d3.axisLeft(yScale));
                

svgrace.append("g")
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



