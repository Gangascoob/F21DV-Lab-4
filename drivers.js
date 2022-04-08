let driverdata  = [];
let alldriverscheck;

//prepares driver data into a usable array.
d3.csv("data/drivers2021.csv",function(data){
driverdata.push({id: data.driverId, number: data.number, code: data.code, forename: data.forename, surname: data.surname});

}
)


//Number of functions to help filter out data.
//sets opacity of team's data to 0 if checked.


function AllTeamsCheck(){
var checkbox = document.getElementsByName("allteams");
if (checkbox[0].checked){
    d3.selectAll(".line").transition().duration(500).attr("opacity", 0);
    alldriverscheck = 1;
}
else d3.selectAll(".line").transition().duration(500).attr("opacity", 1);
alldriverscheck = 0;

}



function MercCheck(){
var checkbox = document.getElementsByName("mercedes");
if (checkbox[0].checked){
    d3.selectAll("#mercedes").transition().duration(500).attr("opacity", 0);
} 
else d3.selectAll("#mercedes").transition().duration(500).attr("opacity", 1);

}

function RedBullCheck(){
    var checkbox = document.getElementsByName("redbull");
    if (checkbox[0].checked){
        d3.selectAll("#redbull").transition().duration(500).attr("opacity", 0);
    } 
    else d3.selectAll("#redbull").transition().duration(500).attr("opacity", 1);
    
}

function FerrariCheck(){
    var checkbox = document.getElementsByName("ferrari");
    if (checkbox[0].checked){
        d3.selectAll("#ferrari").transition().duration(500).attr("opacity", 0);
    } 
    else d3.selectAll("#ferrari").transition().duration(500).attr("opacity", 1);
    
}

function McLarenCheck(){
    var checkbox = document.getElementsByName("mclaren");
    if (checkbox[0].checked){
        d3.selectAll("#mclaren").transition().duration(500).attr("opacity", 0);
    } 
    else d3.selectAll("#mclaren").transition().duration(500).attr("opacity", 1);
    
}

function AlpineCheck(){
    var checkbox = document.getElementsByName("alpine");
    if (checkbox[0].checked){
        d3.selectAll("#alpine").transition().duration(500).attr("opacity", 0);
    } 
    else d3.selectAll("#alpine").transition().duration(500).attr("opacity", 1);
    
}

function AlphaTauriCheck(){
    var checkbox = document.getElementsByName("alphatauri");
    if (checkbox[0].checked){
        d3.selectAll("#alphatauri").transition().duration(500).attr("opacity", 0);
    } 
    else d3.selectAll("#alphatauri").transition().duration(500).attr("opacity", 1);
    
}

function AlfaRomeoCheck(){
    var checkbox = document.getElementsByName("alfaromeo");
    if (checkbox[0].checked){
        d3.selectAll("#alfaromeo").transition().duration(500).attr("opacity", 0);
    } 
    else d3.selectAll("#alfaromeo").transition().duration(500).attr("opacity", 1);
    
}

function WilliamsCheck(){
    var checkbox = document.getElementsByName("williams");
    if (checkbox[0].checked){
        d3.selectAll("#williams").transition().duration(500).attr("opacity", 0);
    } 
    else d3.selectAll("#williams").transition().duration(500).attr("opacity", 1);
    
}

function HaasCheck(){
    var checkbox = document.getElementsByName("haas");
    if (checkbox[0].checked){
        d3.selectAll("#haas").transition().duration(500).attr("opacity", 0);
    } 
    else d3.selectAll("#haas").transition().duration(500).attr("opacity", 1);
    
}

function AstonMartinCheck(){
    var checkbox = document.getElementsByName("astonmartin");
    if (checkbox[0].checked){
        d3.selectAll("#astonmartin").transition().duration(500).attr("opacity", 0);
    } 
    else d3.selectAll("#astonmartin").transition().duration(500).attr("opacity", 1);
    
}