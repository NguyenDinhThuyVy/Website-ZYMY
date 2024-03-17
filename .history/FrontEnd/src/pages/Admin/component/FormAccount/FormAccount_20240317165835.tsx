import React from 'react'
import { Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { Link } from 'react-router-dom'
import adminApi from 'src/apis/admin.api'
import { useQuery } from 'react-query'
import { User } from 'src/types/user.type'

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
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Roles',
    key: 'roles',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'User') {
            color = 'red'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
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
  const { data: usersData } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      return adminApi.getAllUser()
    }
  })
  console.log(usersData)
  // const data: User[] = usersData || []
  // return <Table columns={columns} dataSource={data} />
}

export default FormAccount
