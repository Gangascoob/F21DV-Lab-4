let sampledata = [];
let filteredracedata = [];
let racedata = [];
let groupedracedata = [];
var raceidselect;

raceidselect = 1061;

d3.csv("data/laptimes2021.csv", function(data){
sampledata.push({id: data.raceId, driver: data.driverId, lap: data.lap, position: data.position});

}).then(function filter(){
filteredracedata = sampledata.filter(function(d){return d.id == raceidselect});

//pushing into new array so that is visible outside function
for(i=0; i<filteredracedata.length; i++){
racedata.push({id: filteredracedata[i].id, driver: filteredracedata[i].driver, lap: filteredracedata[i].lap, position: filteredracedata[i].position});
}

groupedracedata = d3.groups(racedata, d=>d.driver);

//console.log(groupedracedata.get("1"));
console.log(groupedracedata);
});

