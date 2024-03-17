import { Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { Link } from 'react-router-dom'
import adminApi from 'src/apis/admin.api'
import { useQuery } from 'react-query'
import { User } from 'src/types/user.type'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { AxiosResponse } from 'axios'
import { SuccessResponse } from 'src/types/utils.type'
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
  const axiosResponse: AxiosResponse<SuccessResponse<User[]>, any> = yourAxiosResponse
  const { data: usersData } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => {
      return adminApi.getAllUser()
    }
  })
  if (axiosResponse && axiosResponse.data && Array.isArray(axiosResponse.data.data)) {
    // Extract the array of users from axiosResponse.data
    const usersData: User[] = axiosResponse.data.data

    // Now you can use usersData as needed
    console.log(usersData)
  } else {
    // Handle the case where data is missing or not in the expected format
    console.error('Error: Invalid data format in Axios response.')
  }
  if (usersData) {
    const data: User[] = usersData
    return <Table columns={columns} dataSource={data} />
  }
}

export default FormAccount
