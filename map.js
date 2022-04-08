
//initialising variables + arrays
var circuitmarks = [];
var circuitnames = [];
var circuitidorder = [3, 21, 75, 4, 6, 73, 34, 70, 72, 9, 11, 13, 39, 14, 71, 5, 69, 32, 18, 78, 77, 24];
var raceidorder = [1052, 1053, 1054, 1055, 1056, 1057, 1059, 1058, 1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1069, 1070, 1071, 1051, 1072, 1073];
var circuitposition = 0;


//defines projection so that it's centered well
var projection = d3.geoEquirectangular() 
				   .center([ -30, 0 ]) 
				   .translate([ 350, 220 ]) 
				   .scale([150]); 

			
var path = d3.geoPath()
			 .projection(projection);


//reads and pushes circuit co-ordinates and names to separate arrays
d3.csv("data/circuits2021.csv", function(data){

	circuitmarks.push({lng: data.lng, lat: data.lat, circuitid: data.circuitId});
	circuitnames.push(data.name);
})



//appends map svg to its container
var svg = d3.select("#mapcontainer")
	.append("svg")
	.attr("width", "100%")
	.attr("height", "90%");

//reads through json data and draws map based on co-ordinates. Circle marks are placed at co-ordinates of circuits using the circuitmarks array.
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



//moves to the next circuit in the array
function nextcircuit(){

//counts up the circuitposition variable
circuitposition++;

//if variable goes above the length of the circuits array, variable is kept at maximum and text is removed from button.
if(circuitposition>(circuitidorder.length-1)){
	circuitposition = circuitidorder.length - 1;
	d3.select("#nextbut")
		.text("");
}
else d3.select("#nextbut")
		.text("Next Round");

d3.select("#prevbut")
	.text("Previous Round");

d3.select(".bannertext")
	.text("Formula 1 2021 Season - Round " + (circuitposition + 1) + " - " + circuitnames[circuitposition]);

//Increases marker size of the current circuit to indicate that it's selected
//also reduces marker size of previous circuit to the original size/colour
d3.selectAll("#marker" + circuitidorder[circuitposition])
	.transition()
	.attr("r", 10)
	.attr("fill", "green");

d3.selectAll("#marker" + circuitidorder[circuitposition - 1])
	.transition()
	.attr("r", 3)
	.attr("fill", "red");

//updates selected race variable and calls the loadnext() function to load data and update graphs.
raceidselect = +raceidorder[circuitposition];
loadnext();
};

//Same as nextCircuit but working backwards.
function prevcircuit(){
	circuitposition--;

	if(circuitposition <= 0){
		d3.select("#prevbut")
		.text("");
		circuitposition = 0;
	}
	else d3.select("#prevbut")
			.text("Previous Round");

	d3.select("#nextbut")
		.text("Next Round");

	d3.select(".bannertext")
		.text("Formula 1 2021 Season - Round " + (circuitposition + 1) + " - " + circuitnames[circuitposition]);

	d3.selectAll("#marker" + circuitidorder[circuitposition])
		.transition()
		.attr("r", 10)
		.attr("fill", "green");
	d3.selectAll("#marker" + circuitidorder[circuitposition + 1])
		.transition()
		.attr("r", 3)
		.attr("fill", "red");

	raceidselect = +raceidorder[circuitposition];
	loadnext();
	};



