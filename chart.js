let chart;

function renderChart(labels, data) {
  const ctx = document.getElementById('historyChart').getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Taxa de Câmbio',
        data,
        borderColor: '#2563eb',
        backgroundColor: '#93c5fd',
        fill: true,
        tension: 0.3,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}
