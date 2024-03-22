import { Select, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import adminApi from 'src/apis/admin.api'
import { useQuery } from 'react-query'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Order } from 'src/types/order.type'
import ModalOrder from '../ModalOrder'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function TableHistory() {
  const queryConfig = useQueryConfig()

  // Sử dụng useQuery để lấy dữ liệu đơn hàng
  const { data: orderData, refetch } = useQuery({
    queryKey: ['orders', queryConfig],
    queryFn: () => adminApi.getAllOrder()
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [statuses, setStatuses] = useState<number[]>([]) // Mảng các trạng thái
  const columns: TableProps<Order>['columns'] = [
    {
      title: 'Người Dùng',
      dataIndex: ['userInfo', 'name'],
      key: 'userInfo.name'
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
              toast.success('Cập nhật trạng thái đơn hàng thành công !')
              refetch()
            } else if (newStatus === 5) {
              // Gọi API confirmcancel
              await adminApi.confirmcancel([record._id])
              toast.success('Cập nhật trạng thái đơn hàng thành công !', autoClose :1000)
              refetch()

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
            disabled={status === 3 || status === 5}
            className={status === 3 ? 'green' : status === 5 ? 'red' : '#e1b86b'}
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
  const fetchData = async () => {
    try {
      const orderData = await adminApi.getAllUser()
      setStatuses(orderData?.data.data.map((order: Order) => order.status) || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchData() // Gọi fetchData khi component mount lần đầu
  }, [])

  useEffect(() => {
    fetchData() // Gọi lại fetchData khi có thay đổi trong biến statuses
  }, [statuses])
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
      <ModalOrder
        orderId={selectedOrderId}
        visible={modalVisible}
        orderdata={order}
        onClose={() => setModalVisible(false)}
      />
    </>
  )
}

export default TableHistory
