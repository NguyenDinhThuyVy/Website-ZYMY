import { Table } from 'antd'
import type { TableProps } from 'antd'
import adminApi from 'src/apis/admin.api'
import { useQuery } from 'react-query'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Order } from 'src/types/order.type'
import { useEffect, useState } from 'react'
import { User } from 'src/types/user.type'

function TableHistory() {
  const queryConfig = useQueryConfig()

  // Sử dụng useQuery để lấy dữ liệu đơn hàng
  const { data: orderData } = useQuery({
    queryKey: ['orders', queryConfig],
    queryFn: () => adminApi.getAllOrder()
  })
  const [userData, setUserData] = useState<User[]>([])

  useEffect(() => {
    if (orderData && orderData.data && orderData.data.data) {
      const dataIndex: string[] = orderData.data.data.map((order: any) => order.user)
      adminApi
        .getUser(dataIndex) // Sử dụng mảng userId trực tiếp
        .then((response) => {
          const userData: User[] = response.data.data // Giả sử API trả về dữ liệu người dùng trực tiếp
          setUserData(userData)
        })
        .catch((error) => {
          console.error('Error fetching user data:', error)
        })
    }
  }, [orderData])
  console.log(userData)
  // Khai báo columns cho bảng
  const columns: TableProps<Order>['columns'] = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Mã Người Mua',
      dataIndex: 'user',
      key: 'user',
      render: (userId: string) => {
        const user = userData.find((userData) => userData._id === userId)
        return user ? user.name : 'Loading...'
      }
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
      title: 'Số điện thoại',
      dataIndex: ['shippingAddress', 'phone'],
      key: 'shippingAddress.phone'
    },
    {
      title: 'status',
      key: 'status',
      dataIndex: 'status',
      width: 5
    }
  ]

  // Lấy dữ liệu đơn hàng từ orderData
  const order: any = orderData?.data.data

  // Render Table với dữ liệu đơn hàng và columns đã được khai báo
  return (
    <>
      <Table
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['6', '8', '12'],
          defaultPageSize: 6
        }}
        columns={columns}
        dataSource={order}
      />
    </>
  )
}

export default TableHistory
