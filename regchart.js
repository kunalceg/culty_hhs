var RegDate= [], RegName = [], RegDevice = []

async function dummyChart (){
    await getDummy()
let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx,{
    type: 'bar',

    data: {
        labels: RegDate,
        datasets: [{
            label:'Registration Succesfully',
            backgroundColor: 'blue',
            boarderColor: 'rgb(255,99,132)',
            data: RegName
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
    const apiUrl ="http://localhost:8080/api/v1/regchart/cultyvateregchart"

    const response = await fetch(apiUrl)
    const barChart = await response.json()

    const date1 = barChart.Registration.reg.map( (x) => x.Date)
    const id = barChart.Registration.reg.map( (x) => x.id)
    const name = barChart.Registration.reg.map( (x) => x.name)
    console.log(id)
    RegDevice=id
    RegName=name

    for (let i = 0; i <= date1.length -1; i++) {

            data3=[];
        var UTCdate = new Date(date1[i]);
        var onlyDate = UTCdate.toLocaleDateString();
        data3.push(onlyDate)
        RegDate.push(data3)
      
    };
    
    console.log("this is bar",barChart)

    RegDevice=id
    RegName=name
   
}