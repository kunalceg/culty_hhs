var soilType= [], soilFC = [], soilWP = [], soilTP = [], soilTP1 = []

async function dummyChart (){
    await getDummy()
let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx,{
    type: 'bar',

    data: {
        labels: soilType,
        datasets: [{
            label:'Soil Field capacity',
            backgroundColor: 'blue',
            boarderColor: 'rgb(255,99,132)',
            data: soilFC
        },
        {label:'Soil wilting point',
            backgroundColor: 'red',
            boarderColor: 'rgb(255,99,132)',
            data: soilWP
    },
    {label:'Soil threshold point',
            backgroundColor: 'green',
            boarderColor: 'rgb(255,99,132)',
            data: soilTP
    },
    {label:'Soil threshold percent',
            backgroundColor: 'yellow',
            boarderColor: 'rgb(255,99,132)',
            data: soilTP1
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
    const apiUrl ="http://localhost:8080/api/v1/dsoilchart/cultyvatesoilchart"

    const response = await fetch(apiUrl)
    const barChart = await response.json()

    const st = barChart.Soildetails.soil.map( (x) => x.soiltype)
    const fc = barChart.Soildetails.soil.map( (x) => x.Fieldcapacity)
    const wp = barChart.Soildetails.soil.map( (x) => x.wiltingpoint)
    const tp = barChart.Soildetails.soil.map( (x) => x.thresholdpoint)
    const tp1 = barChart.Soildetails.soil.map( (x) => x.Threshold_percentage)

    //console.log(st,fc,wp,tp)
    console.log(barChart)

    soilType=st
    soilFC=fc
    soilWP=wp
    soilTP=tp
    soilTP1=tp1
}
