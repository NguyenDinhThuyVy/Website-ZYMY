import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'

// Import Chart từ react-chartjs-2
import { Chart } from 'chart.js'

const MyDoughnutChart = () => {
  // Biến lưu trữ options cho biểu đồ
  const [options, setOptions] = useState({})

  // Khởi tạo biểu đồ sau khi component được render
  useEffect(() => {
    const chartElement = document.getElementById('doughnut-chart')

    if (chartElement) {
      const chart = new Chart(chartElement, {
        type: 'doughnut',
        data: data,
        options: options
      })

      // Hủy biểu đồ khi component bị unmount
      return () => {
        chart.destroy()
      }
    } else {
      console.error('Phần tử doughnut-chart không tìm thấy')
    }
  }, [options]) // Re-render chart only when options change

  // Cập nhật options cho biểu đồ
  const handleOptionsChange = (e: any) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <Doughnut data={data} options={options} />
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
