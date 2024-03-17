// import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip } from 'chart.js'
Chart.register(ArcElement, Tooltip)

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string[]
    hoverOffset: number
  }[]
}

interface ChartOptions {
  type: string
  data: ChartData
  plugins: {
    legend: {
      display: boolean
      position: 'top' | 'bottom' | 'left' | 'right'
      labels: {
        color: string
        font: {
          size: number
        }
      }
    }
    tooltip: {
      enabled: boolean
      callbacks: {
        label: (context: any) => string
      }
    }
    datalabels: {
      display: boolean
      color: string
      font: {
        size: number
      }
      formatter: (value: number, context: any) => string | undefined
    }
  }
}

function MyDoughnutChart() {
  const data = {
    labels: ['Admin', 'User'],
    datasets: [
      {
        label: 'Total Account',
        data: [30, 50],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4
      }
    ]
  }

  const options: ChartOptions = {
    type: 'doughnut',
    data,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          color: 'black',
          font: {
            size: 16
          }
        }
      },
      tooltip: {
        enabled: true, // Enable the tooltip
        callbacks: {
          label: (context) => {
            const { dataset } = context
            const label = dataset.label || ''
            const value = dataset.data[context.dataIndex]
            const total = dataset.data.reduce((acc: number, curr: number) => acc + curr, 0)
            const percentage = ((value / total) * 100).toFixed(2)
            const city = data.labels[context.dataIndex]
            return `${label} ${city}: ${value} (${percentage}%)`
          }
        }
      },
      datalabels: {
        display: false, // Tắt hiển thị nhãn trên biểu đồ
        color: 'black',
        font: {
          size: 10
        },
        formatter: (value: number) => {
          // Custom formatting logic here
          return value.toFixed(2) + '%' // Example: Return a formatted percentage string
        }
      }
    }
  }

  return (
    <figure className='flex flex-col '>
      <div className='max-w-[250px] max-h-[300px]'>
        <Pie data={data} options={options} />
      </div>
      <figcaption className='flex flex-wrap items-center gap-x-[15px] mt-[10px] gap-y-[10px]'>
        <div className='flex items-center gap-x-[10px]'>
          <div className='bg-[#36eb91] w-[50px] h-[20px]' />
          <span>User</span>
        </div>

        <div className='flex items-center gap-x-[10px]'>
          <div className='bg-[#ff6384] w-[50px] h-[20px]' />
          <span>Admin</span>
        </div>
      </figcaption>
    </figure>
  )
}

export default MyDoughnutChart
