
let filteredracedata = [];
let racedata = [];

var raceidselect;

raceidselect = 1052;

//filters out the current selected race data.
function racefilter(){

    let sampledata = [];

    d3.csv("data/laptimes2021.csv", function(data){
        //pushing the wanted information into a temporary array
        sampledata.push({id: data.raceId, driver: data.driverId, lap: data.lap, position: data.position});

        }).then(function filter(){
            //filtering out the race data by raceid so we only get the currently selected race.
            filteredracedata = sampledata.filter(function(d){return d.id == raceidselect});
            racedata = [];
            //pushing into new array so that is visible outside function
            for(i=0; i<filteredracedata.length; i++){
                racedata.push({id: filteredracedata[i].id, driver: filteredracedata[i].driver, lap: filteredracedata[i].lap, position: filteredracedata[i].position});
            }});

};


//calls the filtering function and then calls the updategraph function after a short delay so that data has time to process.
function loadnext(){

    racefilter();
    barchart(raceidselect);
    setTimeout(function(){
        updatebar(filteredDataBar);
    }, 250);
    setTimeout(function(){
        updategraph(racedata);
        
    }, 250);

};

//initial calls to load data on pageload
racefilter();
barchart(raceidselect);
    setTimeout(function(){
        updatebar(filteredDataBar);
    }, 250);
setTimeout(function(){
    updategraph(racedata);
}, 250);
