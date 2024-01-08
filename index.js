//const ctx = document.getElementById('myChart');
let elctroPrice = [];
let elctroTime = [];

async function apiData() {
  const apiLink = 'https://www.hvakosterstrommen.no/api/v1/prices/2024/01-08_NO5.json '
  const response = await fetch(apiLink)
  const datapoints = await response.json()
  console.log(datapoints)
  const priceNok = datapoints.map((key) =>  Math.ceil(key.NOK_per_kWh * 100))
  //const priceNok = datapoints.map((amount) => {
  //  const priceAsString = String(amount.NOK_per_kWh); // Convert the price to a string
   // return priceAsString.slice(0, 3); // Get the first three characters
  //})`${key.time_start.slice(11, 16)} - ${key.time_end.slice(11, 16)}`)

  const timeStart = datapoints.map((key) => key.time_start.slice(11, 13) )// Retrieve and format time_start values (HH:MM)
  //const timeEnd = datapoints.map((key) => key.time_end.slice(11, 16)) // Retrieve time_end values
  
  elctroPrice = priceNok
  //elctroTime = { timeStart, timeEnd }; // Assign time values
  elctroTime = timeStart 

}




async function drawChart() {
  await apiData()

  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
  type: 'bar',
  data: {
    labels: elctroTime,
    datasets: [{
      label: 'Strømpriser per time',
      data: elctroPrice,
      borderWidth: 0,
      backgroundColor: 'pink',
      borderColor: '#FF95A8',
      color: '#5D5D5D'

    }]
  },
  options: {
    scales: {
  
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value ; // Appending 'øre' to each tick label on the y-axis
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed.y + ' øre'; // Appending 'øre' to the tooltip label
            return label;
          }
        }
      }
    }
  }
});
}
drawChart()
