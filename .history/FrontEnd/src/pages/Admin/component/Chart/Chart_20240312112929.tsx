import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'

// Thư viện Chart.js
import Chart from 'chart.js'

// Dữ liệu biểu đồ
const Chart = {
  labels: ['Đỏ', 'Xanh', 'Vàng'],
  datasets: [
    {
      data: [30, 50, 20],
      backgroundColor: ['red', 'blue', 'yellow']
    }
  ]
}
export default Chart
