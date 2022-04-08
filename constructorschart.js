//various variables
const marginbar = { top: 10, bottom: 10, left: 10, right: 10 };
var barwidth = 400;
var barheight = 250;
var temp;


//create svg for barchart.
var svgbar = d3.select("#wdcwcc")
      		.append("svg")
                  .attr("width", barwidth)
                  .attr("height", barheight)
                  .attr("transform", "translate(50, 50)");

//adds g element with margins.                 
const g = svgbar.append("g").attr("transform", `translate(${marginbar.left},${marginbar.top})`);

//scale constants for barchart.
//.scaleBand sets width for each entry to barchart evenly spread.
//.rangeRound sets the range of the scale.
//paddingInner is just for some extra spacing between bars.
const xscale = d3.scaleLinear().range([0, barwidth]);
const yscale = d3.scaleBand().rangeRound([0, barheight-40]).paddingInner(0.1);
      
const xaxis = d3.axisTop().scale(xscale);
const yaxis = d3.axisLeft().scale(yscale);
const g_xaxis = g.append("g").attr("class", "x axis");
const g_yaxis = g.append("g").attr("class", "y axis");

let filteredDataBar = [];
let filteredData = [];


//Main function for producing bar charts.
function barchart(race){


let data = []; //more data added
temp = race;

//Pushes specific attributes of the csv into data[] so it can be filtered.
//Data is then filtered to only return the row with the matching name and dates.
//Since this is only ever an array of length 1, we can target it easily to select only the data we want for the graph
//and rearrange it into a better format for graphing use. 
d3.csv("data/constructors2021.csv", function(csv){
data.push({constructor: csv.constructorId, race: csv.raceId, points: csv.points});			
}).then(function filter(){
filteredData = data.filter(function(d){return d.race});
//resets filteredDataBar to empty so previous data isn't kept
filteredDataBar = [];

for(i=0; i<filteredData.length; i++)
{
    filteredDataBar.push({constructor: filteredData[i].constructor, race: filteredData[i].race, points: filteredData[i].points});
}

});
};

//Function for updating the bars.

function updatebar(data){


      xscale.domain([0, d3.max(data, function(d){return +d.points} )]);
      yscale.domain(data.map(function(d){return d.constructor}));
      
      g_xaxis.transition().call(xaxis);
      g_yaxis.transition().call(yaxis);
      
      
      const rect = g.selectAll("rect")
                  .data(data, function(d){return d.constructor;})
                  .join(function(enter){
                    
                    const rect_enter = enter.append("rect").attr("x", 0);
                    rect_enter.append("title");
                    return rect_enter;
                    },
                    (updatebar) => updatebar,
                    function(exit){
                           exit.remove();
                        }
                    );
      rect.transition()
                  .attr("height", (yscale.bandwidth() - 10))
          .attr("width", function(d){ return xscale(+d.points);})
          .attr("y", function(d){ return yscale(d.constructor);});
          
      rect.select("title").text(function(d){
          if(d.constructor == "9"){
              return "Red Bull";
          }
          else return "test";
      });
      
};