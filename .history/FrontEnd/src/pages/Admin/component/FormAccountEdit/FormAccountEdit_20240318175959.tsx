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
}

const FormAccountEdit: React.FC<CollectionEditFormProps> = ({ userId, onClose }) => {
  const [form] = Form.useForm()
  const [userData, setUserData] = useState<any>(null)

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      await adminApi.updateUser([userId], values)
      toast.success('Chỉnh sửa người dùng thành công')
      onClose()
    } catch (error) {
      toast.error('Chỉnh sửa người dùng thất bại')
    }
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await adminApi.getUser([userId])
        setUserData(userDataResponse.data)
        form.setFieldsValue(userDataResponse.data.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    if (userId) {
      fetchUserData()
    }
  }, [userId, form])

  useEffect(() => {
    // Gọi lại API khi userData thay đổi
    const updateUserIfChanged = async () => {
      if (userData) {
        try {
          await adminApi.updateUser([userId], userData) // Thay đổi userData thành values nếu cần
          toast.success('Thông tin người dùng đã được cập nhật')
        } catch (error) {
          console.error('Error updating user:', error)
        }
      }
    }

    updateUserIfChanged()
  }, [userData, userId])

  return (
    <Modal visible={!!userId} title='Edit User' onCancel={onClose} onOk={handleSave} destroyOnClose>
      <Form {...formItemLayout} form={form} initialValues={userData}>
        <Form.Item label='Email' name='email'>
          <Input style={{ width: '100%' }} />
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

        <Form.Item label='Roles' name='roles'>
          <Select
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'Admin', label: 'Admin' },
              { value: 'User', label: 'User' }
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormAccountEdit
