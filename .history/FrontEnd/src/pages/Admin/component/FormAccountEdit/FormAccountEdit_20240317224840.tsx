import React, { useState, useEffect } from 'react'
import { Form, Input, Modal, Select } from 'antd'
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

interface Values {
  email?: string
  name?: string
  phone?: string
  address?: string
  roles?: string[]
}

interface CollectionEditFormProps {
  initialValues: Values
  onFormInstanceReady: (instance: any) => void
}

const CollectionEditForm: React.FC<CollectionEditFormProps> = ({ initialValues, onFormInstanceReady }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(initialValues)
    onFormInstanceReady(form)
  }, [])

  return (
    <Form {...formItemLayout} form={form} className='grid grid-cols-2 grid-flow-row w-full mt-10'>
      <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input email!' }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Tên người dùng' name='name' rules={[{ required: true, message: 'Please input name!' }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Số điện thoại' name='phone' rules={[{ required: true, message: 'Please input phone number!' }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Địa chỉ' name='address' rules={[{ required: true, message: 'Please input address!' }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Roles' name='roles' rules={[{ required: true, message: 'Please select roles!' }]}>
        <Select mode='multiple' style={{ width: '100%' }}>
          <Option value='admin'>Admin</Option>
          <Option value='user'>User</Option>
        </Select>
      </Form.Item>
    </Form>
  )
}

export default CollectionEditForm
