import React, { useState, useEffect } from 'react'
import { Form, Image, Input, Modal, Select, Upload } from 'antd'
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
  // console.log(categoriesData)
  const image = productData?.data.image

  // console.log(image)
  return (
    <Modal
      visible
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
              listType='picture-card'
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
              onChange={(info) => {
                if (info.file.status === 'done' && info.fileList.length > 1) {
                  // Find the index of the last uploaded file
                  const lastIndex = info.fileList.findIndex((file) => file.uid === info.file.uid)
                  // Remove all files except the last uploaded one
                  const newFileList = info.fileList.slice(lastIndex)
                  // Update the form value with the URL of the last uploaded file
                  form.setFieldsValue({ image: newFileList[newFileList.length - 1].url })
                }
              }}
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
