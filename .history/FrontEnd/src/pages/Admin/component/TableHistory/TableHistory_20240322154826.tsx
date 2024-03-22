import { Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import adminApi from 'src/apis/admin.api'
import { useQuery } from 'react-query'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Order } from 'src/types/order.type'

function TableHistory() {
  const queryConfig = useQueryConfig()

  // Sử dụng useQuery để lấy dữ liệu đơn hàng
  const { data: orderData } = useQuery({
    queryKey: ['orders', queryConfig],
    queryFn: () => adminApi.getAllOrder()
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const columns: TableProps<Order>['columns'] = [
    {
      title: 'Tên Người Dùng',
      dataIndex: ['user', 'name'],
      key: 'user'
    },
    {
      title: 'Địa chỉ',
      dataIndex: ['shippingAddress', 0, 'city'],
      key: 'shippingAddress.city'
    },
    {
      title: 'Số điện thoại',
      dataIndex: ['shippingAddress', 0, 'phone'],
      key: 'phone'
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (status: number) => {
        let text = ''
        let color = status === 3 ? 'geekblue' : 'green'
        switch (status) {
          case 1:
            text = 'Đang chuẩn bị'
            color = '#e1b86b' // Màu vàng
            break
          case 3:
            text = 'Đã xác nhận'
            color = 'green' // Màu xanh
            break
        }
        return (
          <Tag color={color} key={status}>
            {text}
          </Tag>
        )
      }
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id'
    }
  ]

  // Lấy dữ liệu đơn hàng từ orderData
  const order: any = orderData?.data.data
  console.log(order)
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
