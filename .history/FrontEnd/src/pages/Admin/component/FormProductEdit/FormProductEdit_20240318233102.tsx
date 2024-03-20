import React, { useState, useEffect } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import Uploadmain from '../Uploadmain'
import Uploadimgs from '../Upload'
import adminApi from 'src/apis/admin.api'
import { toast } from 'react-toastify'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useQuery } from 'react-query'

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

  const [productData, setProductData] = useState<any>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const productDataResponse = await adminApi.getProduct([productId]) // Thay đổi thành getUserById
        setProductData(productDataResponse.data)
        form.setFieldsValue(productDataResponse.data.data) // Thiết lập giá trị mặc định cho các trường
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    if (productId) {
      fetchUserData()
    }
  }, [productId, form]) // Thêm form vào dependencies

  const handleChange = () => {
    setProductData((prevUserData: any) => ({
      ...prevUserData
    }))
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      await adminApi.updateUser([productId], values)
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

  const queryConfig = useQueryConfig()
  const { data: categoriesData } = useQuery({
    queryKey: ['categories', queryConfig],
    queryFn: () => {
      return adminApi.getcategories()
    }
  })
  console.log(categoriesData)
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
      <Form {...formItemLayout} form={form} initialValues={productData}>
        <Form.Item label='Tên sản phẩm' name='name'>
          <Input />
        </Form.Item>

        <Form.Item label='Giá' name='price'>
          <Input />
        </Form.Item>

        <Form.Item label='Số lượng' name='quantity'>
          <Input />
        </Form.Item>

        <Form.Item label='Mô tả sản phẩm' name='description'>
          <Input.TextArea />
        </Form.Item>
        {/*
        <Form.Item label='Danh mục' name='category' rules={[{ required: true, message: 'Please select a category!' }]}>
          <Select style={{ width: 120 }}>
            {categories.map((category, index) => (
              <Select.Option key={index} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item> */}

        <Form.Item label='Ảnh chính' name='image'>
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
