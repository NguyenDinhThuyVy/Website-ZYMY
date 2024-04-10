import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Modal, ConfigProvider, Select, InputNumber, type FormInstance } from 'antd'
import Uploadmain from '../Uploadmain'
import Uploadimgs from '../Upload'
import adminApi from 'src/apis/admin.api'
import { useQuery } from 'react-query'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Product } from 'src/types/product.type'

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
  title?: string
  description?: string
  modifier?: string
}

interface CollectionCreateFormProps {
  initialValues: Values
  onFormInstanceReady: (instance: FormInstance<Values>) => void
  onImageDataReceived: (data: any) => void
  onCreated: () => void // Thêm prop onCreated vào interface
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({ onFormInstanceReady }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    onFormInstanceReady(form)
  }, [])
  const queryConfig = useQueryConfig()
  const { data: categoriesData } = useQuery({
    queryKey: ['categories', queryConfig],
    queryFn: () => {
      return adminApi.getcategories()
    }
  })
  const handleMainImageUpload = (imageUrl: string) => {
    form.setFieldsValue({ image: imageUrl })
  }
  const handleIllustrationImageUpload = (imageUrl: string | string[]) => {
    form.setFieldsValue({ images: imageUrl })
  }

  return (
    <Form
      {...formItemLayout}
      variant='filled'
      form={form}
      className='grid grid-cols-2 grid-flow-row  w-full '
      // initialValues={initialValues}
    >
      <Form.Item label='Tên sản phẩm' name='name' rules={[{ required: true, message: 'Please input!' }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Giá Hiện Tại' name='price' rules={[{ required: true, message: 'Please input!' }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Giá Cũ' name='price_before_discount' rules={[{ required: true, message: 'Please input!' }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Số lượng' name='quantity' rules={[{ required: true, message: 'Please input!' }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Mô tả sản phẩm' name='description' rules={[{ required: true, message: 'Please input!' }]}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item label='Danh mục' name={['category']}>
        <Select style={{ width: 340 }}>
          {categoriesData?.data.data.map((category) => (
            <Select.Option key={category._id} value={category._id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <div className=''>
        <Form.Item label='Ảnh chính' name='image' rules={[{ required: true, message: 'Please input!' }]}>
          <Uploadmain onUpload={handleMainImageUpload} />
        </Form.Item>
        <Form.Item label='Ảnh minh họa' name='images' rules={[{ required: true, message: 'Please input!' }]}>
          <Uploadimgs onUpload={handleIllustrationImageUpload} />
        </Form.Item>
      </div>
    </Form>
  )
}

interface CollectionCreateFormModalProps {
  open: boolean
  onCreate: (values: Values) => void
  onCancel: () => void
  initialValues: Values
}

const CollectionCreateFormModal: React.FC<CollectionCreateFormModalProps> = ({
  open,
  onCreate,
  onCancel,
  initialValues
}) => {
  const [formInstance, setFormInstance] = useState<FormInstance>()
  const handleCreate = async () => {
    try {
      const values = await (formInstance?.validateFields() as Promise<Product>)
      console.log('Form values:', values) // In ra giá trị của form trước khi gọi API

      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'images' && Array.isArray(value)) {
          // Loại bỏ địa chỉ cơ sở từ mỗi URL và thêm vào formData một cách riêng biệt
          value.forEach((url) => {
            const imageUrlWithoutBaseURL = url.replace(/^http:\/\/localhost:4000\/images\//, '')
            formData.append(key, imageUrlWithoutBaseURL)
          })
        } else {
          formData.append(key, value)
        }
      })
      await adminApi.createProduct(formData)
      formInstance?.resetFields()
      onCreate(values)
    } catch (error) {
      console.log('Failed:', error)
    }
  }
  return (
    <Modal
      width={1300}
      open={open}
      title=' Tạo Sản Phẩm Mới'
      okText='Create'
      cancelText='Cancel'
      okButtonProps={{ autoFocus: true }}
      onCancel={onCancel}
      destroyOnClose
      onOk={handleCreate}
    >
      <CollectionCreateForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance)
        }}
        onImageDataReceived={() => {}}
        onCreated={() => {}}
      />
    </Modal>
  )
}

const FristForm: React.FC<CollectionCreateFormProps> = ({ onCreated }) => {
  const [formValues, setFormValues] = useState<Values>()
  const [open, setOpen] = useState(false)

  const onCreate = (values: Values) => {
    // console.log('Received values of form: ', values)
    setFormValues(values)
    setOpen(false)
    onCreated()
  }
  console.log(formValues)

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: '#f08c8c',
              algorithm: true
            }
          }
        }}
      >
        <Button type='primary' onClick={() => setOpen(true)} className='w-32 bg-[#1CA7EC]'>
          Add Product
        </Button>
      </ConfigProvider>
      <CollectionCreateFormModal
        open={open}
        onCreate={onCreate}
        onCancel={() => setOpen(false)}
        initialValues={{ modifier: 'public' }}
      />
    </>
  )
}

export default FristForm
