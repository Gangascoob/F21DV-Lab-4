
var circuitmarks = []
var circuitidorder = [3, 21, 75, 4, 6, 73, 34, 70, 70, 9, 11, 13, 39, 14, 71, 5, 69, 32, 18, 78, 77, 24]
var circuitposition = -1;

var projection = d3.geoEquirectangular() 
				   .center([ -30, 0 ]) 
				   .translate([ 350, 220 ]) 
				   .scale([150]); 

			
var path = d3.geoPath()
			 .projection(projection);



d3.csv("data/circuits2021.csv", function(data){

	circuitmarks.push({lng: data.lng, lat: data.lat, circuitid: data.circuitId});
	console.log(circuitmarks);
})



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

	svg.selectAll("myCircles")
		.data(circuitmarks)
		.enter()
		.append("circle")
		.attr("cx", function(d){return projection([d.lng, d.lat])[0]})
		.attr("cy", function(d){return projection([d.lng, d.lat])[1]})
		.attr("r", 3)
		.attr("fill", "red")
		.attr("class", "marker")
		.attr("id", function(d){
			
			return "marker" + d.circuitid;
			
		});
           
});	   

/*
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
*/


function nextcircuit(){
circuitposition++;
d3.selectAll("#marker" + circuitidorder[circuitposition])
	.transition()
	.attr("r", 10)
	.attr("fill", "green");
d3.selectAll("#marker" + circuitidorder[circuitposition - 1])
	.transition()
	.attr("r", 3)
	.attr("fill", "red");
};

function prevcircuit(){
	circuitposition--;
	d3.selectAll("#marker" + circuitidorder[circuitposition])
		.transition()
		.attr("r", 10)
		.attr("fill", "green");
	d3.selectAll("#marker" + circuitidorder[circuitposition + 1])
		.transition()
		.attr("r", 3)
		.attr("fill", "red");
	};

/*
d3.csv("data/circuits2021.csv", function(data){

	console.log("test");

	lonlatPoint = [data.lng, data.lat];
	projectedPoint = projection(lonlatPoint);
	console.log(projectedPoint);

	svg.selectAll("circle")
		.append("circle")
		.attr("cx", projectedPoint[0])
		.attr("cy", projectedPoint[1])
		.attr("r", 4)
		.attr("fill", "red");

});
*/

