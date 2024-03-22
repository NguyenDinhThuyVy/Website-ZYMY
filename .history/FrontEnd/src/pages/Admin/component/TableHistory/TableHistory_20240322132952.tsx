import { Space, Table } from 'antd'
import type { TableProps } from 'antd'
// import { Link } from 'react-router-dom'
import adminApi from 'src/apis/admin.api'
import { useQuery } from 'react-query'
import { Product } from 'src/types/product.type'
import useQueryConfig from 'src/hooks/useQueryConfig'

// import { toast } from 'react-toastify'

function TableHistory() {
  const queryConfig = useQueryConfig()
  const { data: orderData, refetch } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return adminApi.getAllOrder()
    }
  })
  // const { data: userData } = useQuery({
  //   queryKey: ['products', queryConfig],
  //   queryFn: () => {
  //     return adminApi.getUser()
  //   }
  // })
  const columns: TableProps<Product>['columns'] = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
      width: 700
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
      key: 'shippingAddress.city',
      sorter: (a, b) => a.quantity - b.quantity
    },
    {
      title: 'Địa chỉ',
      dataIndex: ['shippingAddress', 'phone'],
      key: 'shippingAddress.phone',
      sorter: (a, b) => a.quantity - b.quantity
    },
    {
      title: 'Status',
      key: 'action',
      width: 5,
      render: (text, record) => (
        let state
        let css
        if (record.status === 1) {
          state = 'Prepare'
          css = 'bg-[#ee9b00]'
        } else if (record.status === 2) {
          state = 'Shipping'
          css = 'bg-orange-500'
        } else if (record.status === 3) {
          state = 'Successful'
          css = 'bg-green-500'
        } else if (record.status === 4) {
          state = 'Fail'
          css = 'bg-red-500'
        }
      }
    }
  ]

  return (
    <>
      <Table
        pagination={{
          showSizeChanger: true, // Hiển thị tùy chọn lựa chọn pageSize
          pageSizeOptions: ['6', '8', '12'], // Các tùy chọn pageSize
          defaultPageSize: 6 // Kích thước mặc định của pageSize
        }}
        columns={columns}
        // dataSource={products}
      />
    </>
  )
}

export default TableHistory
