import { Select, Table, Tag } from 'antd'
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
  const { data: orderData, reftch } = useQuery({
    queryKey: ['orders', queryConfig],
    queryFn: () => adminApi.getAllOrder()
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [canSelect, setCanSelect] = useState(true)
  const columns: TableProps<Order>['columns'] = [
    {
      title: 'Tên Người Dùng',
      dataIndex: ['userInfo', 'email'],
      key: 'userInfo.email'
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
        const handleStatusChange = async (newStatus: number) => {
          if (status === 3 || status === 5) {
            return
          }

          try {
            if (newStatus === 3) {
              // Gọi API confirmaccept
              await adminApi.confirmaccept([record._id])
              reftch()
            } else if (newStatus === 5) {
              // Gọi API confirmcancel
              await adminApi.confirmcancel([record._id])
              reftch()
              console.log(`Order ${record.key} đã bị hủy.`)
            }
          } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error)
          }
        }
        return (
          <Select
            defaultValue={status}
            onChange={handleStatusChange}
            style={{ color: status === 3 ? 'green' : status === 5 ? 'red' : '#e1b86b' }}
          >
            <option value={1} style={{ color: '#e1b86b' }}>
              Đang chuẩn bị
            </option>
            <option value={3} style={{ color: 'green' }}>
              Đã xác nhận
            </option>
            <option value={5} style={{ color: 'red' }}>
              Đã Hủy
            </option>
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
