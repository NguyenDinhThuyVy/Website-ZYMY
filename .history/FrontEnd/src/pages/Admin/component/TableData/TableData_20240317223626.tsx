import { Space, Table } from 'antd'
import type { TableProps } from 'antd'
// import { Link } from 'react-router-dom'
import adminApi from 'src/apis/admin.api'
import { useQuery } from 'react-query'
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
            // onClick={() => handleDelete(record._id)}
            className='bg-none text-black transition-colors hover:text-rose-400'
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M7 21q-.825 0-1.413-.588T5 19V6q-.425 0-.713-.288T4 5q0-.425.288-.713T5 4h4q0-.425.288-.713T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z'
              />
            </svg>
          </button>
        </Space>
      )
    }
  ]

  const queryConfig = useQueryConfig()
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return adminApi.getAllProducts()
    }
  })
  // const deleteUserMutation = useMutation({
  //   mutationFn: adminApi.deleteUser,
  //   onSuccess: () => {
  //     refetch()
  //   }
  // })

  // const handleDelete = (userId: string) => {
  //   deleteUserMutation.mutate([userId])
  //   toast.success('Xoá người dùng thành công')
  // }
  // const handleEdit = (userId: string) => {
  //   updateUserMutation.mutate([userId])
  //   toast.success('Chỉnh người dùng thành công')
  // }
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
