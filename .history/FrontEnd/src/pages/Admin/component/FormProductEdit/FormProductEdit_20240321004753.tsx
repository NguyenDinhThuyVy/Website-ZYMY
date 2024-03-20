import React, { useState, useEffect } from 'react'
import { Form, Input, Modal, Select, Upload } from 'antd'
import Uploadimgs from '../Upload'
import adminApi from 'src/apis/admin.api'
import { toast } from 'react-toastify'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useQuery } from 'react-query'
import { PlusOutlined } from '@ant-design/icons'

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
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productDataResponse = await adminApi.getProduct([productId])
        setProductData(productDataResponse.data)
        form.setFieldsValue(productDataResponse.data.data)
      } catch (error) {
        console.error('Error fetching product data:', error)
      }
    }

    if (productId) {
      fetchProductData()
    }
  }, [productId, form])

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      await adminApi.updateProduct([productId], values)
      toast.success('Chỉnh sửa sản phẩm thành công')
      onUpdateSuccess()
      onClose()
    } catch (error) {
      toast.error('Chỉnh sửa sản phẩm thất bại')
    }
  }

  const queryConfig = useQueryConfig()
  const { data: categoriesData } = useQuery({
    queryKey: ['categories', queryConfig],
    queryFn: () => {
      return adminApi.getcategories()
    }
  })

  const handleRemoveImage = () => {
    // Xử lý sự kiện khi người dùng xóa ảnh
    setImageUrl(undefined)
  }

  const handleChange = (info: any) => {
    if (info.file.status === 'done') {
      // Xử lý khi người dùng tải ảnh lên thành công
      setImageUrl(info.file.response.url)
      message.success(`${info.file.name} file uploaded successfully`)
    }
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  return (
    <Modal
      open
      width={1200}
      title='Chỉnh sửa sản phẩm'
      onCancel={onClose}
      onOk={handleSave}
      destroyOnClose
      okText='Lưu'
      cancelText='Hủy'
    >
      <Form {...formItemLayout} form={form} initialValues={productData}>
        <div className='grid grid-cols-2 grid-flow-row w-full'>
          <Form.Item label='Tên sản phẩm' name='name'>
            <Input />
          </Form.Item>
          <Form.Item label='Giá hiện tại' name='price'>
            <Input />
          </Form.Item>
        </div>
        <div className='grid grid-cols-2 grid-flow-row w-full'>
          <Form.Item label='Số lượng' name='quantity'>
            <Input />
          </Form.Item>
          <Form.Item label='Danh mục' name={['category', 'name']}>
            <Select style={{ width: 340 }}>
              {categoriesData?.data.data.map((category: any) => (
                <Select.Option key={category._id} value={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className='grid grid-cols-2 grid-flow-row w-full'>
          <Form.Item label='Ảnh chính' name='image'>
            <Upload
              action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
              listType='picture-card'
              maxCount={1}
              fileList={imageUrl ? [{ uid: '-1', name: 'image.png', url: imageUrl }] : []}
              onRemove={handleRemoveImage}
              onChange={handleChange}
            >
              {imageUrl ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label='Ảnh minh họa' name='images'>
            <Uploadimgs />
          </Form.Item>
        </div>
        <Form.Item label='Mô tả sản phẩm' name='description'>
          <Input.TextArea style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormProductEdit
