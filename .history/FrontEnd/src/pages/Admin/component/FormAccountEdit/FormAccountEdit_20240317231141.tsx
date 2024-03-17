import React, { useState, useEffect } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import adminApi from 'src/apis/admin.api'
import { Option } from 'antd/es/mentions'

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

interface User {
  email: string
  name: string
  phone: string
  address: string
  roles: string[]
}

interface CollectionEditFormProps {
  userId: string
  onClose: () => void
}

const FormAccountEdit: React.FC<CollectionEditFormProps> = ({ userId, onClose }) => {
  const [form] = Form.useForm()
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await adminApi.getUser([userId])
        setUserData(userDataResponse.data)
        form.setFieldsValue(userDataResponse.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    if (userId) {
      fetchUserData()
    }
  }, [userId])

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      await adminApi.updateUser(userId, values)
      onClose()
    } catch (error) {
      console.error('Error saving user data:', error)
    }
  }

  return (
    <Modal visible={userId !== undefined} title='Edit User' onCancel={onClose} onOk={handleSave}>
      <Form {...formItemLayout} form={form}>
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
          <Select mode='multiple' style={{ width: '100%' }}>
            <Option>Admin</Option>
            <Option>User</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormAccountEdit
