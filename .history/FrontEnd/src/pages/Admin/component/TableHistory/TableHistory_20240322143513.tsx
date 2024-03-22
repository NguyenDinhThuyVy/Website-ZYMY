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

  const columns: TableProps<Order>['columns'] = [
    {
      title: 'Tên Người Dùng',
      dataIndex: ['user', 'name'],
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
      title: 'Số điện thoại',
      dataIndex: ['shippingAddress', 'phone'],
      key: 'shippingAddress.phone'
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      width: 5,
      render: (status: number) => {
        let text = '';
        let color = '';
        if (status === 1) {
          text = 'Đang chuẩn bị';
          color = '#ee9b00'; // Màu vàng
        } else if (status === 3) {
          text = 'Đã xác nhận';
          color = 'green'; // Màu xanh
        }
        return <span style={{ color }}>{text}</span>;
      }
    }
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id'
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
