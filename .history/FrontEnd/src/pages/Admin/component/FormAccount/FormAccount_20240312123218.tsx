import React from 'react'
import { Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { Link } from 'react-router-dom'

interface DataType {
  email: string
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const columns: TableProps<DataType>['columns'] = [
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

const data: DataType[] = [
  {
    key: '1',
    email: 'hsjsaj@gmail.com',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['Admin']
  },
  {
    key: '2',
    email: 'hsjsaj@gmail.com',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['User']
  },
  {
    key: '3',
    email: 'hsjsaj@gmail.com',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['User']
  },
  {
    key: '4',
    email: 'hsjsaj@gmail.com',
    name: 'zymy',
    age: 32,
    address: 'danang',
    tags: ['User']
  }
]

const FormAccount: React.FC = () => <Table columns={columns} dataSource={data} />

export default FormAccount
