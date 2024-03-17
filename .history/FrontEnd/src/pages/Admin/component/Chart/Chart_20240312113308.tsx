import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'

// Thư viện Chart.js
import { Chart } from 'react-chartjs-2'

// Dữ liệu biểu đồ
const data = {
  labels: ['Đỏ', 'Xanh', 'Vàng'],
  datasets: [
    {
      data: [30, 50, 20],
      backgroundColor: ['red', 'blue', 'yellow']
    }
  ]
}
const MyDoughnutChart = () => {
  // Biến lưu trữ options cho biểu đồ
  const [options, setOptions] = useState({})

  // Khởi tạo biểu đồ sau khi component được render
  useEffect(() => {
    const chart = new Chart(document.getElementById('doughnut-chart'), {
      type: 'doughnut',
      data: data,
      options: options
    })

    // Hủy biểu đồ khi component bị unmount
    return () => chart.destroy()
  }, [options])

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
