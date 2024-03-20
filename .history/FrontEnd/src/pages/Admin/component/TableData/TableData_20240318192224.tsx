import { Modal, Space, Table, message } from 'antd'
import type { TableProps } from 'antd'
// import { Link } from 'react-router-dom'
import adminApi from 'src/apis/admin.api'
import { useMutation, useQuery } from 'react-query'
import { ProductList } from 'src/types/product.type'
import useQueryConfig from 'src/hooks/useQueryConfig'
// import { toast } from 'react-toastify'

function TableData() {
  const columns: TableProps<ProductList>['columns'] = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name'
      // render: (text) => <Link to='/'>{text}</Link>
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      key: 'price'
      // render: (text) => <Link to='/'>{text}</Link>
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
      render: () => (
        <Space size='middle'>
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
  const deleteUserMutation = useMutation({
    mutationFn: adminApi.deleteUser,
    onSuccess: () => {
      refetch()
    }
  })

  const handleDelete = (userId: string) => {
    Modal.confirm({
      title: 'Xác nhận xoá',
      content: 'Bạn có chắc chắn muốn xoá người dùng này?',
      okText: 'Xoá',
      cancelText: 'Hủy',
      async onOk() {
        try {
          await deleteUserMutation.mutate([userId])
          message.success('Xoá người dùng thành công')
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
    const products: ProductList[] = data.data.products
    console.log(data)
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
