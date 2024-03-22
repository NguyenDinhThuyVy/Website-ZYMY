import { Modal, Space, Table, message } from 'antd'
import type { TableProps } from 'antd'
// import { Link } from 'react-router-dom'
import adminApi from 'src/apis/admin.api'
import { useMutation, useQuery } from 'react-query'
import { Product } from 'src/types/product.type'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useEffect, useState } from 'react'
import FormProductEdit from '../FormProductEdit'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { generateNameId } from 'src/utils/utils'
// import { toast } from 'react-toastify'
type OnChange = NonNullable<TableProps<DataType>['onChange']>
type Filters = Parameters<OnChange>[1]

function TableHistory() {
  const queryConfig = useQueryConfig()
  const { data: productsData, refetch } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return adminApi.getAllProducts()
    }
  })

  const columns: TableProps<Product>['columns'] = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 700
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => <Space size='middle'></Space>
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
        dataSource={products}
      />
    </>
  )
}

export default TableHistory
