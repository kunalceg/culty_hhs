var Fname= [], Fdate = [], Flocat = [], Fdevice = []

async function dummyChart (){
    await getDummy()
let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx,{
    type: 'bar',

    data: {
        labels: Fdate,
        datasets: [{
            label:'Farmer Details',
            backgroundColor: 'blue',
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

async function getDummy(){
    const apiUrl ="http://localhost:8080/api/v1/farmchart/cultyvatefarmchart"

    const response = await fetch(apiUrl)
    const barChart = await response.json()

    const name = barChart.FarmerDetails.farmer.map( (x) => x.name)
    const date = barChart.FarmerDetails.farmer.map( (x) => x.Date)
    //const lat = barChart.FarmerDetails.farmer.map( (x) => x.latitude)

    Fname=name
    for (let i = 0; i <= date.length -1; i++) {

        data3=[];
    var UTCdate = new Date(date[i]);
    var onlyDate = UTCdate.toLocaleDateString();
    data3.push(onlyDate)
    Fdate.push(data3)
  
};

    console.log(barChart)
    
    //Fdate=date

}