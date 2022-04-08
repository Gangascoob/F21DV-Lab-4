//various variables
const margin = { top: 10, bottom: 10, left: 10, right: 10 };
var barwidth = 400;
var barheight = 250;
var temp;


//create svg for barchart.
var svgbar = d3.select("#wdcwcc")
      		.append("svg")
                  .attr("width", barwidth)
                  .attr("height", barheight);

//adds g element with margins.                 
const g = svgbar.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

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
function barchart(name){

let barcsv = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv";
let data = []; //more data added
temp = name;
//console.log(iso);
//console.log(temp);

//Pushes specific attributes of the csv into data[] so it can be filtered.
//Data is then filtered to only return the row with the matching name and dates.
//Since this is only ever an array of length 1, we can target it easily to select only the data we want for the graph
//and rearrange it into a better format for graphing use. 
d3.csv(barcsv, function(csv){
data.push({location: csv.location, date: csv.date, vaccinated:
   + csv.people_vaccinated, 
   fullvaccinated: + csv.people_fully_vaccinated,
   booster: + csv.total_boosters});			
}).then(function filter(){
filteredData = data.filter(function(d){return d.location == name && d.date == date});


filteredDataBar = [{vacctype: "Booster", number: filteredData[0].booster}, {vacctype: "Fully Vaccinated", number: (filteredData[0].fullvaccinated - filteredData[0].booster)}, 
{vacctype: "Singly Vaccinated", number: (filteredData[0].vaccinated - filteredData[0].booster - filteredData[0].fullvaccinated)} ];

//console.log(data[5].location);
//console.log(filteredDataBar);
//console.log(filteredVaccNumbers);
});
};


//Function for updating the bars.

function updatebar(data){


      xscale.domain([0, d3.max(data, function(d){return d.number} )]);
      yscale.domain(data.map(function(d){return d.vacctype}));
      
      g_xaxis.transition().call(xaxis);
      g_yaxis.transition().call(yaxis);
      
      
      const rect = g.selectAll("rect")
                  .data(data, function(d){return d.vacctype;})
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
          .attr("width", function(d){ return xscale(d.number);})
          .attr("y", function(d){ return yscale(d.vacctype);});
          
      rect.select("title").text(function(d){return d.vacctype});
      
};