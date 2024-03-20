import { Modal, Space, Table, Tag, message } from 'antd'
import type { TableProps } from 'antd'
import { Link } from 'react-router-dom'
import adminApi from 'src/apis/admin.api'
import { useMutation, useQuery } from 'react-query'
import { User } from 'src/types/user.type'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useEffect, useState } from 'react'
import FormAccountEdit from '../FormAccountEdit'

function FormAccount() {
  const [editUserId, setEditUserId] = useState<string | null>(null) // State to store the ID of the user being edited
  const [userData, setUserData] = useState<any>(null) // State to store user data
  // Function to handle the "Edit" button click
  const handleEdit = (userId: string) => {
    setEditUserId(userId) // Set the ID of the user being edited
  }
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
  useEffect(() => {
    // Check if userData is not null and userId is not null
    if (editUserId) {
      // Call your API here
      const fetchData = async () => {
        try {
          const userDataResponse = await adminApi.getUser([editUserId])
          setUserData(userDataResponse.data)
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
      fetchData()
    }
  }, [editUserId])

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
  console.log(editUserId)
  if (usersData) {
    const data = usersData
    return (
      <>
        {/* Render the FormAccountEdit component if editUserId is not null */}
        {editUserId !== null && <FormAccountEdit userId={editUserId} onClose={() => setEditUserId(null)} />}

        {/* Render the table */}
        {usersData && (
          <Table
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ['4', '8', '12'],
              defaultPageSize: 4
            }}
            columns={columns}
            dataSource={data.data.data}
          />
        )}
      </>
    )
  }
}

export default FormAccount
