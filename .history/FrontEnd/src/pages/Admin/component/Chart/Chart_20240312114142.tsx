if (chartElement) {
  const chart = new Chart(chartElement, {
    type: 'doughnut',
    data: data,
    options: options
  })
}

// Hủy biểu đồ khi component bị unmount
return () => chart.destroy()
}, [options])