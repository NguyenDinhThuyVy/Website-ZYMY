import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { ChartConfiguration, ChartData, ArcElement, Chart } from 'chart.js' // Import Chart và ArcElement từ Chart.js

// Định nghĩa kiểu cho dữ liệu Chart.js
interface MyChartData extends ChartData {
  labels: string[]
  title?: string // Option cho tiêu đề (có thể undefined)
  legend?: string // Option cho chú thích (có thể undefined)
  datasets: {
    data: number[]
    backgroundColor: string[]
  }[]
}

const data = {
  labels: ['Red', 'Orange', 'Blue'],
  // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
  datasets: [
      {
        label: 'Popularity of colours'
        data: [55, 23, 96],
        // you can set indiviual colors for each bar
        backgroundColor: [
          'rgba(255, 255, 255, 0.6)'
          'rgba(255, 255, 255, 0.6)'
          'rgba(255, 255, 255, 0.6)'
        ],
        borderWidth: 1,
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
        type: 'doughnut',
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

  // Cập nhật options cho biểu đồ với kiểu cho đối số e
  const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <canvas id='doughnut-chart'></canvas>
      <br />
      <label htmlFor='title'>Tiêu đề:</label>
      <input type='text' id='title' name='title' onChange={handleOptionsChange} />
      <br />
      <label htmlFor='legend'>Chú thích:</label>
      <input type='text' id='legend' name='legend' onChange={handleOptionsChange} />
    </div>
  )
}

export default MyDoughnutChart
