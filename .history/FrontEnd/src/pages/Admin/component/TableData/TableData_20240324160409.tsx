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

function TableData() {
  const [editProductId, setEditProductId] = useState<string | null>(null) // State to store the ID of the user being edited
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false)
  const [ProductData, setProductData] = useState<any>(null)
  const [filteredInfo] = useState<Filters>({})

  const handleEdit = (productId: string) => {
    setEditProductId(productId) // Set the ID of the user being edited
  }
  const categoryName = filteredInfo?.category?.name

  const queryConfig = useQueryConfig()
  const { data: productsData, refetch } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return adminApi.getAllProducts()
    }
  })
  const { data: categoriesData } = useQuery({
    queryKey: ['categories', queryConfig],
    queryFn: () => {
      return adminApi.getcategories()
    }
  })
  const filters =
    categoriesData?.data.data.map(function (category) {
      return { text: category.name, value: category.name }
    }) || []
  const fetchData = async () => {
    try {
      const productData = await adminApi.getAllProducts()
      setProductData(productData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    if (shouldRefetch) {
      fetchData()
      setShouldRefetch(false) // Đặt shouldRefetch lại sau khi fetchData đã được gọi
    }
  }, [shouldRefetch, productsData])

  const handleUpdateSuccess = () => {
    setShouldRefetch(true) // Trigger fetchData khi cập nhật thành công
  }
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
          refetch() // Refetch data after successful deletion
          message.success('Xoá sản phẩm  thành công')
          refetch() // Refetch data after successful deletion
        } catch (error) {
          message.error('Xoá sản phẩm thất bại: ')
        }
      },

      okButtonProps: {
        style: {
          backgroundColor: '#b94545'
        }
      }
    })
  }
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
      title: 'Danh mục',
      dataIndex: ['category', 'name'],
      key: 'category.name',
      filters: filters,
      filteredValue: categoryName,
      onFilter: (value: string | number | any, record: Product) => {
        const stringValue = typeof value === 'string' ? value : String(value)
        return record['category']['name'].includes(stringValue)
      },
      ellipsis: true
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
          <Link to={`${path.home}${generateNameId({ name: record.name, id: record._id })}`}>
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 48 48'>
              <g fill='none'>
                <path
                  d='M29 24.048a5 5 0 1 1-1.748-3.798a1.5 1.5 0 1 0 .547.547A4.98 4.98 0 0 1 29 24.046z'
                  fill='currentColor'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M44 24.048s-11-12-19.947-12c-8.948 0-20.053 12-20.053 12s11.105 12 20.053 12c8.947 0 19.947-12 19.947-12zM7.255 23.62c-.158.15-.306.292-.444.427a59.368 59.368 0 0 0 5.08 4.416a43.151 43.151 0 0 0 3.518 2.455A10.954 10.954 0 0 1 13 24.048c0-2.6.902-4.988 2.41-6.87a43.176 43.176 0 0 0-3.518 2.454a59.368 59.368 0 0 0-4.637 3.989zm28.9 4.846a42.227 42.227 0 0 1-3.64 2.546A10.955 10.955 0 0 0 35 24.048c0-2.643-.932-5.068-2.485-6.965a42.227 42.227 0 0 1 3.64 2.545a58.582 58.582 0 0 1 5.047 4.42l-.446.433a58.582 58.582 0 0 1-4.6 3.986zM24 33.047a9 9 0 1 0 0-18a9 9 0 0 0 0 18z'
                  fill='currentColor'
                />
              </g>
            </svg>
          </Link>
        </Space>
      )
    }
  ]

  if (ProductData) {
    const { data }: any = ProductData
    const products: Product[] = data.data.products

    return (
      <>
        {' '}
        {editProductId !== null && (
          <FormProductEdit
            productId={editProductId}
            onClose={() => setEditProductId(null)}
            onUpdateSuccess={handleUpdateSuccess}
          />
        )}
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
  } else if (productsData) {
    const { data }: any = productsData
    const products: Product[] = data.data.products

    return (
      <>
        {' '}
        {editProductId !== null && (
          <FormProductEdit
            productId={editProductId}
            onClose={() => setEditProductId(null)}
            onUpdateSuccess={handleUpdateSuccess}
          />
        )}
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
}

export default TableData
