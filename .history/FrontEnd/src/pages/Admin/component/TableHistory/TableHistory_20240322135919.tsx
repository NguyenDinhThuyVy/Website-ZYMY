import { Table } from 'antd'
import type { TableProps } from 'antd'
import adminApi from 'src/apis/admin.api'
import { useQuery } from 'react-query'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Order } from 'src/types/order.type'
import { useEffect } from 'react'

function TableHistory() {
  const queryConfig = useQueryConfig()
  const { data: orderData } = useQuery({
    queryKey: ['orders', queryConfig],
    queryFn: () => adminApi.getAllOrder()
  })

  useEffect(() => {
    // Fetch user data for each user ID
    userDataQueries.forEach((query) => {
      query.refetch() // Refetch user data whenever the component re-renders
    })
  }, [])

  const dataIndex: any[] = orderData?.data.data.user
  const userDataQueries = dataIndex.map((userId) => {
    return useQuery({
      queryKey: ['userData', userId],
      queryFn: () => adminApi.getUser(userId)
    })
  })

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
        // Find user data for the current userId
        const userDataQuery = userDataQueries.find((query) => query.data?.data._id === userId)
        // Return user name or placeholder if user data is not available yet
        return userDataQuery ? userDataQuery.data?.data.name : 'Loading...'
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

  const order: any = orderData?.data.data

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
