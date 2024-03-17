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

const data: MyChartData = {
  labels: ['Đỏ', 'Vàng'],
  datasets: [
    {
      data: [80, 20],
      backgroundColor: ['red', 'yellow']
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
