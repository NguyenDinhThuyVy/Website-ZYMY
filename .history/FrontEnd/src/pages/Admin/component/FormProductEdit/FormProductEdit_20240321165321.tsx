import React, { useState, useEffect } from 'react'
import { Form, Image, Input, Modal, Select, Upload, message } from 'antd'
import Uploadmain from '../Uploadmain'
import Uploadimgs from '../Upload'
import adminApi from 'src/apis/admin.api'
import { toast } from 'react-toastify'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useMutation, useQuery } from 'react-query'
import { UserSchema } from 'src/utils/rules'
import { getAvatarUrl } from 'src/utils/utils'

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
type FormData = Pick<UserSchema, 'avatar'>
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

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      await adminApi.updateProduct([productId], values)
      toast.success('Chỉnh sửa sản phẩm thành công', {
        position: toast.POSITION.TOP_RIGHT, // Vị trí hiển thị thông báo
        autoClose: 1200 // Thời gian tự động đóng thông báo sau 2000 mili giây (2 giây)
      })
      onUpdateSuccess() // Notify update success
      onClose()
    } catch (error) {
      toast.error('Chỉnh sửa sản phẩm  thất bại', {
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
  const uploadImageMutaion = useMutation(adminApi.uploadImage)
  // console.log(categoriesData)
  const image = productData?.data.image
  const handleUploadChange = async (info: any) => {
    const { status } = info.file
    if (status === 'done') {
      const formData = new FormData()
      formData.append('image', info.file.originFileObj || '')
      try {
        const uploadRes = await uploadImageMutaion.mutateAsync(formData)
        form.setFieldsValue(uploadRes.data.data)
        getAvatarUrl(image)
        console.log(getAvatarUrl(image))
      } catch (error) {
        handleUploadError(error)
      }
    }
  }

  const handleUploadError = (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      // Clear token from local storage and redirect user to login page
      localStorage.removeItem('accessToken')
      // Redirect user to login page or perform other actions
      message.error('Token expired. Please login again.')
      // Example of redirecting user to login page
      window.location.href = '/login'
    } else {
      // Other error handling
      console.error('Error uploading image:', error)
      message.error('An error occurred while uploading image.')
    }
  }
  // const token = localStorage.getItem('profile')
  const customRequest = async ({ file, onSuccess, onError }) => {
    const token = localStorage.getItem('profile') // Lấy token từ local storage
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:4000/admin/products/upload-image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}` // Thêm token vào header Authorization
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      onSuccess() // Gọi hàm onSuccess khi upload thành công
    } catch (error) {
      onError(error) // Gọi hàm onError nếu có lỗi
    }
  }

  // console.log(token)
  return (
    <Modal
      open
      width={1200}
      title='Edit Product'
      onCancel={onClose}
      onOk={handleSave}
      destroyOnClose
      okText='Save'
      cancelText='Cancel'
    >
      <Form {...formItemLayout} form={form} initialValues={productData}>
        <div className='grid grid-cols-2 grid-flow-row  w-full'>
          <Form.Item label='Tên sản phẩm' name='name'>
            <Input />
          </Form.Item>
          <Form.Item label='Giá hiện tại' name='price'>
            <Input />
          </Form.Item>
        </div>
        <div className='grid grid-cols-2 grid-flow-row  w-full'>
          <Form.Item label='Số lượng' name='quantity'>
            <Input />
          </Form.Item>
          <Form.Item label='Danh mục' name={['category', 'name']}>
            <Select style={{ width: 340 }}>
              {categoriesData?.data.data.map((category) => (
                <Select.Option key={category._id} value={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className='grid grid-cols-2 grid-flow-row  w-full'>
          <Form.Item label='Ảnh chính' name='image' initialValue={image}>
            <Upload
              action={customRequest}
              listType='picture-card'
              maxCount={1}
              fileList={image ? [{ uid: '-1', name: 'image.png', url: image }] : []}
              onRemove={() => {
                // Set image to null when the remove button is clicked
                setProductData((prevProductData) => ({
                  ...prevProductData,
                  data: {
                    ...prevProductData.data,
                    image: null
                  }
                }))
              }}
              onChange={handleUploadChange}
            >
              {image ? null : <div>Upload</div>}
            </Upload>
          </Form.Item>

          <Form.Item label='Ảnh minh họa' name='images'>
            <Uploadimgs />
          </Form.Item>
        </div>

        <Form.Item label='Mô tả sản phẩm' name='description'>
          <Input.TextArea style={{ width: '1000' }} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormProductEdit
