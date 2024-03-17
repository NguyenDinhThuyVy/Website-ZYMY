import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { ChartConfiguration, ChartData, ArcElement, Chart } from 'chart.js' // Import Chart và ArcElement từ Chart.js

// // Định nghĩa kiểu cho dữ liệu Chart.js
// interface MyChartData extends ChartData {
//   labels: string[]
//   title?: string // Option cho tiêu đề (có thể undefined)
//   legend?: string // Option cho chú thích (có thể undefined)
//   datasets: {
//     data: number[]
//     backgroundColor: string[]
//   }[]
// }

const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
      hoverOffset: 4
    }
  ]
}

const MyDoughnutChart: React.FC = () => {
  // Biến lưu trữ options cho biểu đồ với kiểu rõ ràng
  const [options, setOptions] = useState<ChartConfiguration | undefined>({})

  useEffect(() => {
    Chart.register(ArcElement)

    const chartElement = document.getElementById('doughnut-chart') as HTMLCanvasElement

    if (chartElement) {
      const chart = new Chart(chartElement, {
        type: 'pie',
        data: data,
        options: options
      })

      return () => {
        chart.destroy()
      }
    } else {
      console.error('Phần tử doughnut-chart không tìm thấy')
    }
  }, [options])

  return (
    <Doughnut
      data={{
        labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
        datasets: [
          {
            label: 'Population (millions)',
            backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
            data: [2478, 5267, 734, 784, 433]
          }
        ]
      }}
      option={{
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      }}
    />
  )
}

export default MyDoughnutChart
