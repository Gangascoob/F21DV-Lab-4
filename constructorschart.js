//various variables
const marginbar = { top: 70, bottom: 40, left: 80, right: 40 };
var barwidth = 480;
var barheight = 220;
var temp;


//create svg for barchart.
var svgbar = d3.select("#wdcwcc")
      		.append("svg")
                  .attr("width", "100%")
                  .attr("height", "100%")
                  .attr("transform", "translate(5, 15)");

//adds g element with margins.                 
const g = svgbar.append("g").attr("transform", `translate(${marginbar.left},${marginbar.top})`);

g.append("text")
        .attr("text-anchor", "end")
        .attr("x", 250)
        .attr("y", -40)
        .text("Constructors Championship Points")
;   

//scale constants for barchart.
//.scaleBand sets width for each entry to barchart evenly spread.
//.rangeRound sets the range of the scale.
//paddingInner is just for some extra spacing between bars.
const xscale = d3.scaleLinear().range([0, 440]);
const yscale = d3.scaleBand().rangeRound([0, 200]).paddingInner(0.1);
      
const xaxis = d3.axisTop().scale(xscale);
const yaxis = d3.axisLeft().scale(yscale);
const g_xaxis = g.append("g").attr("class", "x axis");
const g_yaxis = g.append("g").attr("class", "y axis");

let filteredDataBar = [];
let filteredData = [];


//Main function for producing bar charts.
function barchart(race){


let data = []; //more data added


//Pushes specific attributes of the csv into data[] so it can be filtered.
//Data is then filtered to only return the row with the matching name and dates.
//Since this is only ever an array of length 1, we can target it easily to select only the data we want for the graph
//and rearrange it into a better format for graphing use. 
d3.csv("data/constructors2021.csv", function(csv){
data.push({constructor: csv.constructorId, race: csv.raceId, points: csv.points});			
}).then(function filter(){
filteredData = data.filter(function(d){return +d.race == race});
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
          .attr("y", function(d){ return yscale(d.constructor);})
          .attr("fill",function(d){
            //returns team specific colour based on driver id
            
            if(d.constructor == "Mclaren"){
                //MCLAREN
                
                return "#FF8700";
            }
            if(d.constructor == "Mercedes"){
                //MERCEDES
                return "#00D2BE";
            }
            if(d.constructor == "RedBull"){
                //REDBULL
                return "#0508a8";
            }
            if(d.constructor == "Ferrari"){
                //FERRARI
                return "#DC0000";
            }
            if(d.constructor == "Alpine"){
                //ALPINE
                return "#0044ff";
            }
            if(d.constructor == "AlphaTauri"){
                //ALPHATAURI
                return "#2B4562";
            }
            if(d.constructor == "AlfaRomeo"){
                //ALFAROMEO
                return "#490303";
            }
            if(d.constructor == "Williams"){
                //WILLIAMS
                return "#588ef1";
            }
            if(d.constructor == "Haas"){
                //HAAS
                return "#D9D9D9";
            }
            if(d.constructor == "AstonMartin"){
                //ASTONMARTIN
                return "#006F62";
            }

            else return "black";
        });
          
    rect.select("title").text(function(d){
            return d.points;
        });     
      
      
};