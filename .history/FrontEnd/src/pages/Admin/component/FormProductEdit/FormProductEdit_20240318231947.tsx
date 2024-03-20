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

  const [productData, setUserData] = useState<any>(null)

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

  const handleChange = (value: string) => {
    setUserData((prevUserData: any) => ({
      ...prevUserData,
      roles: [value]
    }))
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      await adminApi.updateUser([userId], { ...values, roles: userData.roles })
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
