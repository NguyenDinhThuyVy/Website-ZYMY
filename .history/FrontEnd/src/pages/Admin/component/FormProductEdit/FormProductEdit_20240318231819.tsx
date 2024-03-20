import React, { useState, useEffect } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import Uploadmain from '../Uploadmain'
import Uploadimgs from '../Upload'

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

interface CollectionCreateFormProps {
  productId: string
  onClose: () => void
  onUpdateSuccess: () => void
}

const FormProductEdit: React.FC<CollectionCreateFormProps> = ({ productId, onClose, onUpdateSuccess }) => {
  const [form] = Form.useForm()

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      // Logic to save or update product with values
      onCreateSuccess() // Notify create/update success
      onClose() // Close modal
    } catch (error) {
      console.error('Save failed:', error)
    }
  }

  return (
    <Modal
      visible
      title='Edit Product'
      onCancel={onClose}
      onOk={handleSave}
      destroyOnClose
      okText='Save'
      cancelText='Cancel'
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item label='Tên sản phẩm' name='name' rules={[{ required: true, message: 'Please input!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Giá' name='price' rules={[{ required: true, message: 'Please input!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Số lượng' name='quantity' rules={[{ required: true, message: 'Please input!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Mô tả sản phẩm' name='description' rules={[{ required: true, message: 'Please input!' }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label='Danh mục' name='category' rules={[{ required: true, message: 'Please input!' }]}>
          <Select />
        </Form.Item>

        <Form.Item label='Ảnh chính' name='image' rules={[{ required: true, message: 'Please input!' }]}>
          <Uploadmain />
        </Form.Item>

        <Form.Item label='Ảnh minh họa' name='images' rules={[{ required: true, message: 'Please input!' }]}>
          <Uploadimgs />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormProductEdit
