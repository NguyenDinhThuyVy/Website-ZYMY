import React, { useState, useEffect } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import adminApi from 'src/apis/admin.api'
import { toast } from 'react-toastify'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
}

interface CollectionEditFormProps {
  userId: string
  onClose: () => void
  onUpdateSuccess: () => void
}

const FormAccountEdit: React.FC<CollectionEditFormProps> = ({ userId, onClose, onUpdateSuccess }) => {
  const [form] = Form.useForm()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await adminApi.getUser([userId]) // Thay đổi thành getUserById
        setUserData(userDataResponse.data)
        form.setFieldsValue(userDataResponse.data.data) // Thiết lập giá trị mặc định cho các trường
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    if (userId) {
      fetchUserData()
    }
  }, [userId, form]) // Thêm form vào dependencies

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      await adminApi.updateUser([userId], values)
      toast.success('Chỉnh sửa người dùng thành công', {
        position: toast.POSITION.TOP_RIGHT, // Vị trí hiển thị thông báo
        autoClose: 1200 // Thời gian tự động đóng thông báo sau 2000 mili giây (2 giây)
      })
      onUpdateSuccess() // Notify update success
      onClose()
    } catch (error) {
      toast.error('Chỉnh sủa người dùng thất bại', {
        position: toast.POSITION.TOP_RIGHT, // Vị trí hiển thị thông báo
        autoClose: 1200 // Thời gian tự động đóng thông báo sau 2000 mili giây (2 giây)
      })
    }
  }
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }
  // const queryConfig = useQueryConfig()
  // const { data: usersData } = useQuery({
  //   queryKey: ['users', queryConfig],
  //   queryFn: () => {
  //     return adminApi.getAllUser()
  //   }
  // })
  return (
    <Modal visible={!!userId} title='Edit User' onCancel={onClose} onOk={handleSave} destroyOnClose>
      <Form {...formItemLayout} form={form} initialValues={userData}>
        <Form.Item label='Email' name='email'>
          <Input style={{ width: '100%' }} disabled />
        </Form.Item>

        <Form.Item label='Name' name='name'>
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label='Phone' name='phone'>
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label='Address' name='address'>
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label='Roles' name={['roles']}>
          <Select
            style={{ width: 120 }}
            mode='multiple' // Cho phép chọn nhiều giá trị
            onChange={handleChange}
          >
            <Select.Option key='Admin' value='Admin'>
              Admin
            </Select.Option>
            <Select.Option key='User' value='User'>
              User
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormAccountEdit
