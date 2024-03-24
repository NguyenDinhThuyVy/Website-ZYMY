import React, { useState, useEffect } from 'react'
import { Form, Input, Modal, Select, Upload } from 'antd'

import adminApi from 'src/apis/admin.api'
import { toast } from 'react-toastify'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useMutation, useQuery } from 'react-query'

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
  }, [productId]) // Thêm form vào dependencies

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
  // const uploadImagesMutaion = useMutation(adminApi.uploadImages)

  const image = productData?.data.image

  const handleUploadChange = async (info: any) => {
    const formData = new FormData()
    formData.append('image', info.file.originFileObj || '')
    const uploadRes = await uploadImageMutaion.mutateAsync(formData)
    // console.log('hihi')
    form.setFieldsValue({
      image: uploadRes.data.data // Sử dụng đường dẫn của ảnh từ dữ liệu phản hồi
    })
    setProductData((prevProductData) => ({
      ...prevProductData,
      data: {
        ...prevProductData.data,
        image: getAvatarUrl(uploadRes.data.data)
      }
    }))
  }

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    const token = localStorage.getItem('profile')
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:4000/admin/products/upload-image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const responseData = await response.json()
      onSuccess(responseData, file)
    } catch (error) {
      onError(error)
    }
  }
  // console.log(productData)

  const images = productData?.data.images
  // console.log(productData?.data.images)
  const convertUrlsToFileList = (urls: string[]): { uid: string; name: string; url: string }[] => {
    const uniqueUrls = Array.from(
      new Set(
        urls.map((url) => {
          const match = url.match(/(http:\/\/localhost:4000\/images\/)([^/]+)$/)
          return match ? match[1] + match[2] : url
        })
      )
    )

    return uniqueUrls.map((url, index) => ({
      uid: `-${index}`,
      name: url.substring(url.lastIndexOf('/') + 1), // Extract file name from URL
      url
    }))
  }
  // console.log(productData?.data.images)
  let initialFileList: { uid: string; name: string; url: string }[] = []
  if (productData && productData.data && Array.isArray(productData.data.images)) {
    initialFileList = convertUrlsToFileList(productData.data.images)
  } else {
    // Handle the case where productData or productData.data or productData.data.images is null or undefined
    // For example:
    console.error('productData or productData.data or productData.data.images is null or undefined.')
  }
  // console.log(productData)

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
              action='http://localhost:4000/admin/products/upload-image'
              customRequest={customRequest} // Sử dụng customRequest để tải ảnh lên
              listType='picture-card'
              maxCount={1}
              fileList={image ? [{ uid: '-1', name: 'image.png', url: image }] : []}
              onRemove={() => {
                // Xóa ảnh khỏi fileList khi người dùng nhấn nút xóa
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
            <Upload
              // action='http://localhost:4000/admin/products/upload-images'
              fileList={images ? initialFileList : []}
              listType='picture-card'
            ></Upload>
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
