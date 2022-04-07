let sampledata = [];
let filteredracedata = [];
let racedata = [];
var raceidselect;

raceidselect = 1061;

d3.csv("data/laptimes2021.csv", function(data){
sampledata.push({id: data.raceId, driver: data.driverId, lap: data.lap, position: data.position});

}).then(function filter(){
filteredracedata = sampledata.filter(function(d){return d.id == raceidselect});




for(i=0; i<filteredracedata.length; i++){
//racedata[i] = [{id: filteredracedata[i].id, driver: filteredracedata[i].driver, lap: filteredracedata[i].lap, position: filteredracedata[i].position}];
racedata.push({id: filteredracedata[i].id, driver: filteredracedata[i].driver, lap: filteredracedata[i].lap, position: filteredracedata[i].position});
}



//racedata.push({id: filteredracedata.id, driver: filteredracedata.driver, lap: filteredracedata.lap, position: filteredracedata.position});

});
console.log(filteredracedata);
console.log(racedata);