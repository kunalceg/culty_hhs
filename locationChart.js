var Fname= [], Flocat = [], Fid = [], Fdid = []

async function dummyChart (){
    await getDummy()
let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx,{
    type: 'bar',

    data: {
        labels: Flocat,
        datasets: [{
            label:'Farmer Name',
            backgroundColor: 'blue',
            boarderColor: 'rgb(255,99,132)',
            data: Fname
        },
        {
            label:'Farmer Device',
            backgroundColor: 'red',
            boarderColor: 'rgb(255,99,132)',
            data: Fname
        }


    ]
    },

    options: {
        tooltips: {
            mode: 'index'
        }
}
});


}

dummyChart()

// fetch data
var a , b
async function getDummy(){
    const apiUrl ="http://localhost:8080/api/v1/location/cultyvatelocation"

    const response = await fetch(apiUrl)
    const barChart = await response.json()

    const name = barChart.Location.farmer.map( (x) => x.name)
    const id = barChart.Location.farmer.map( (x) => x.id)
     a = barChart.Location.farmer.map( (x) => x.latitude)
     b = barChart.Location.farmer.map( (x) => x.longitude)
    const did = barChart.Location.farmer.map( (x) => x.deviceid)
    

    Fname=name
    Fid=id
    Fdid=did
    
    
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: a, lng: b },
            scrollwheel: false,
            zoom: 2,
            

        });
    
    }
      
   console.log(barChart)
   console.log(Flocat)
}  
     
    //Fdate=date
