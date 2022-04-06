var projection = d3.geoEquirectangular() 
				   .center([ 0, 0 ]) 
				   .translate([ 350, 220 ]) 
				   .scale([130]); 

			//Define path generator
var path = d3.geoPath()
		.projection(projection);







var svg = d3.select("#mapcontainer")
	.append("svg")
	.attr("width", "100%")
	.attr("height", "90%");

d3.json("worldmap.json").then(function(json){

    svg.selectAll("path")
	   .data(json.features)
	   .enter()
	   .append("path")
	   .attr("d", path)
	   .attr("stroke", "rgba(8, 81, 156, 0.2)")
           .attr("fill", "rgba(8, 81, 156, 0.6)");
           
	   
})

d3.csv("data/circuits2021.csv").then(function(csv){

	svg.selectAll("circle")
		.data(csv)
		.enter()
		.append("circle")
		.attr("cx", function (d) { return projection([+d.lng, +d.lat]);})
		.attr("cy", function (d) {return projection([+d.lng, +d.lat]);})
		.attr("r", "8px")
		.attr("fill", "red")

});