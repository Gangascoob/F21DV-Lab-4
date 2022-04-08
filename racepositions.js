
let filteredracedata = [];
let racedata = [];

var raceidselect;

raceidselect = 1052;


function racefilter(){

    let sampledata = [];

    d3.csv("data/laptimes2021.csv", function(data){
        sampledata.push({id: data.raceId, driver: data.driverId, lap: data.lap, position: data.position});

        }).then(function filter(){
            filteredracedata = sampledata.filter(function(d){return d.id == raceidselect});
            racedata = [];
            //pushing into new array so that is visible outside function
            for(i=0; i<filteredracedata.length; i++){
                racedata.push({id: filteredracedata[i].id, driver: filteredracedata[i].driver, lap: filteredracedata[i].lap, position: filteredracedata[i].position});
            }});

};



function loadnext(){

    racefilter();

    setTimeout(function(){
        updategraph(racedata);
    }, 750);

};


racefilter();
setTimeout(function(){
    updategraph(racedata);
}, 500);
