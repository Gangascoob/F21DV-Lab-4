var projection = d3.geoEquirectangular() 
				   .center([ 0, 0 ]) 
				   .translate([ 150, 150 ]) 
				   .scale([150]); 

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