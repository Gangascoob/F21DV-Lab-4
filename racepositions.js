let sampledata = [];
let filteredracedata = [];
let racedata = [];
var raceidselect;

raceidselect = 1061;

d3.csv("data/laptimes2021.csv", function(data){
sampledata.push({id: data.raceId, driver: data.driverId, lap: data.lap, position: data.position});

}).then(function filter(){
filteredracedata = sampledata.filter(function(d){return d.id == raceidselect});



racedata = [{id: filteredracedata.raceId, driver: filteredracedata.driverId, lap: filteredracedata.lap, position: filteredracedata.position}];

});
console.log(racedata);
