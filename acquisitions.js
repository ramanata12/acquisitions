import Chart from 'chart.js/auto';

(async function() {
  try {
    // Fetch data from the API
    const response = await fetch('http://localhost/API/select.php'); // tolong sesuaikan dengan url kalian
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();

    // Check if the fetch was successful
    if (!jsonData.success) {
      throw new Error('Failed to load data: ' + jsonData.message);
    }

    const data = jsonData.data;
    // Create the chart
    new Chart(document.getElementById('acquisitions'), {
      type: 'line',
      data: {
        labels: data.map((item, index) => index + 1), // Label each point by its index
        datasets: [
          {
            label: 'Temperature',
            data: data.map(item => item.Temperature),
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            yAxisID: 'y',
          },
          {
            label: 'Humidity',
            data: data.map(item => item.Humidity),
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            yAxisID: 'y1',
          }
        ]
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Temperature'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false, // only draw the right y-axis grid
            },
            title: {
              display: true,
              text: 'Humidity'
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
})();