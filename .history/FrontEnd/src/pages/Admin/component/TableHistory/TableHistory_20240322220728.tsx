import { Select, Table, Tag, Option } from 'antd'
import type { TableProps } from 'antd'
import adminApi from 'src/apis/admin.api'
import { useQuery } from 'react-query'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Order } from 'src/types/order.type'
import ModalOrder from '../ModalOrder'
import { useState } from 'react'

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
      render: (status: number, record: any) => {
        const handleStatusChange = (newStatus: number) => {
          // Thực hiện logic cập nhật trạng thái ở đây, ví dụ: gửi request API để cập nhật trạng thái
          console.log(`Changing status of record ${record.key} to ${newStatus}`)
        }

        return (
          <Select defaultValue={status} onChange={handleStatusChange}>
            <Option value={1} style={{ color: '#e1b86b' }}>
              Đang chuẩn bị
            </Option>
            <Option value={3} style={{ color: 'green' }}>
              Đã xác nhận
            </Option>
            <Option value={5} style={{ color: 'red' }}>
              Đã Hủy
            </Option>
          </Select>
        )
      }
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
      render: (_id: string) => (
        <span
          style={{ cursor: 'pointer' }}
          role='button'
          tabIndex={0}
          onClick={() => {
            setModalVisible(true)
            setSelectedOrderId(_id)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setModalVisible(true)
              setSelectedOrderId(_id)
            }
          }}
        >
          {_id}
        </span>
      )
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
      <ModalOrder orderId={selectedOrderId} visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  )
}

export default TableHistory
