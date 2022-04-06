let sampledata = [];
let filteredracedata = [];
let racedata = [];
var raceidselect;

raceidselect = 9;

d3.csv("data/laptimes2021.csv", function(csv){
sampledata.push({id: csv.raceId, driver: csv.driverId, lap: csv.lap, position: csv.position});
}).then(function filter(){
filteredracedata = sampledata.filter(function(d){return d.raceId == raceidselect});

console.log(filteredracedata);

racedata = [{id: filteredracedata.raceId, driver: filteredracedata.driverId, lap: filteredracedata.lap, position: filteredracedata.position}];
console.log(racedata[0]);
});

console.log(racedata[5]);