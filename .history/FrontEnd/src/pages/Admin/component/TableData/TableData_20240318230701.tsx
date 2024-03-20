import { Modal, Space, Table, message } from 'antd'
import type { TableProps } from 'antd'
// import { Link } from 'react-router-dom'
import adminApi from 'src/apis/admin.api'
import { useMutation, useQuery } from 'react-query'
import { Product } from 'src/types/product.type'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useState } from 'react'
// import { toast } from 'react-toastify'

function TableData() {
  const [editProductId, setEditProductId] = useState<string | null>(null) // State to store the ID of the user being edited
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false)
  const [ProductData, setProductData] = useState<any>(null)
  const handleEdit = (productId: string) => {
    setEditProductId(productId) // Set the ID of the user being edited
  }
  const columns: TableProps<Product>['columns'] = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity'
    },

    {
      title: 'Danh mục',
      dataIndex: ['category', 'name'],
      key: 'category.name'
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <button
            onClick={() => handleDelete(record._id)}
            className='bg-none text-black transition-colors hover:text-rose-400'
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M7 21q-.825 0-1.413-.588T5 19V6q-.425 0-.713-.288T4 5q0-.425.288-.713T5 4h4q0-.425.288-.713T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z'
              />
            </svg>
          </button>
          <button
            type='button'
            onClick={() => handleEdit(record._id)}
            className='bg-none text-black transition-colors hover:text-rose-400'
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6V19ZM19.3 8.925l-4.25-4.2L17.875 1.9L22.1 6.125l-2.8 2.8ZM3 21v-4.25l10.6-10.6l4.25 4.25L7.25 21H3ZM14.325 9.675l-.7-.7l1.4 1.4l-.7-.7Z'
              />
            </svg>
          </button>
        </Space>
      )
    }
  ]

  const queryConfig = useQueryConfig()
  const { data: productsData, refetch } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return adminApi.getAllProducts()
    }
  })
  const fetchData = async () => {
    try {
      const userData = await adminApi.getAllUser()
      setUserData(userData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    if (shouldRefetch) {
      fetchData()
      setShouldRefetch(false) // Đặt shouldRefetch lại sau khi fetchData đã được gọi
    }
  }, [shouldRefetch])
  const deleteProductMutation = useMutation({
    mutationFn: adminApi.deleteProduct,
    onSuccess: () => {
      refetch()
    }
  })

  const handleDelete = (productId: string) => {
    Modal.confirm({
      title: 'Xác nhận xoá',
      content: 'Bạn có chắc chắn muốn xoá sản phẩm này không?',
      okText: 'Xoá',
      cancelText: 'Hủy',
      async onOk() {
        try {
          await deleteProductMutation.mutate([productId])
          message.success('Xoá sản phẩm  thành công')
          refetch() // Refetch data after successful deletion
        } catch (error) {
          message.error('Xoá người dùng thất bại: ')
        }
      },

      okButtonProps: {
        style: {
          backgroundColor: '#b94545'
        }
      }
    })
  }

  if (productsData) {
    const { data }: any = productsData
    const products: Product[] = data.data.products

    return (
      <Table
        pagination={{
          showSizeChanger: true, // Hiển thị tùy chọn lựa chọn pageSize
          pageSizeOptions: ['6', '8', '12'], // Các tùy chọn pageSize
          defaultPageSize: 6 // Kích thước mặc định của pageSize
        }}
        columns={columns}
        dataSource={products}
      />
    )
  }
}

export default TableData
