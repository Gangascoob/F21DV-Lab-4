let sampledata = [];
let filteredracedata = [];
let racedata = [];
var raceidselect;

raceidselect = 9;

d3.csv("data/laptimes2021.csv", function(data){
sampledata.push({id: data.raceId, driver: data.driverId, lap: data.lap, position: data.position});
console.log(sampledata[1]);
}).then(function filter(){
filteredracedata = sampledata.filter(function(d){return d.raceId == raceidselect});

console.log(filteredracedata);

racedata = [{id: filteredracedata.raceId, driver: filteredracedata.driverId, lap: filteredracedata.lap, position: filteredracedata.position}];

});

