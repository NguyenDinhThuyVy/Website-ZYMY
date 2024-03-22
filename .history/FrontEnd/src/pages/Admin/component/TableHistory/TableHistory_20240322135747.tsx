import { Table } from 'antd'
import type { TableProps } from 'antd'
// import { Link } from 'react-router-dom'
import adminApi from 'src/apis/admin.api'
import { useQuery } from 'react-query'

import useQueryConfig from 'src/hooks/useQueryConfig'
import { Order } from 'src/types/order.type'
import { useEffect } from 'react'

// import { toast } from 'react-toastify'

function TableHistory() {
  const queryConfig = useQueryConfig()
  const { data: orderData } = useQuery({
    queryKey: ['orders', queryConfig],
    queryFn: () => {
      return adminApi.getAllOrder()
    }
  })

  const dataIndex: any[] = orderData?.data.data.user // Giả sử dataIndex là một mảng các giá trị người dùng
  const userDataQueries = dataIndex.map((userId) => {
    return useQuery({
      queryKey: ['userData', userId], // Sử dụng từng userId làm một phần của queryKey
      queryFn: () => {
        return adminApi.getUser(userId) // Truyền từng userId vào hàm API
      }
    })
  })
  console.log(orderData?.data.data)
  const columns: TableProps<Order>['columns'] = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Mã Người Mua',
      dataIndex: 'user',
      key: 'user'
    },
    {
      title: 'Số lượng',
      dataIndex: 'buy_count',
      key: 'buy_count'
    },
    {
      title: 'Địa chỉ',
      dataIndex: ['shippingAddress', 'city'],
      key: 'shippingAddress.city'
    },
    {
      title: 'Địa chỉ',
      dataIndex: ['shippingAddress', 'phone'],
      key: 'shippingAddress.phone'
    },
    {
      title: 'status',
      key: 'status',
      dataIndex: 'status',
      width: 5
      // render: (record) => {
      //   let state: string
      //   let css: string

      //   if (record.status === 1) {
      //     state = 'Prepare'
      //     css = 'bg-[#ee9b00]'
      //   } else if (record.status === 3) {
      //     state = 'Successful'
      //     css = 'bg-green-500'
      //   }
      // }
    }
  ]

  const order: any = orderData?.data.data
  // console.log(order)
  return (
    <>
      <Table
        pagination={{
          showSizeChanger: true, // Hiển thị tùy chọn lựa chọn pageSize
          pageSizeOptions: ['6', '8', '12'], // Các tùy chọn pageSize
          defaultPageSize: 6 // Kích thước mặc định của pageSize
        }}
        columns={columns}
        dataSource={order}
      />
    </>
  )
}

export default TableHistory
