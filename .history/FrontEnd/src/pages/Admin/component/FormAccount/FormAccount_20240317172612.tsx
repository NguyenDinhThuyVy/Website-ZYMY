import { Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { Link } from 'react-router-dom'
import adminApi from 'src/apis/admin.api'
import { useQuery } from 'react-query'
import { User } from 'src/types/user.type'
import useQueryConfig from 'src/hooks/useQueryConfig'
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
    render: (_, record) => (
      <Space size='middle'>
        <Link to='/'>Edit</Link>
        <Link to='/'>Delete</Link>
      </Space>
    )
  }
]

function FormAccount() {
  const queryConfig = useQueryConfig()
  const { data: usersData } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => {
      return adminApi.getAllUser()
    }
  })
  if (usersData) {
    const data = usersData
    return (
      <Table
        pagination={{
          showSizeChanger: true, // Hiển thị tùy chọn lựa chọn pageSize
          // pageSizeOptions: ['4', '8', '12'], // Các tùy chọn pageSize
          defaultPageSize: 4 // Kích thước mặc định của pageSize
        }}
        columns={columns}
        dataSource={data.data.data}
      />
    )
  }
}

export default FormAccount
