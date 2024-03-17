import React, { useState, useEffect } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import { Option } from 'antd/es/mentions'
import adminApi from 'src/apis/admin.api'

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await adminApi.getUserById(userId)
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
    <Modal visible={!!userId} title='Edit User' onCancel={onClose} onOk={handleSave} destroyOnClose>
      <Form {...formItemLayout} form={form}>
        <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input email!' }]}>
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input name!' }]}>
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label='Phone' name='phone' rules={[{ required: true, message: 'Please input phone number!' }]}>
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label='Address' name='address' rules={[{ required: true, message: 'Please input address!' }]}>
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label='Roles' name='roles' rules={[{ required: true, message: 'Please select roles!' }]}>
          <Select mode='multiple' style={{ width: '100%' }}>
            <Option value='admin'>Admin</Option>
            <Option value='user'>User</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormAccountEdit
