let driverdata  = [];

d3.csv("data/drivers2021.csv",function(data){
driverdata.push({id: data.driverId, number: data.number, code: data.code, forename: data.forename, surname: data.surname});

}
)

setTimeout(function(){
    console.log(driverdata);
}, 1500);


function drivertooltip(data){
    for(i=0; i<driverdata.length; i++){
        if(driverdata[i].id == data){
            return driverdata[i].forename + " " + driverdata[i].surname;
        }
    }
}


function MercCheck(){
var checkbox = document.getElementsByName("mercedes");
if (checkbox[0].checked){
    d3.selectAll("#mercedes").transition().duration(500).attr("stroke", "white");
} 
else d3.selectAll("#mercedes").transition().duration(500).attr("stroke", "#00D2BE");

}
