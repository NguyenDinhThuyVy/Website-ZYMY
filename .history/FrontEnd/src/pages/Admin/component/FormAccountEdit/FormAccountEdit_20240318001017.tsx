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
      await adminApi.updateUser(userId, values)
      onClose()
    } catch (error) {
      console.error('Error saving user data:', error)
    }
  }
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

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
              { value: 'Admin', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' }
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormAccountEdit
