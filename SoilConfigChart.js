var SoilDevice= [], SoilCount = []

async function dummyChart (){
    await getDummy()
let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx,{
    type: 'bar',

    data: {
        labels: SoilDevice,
        datasets: [{
            label:'Soil Type',
            backgroundColor: 'blue',
            boarderColor: 'rgb(255,99,132)',
            data: SoilCount
        }

    ]
    },

    options: {
        tooltips: {
            mode: 'index'
        },
        
    }
});
}

dummyChart()

// fetch data

async function getDummy(){
    const apiUrl ="http://localhost:8080/api/v1/soilconfigChart/cultyvatesoilconfigChart"

    const response = await fetch(apiUrl)
    const barChart = await response.json()

    const sl = barChart.SoilConfig.farmer.map( (x) => x.soil)
    const id = barChart.SoilConfig.farmer.map( (x) => x.deviceid)
    
    
    console.log(barChart)

    SoilDevice=id
    SoilCount=sl
   
}
