import { Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { Link } from 'react-router-dom'
import adminApi from 'src/apis/admin.api'
import { useMutation, useQuery } from 'react-query'
import { User } from 'src/types/user.type'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { toast } from 'react-toastify'

function FormAccount() {
  const columns: TableProps<User>['columns'] = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <Link to='/'>{text}</Link>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Link to='/'>{text}</Link>
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },

    {
      title: 'Roles',
      key: 'roles',
      dataIndex: 'roles',
      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            let color = role.length > 5 ? 'geekblue' : 'green'
            if (role === 'User') {
              color = 'red'
            }
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
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
        </Space>
      )
    }
  ]

  const queryConfig = useQueryConfig()
  const { data: usersData, refetch } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => {
      return adminApi.getAllUser()
    }
  })
  const deleteUserMutation = useMutation({
    mutationFn: adminApi.deleteUser,
    onSuccess: () => {
      refetch()
    }
  })
  const handleDelete = (userId: string) => {
    deleteUserMutation.mutate([userId])
    toast.success('Xoá người dùng thành công')
  }
  if (usersData) {
    const data = usersData
    return (
      <Table
        pagination={{
          showSizeChanger: true, // Hiển thị tùy chọn lựa chọn pageSize
          pageSizeOptions: ['4', '8', '12'], // Các tùy chọn pageSize
          defaultPageSize: 4 // Kích thước mặc định của pageSize
        }}
        columns={columns}
        dataSource={data.data.data}
      />
    )
  }
}

export default FormAccount
