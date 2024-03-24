import React, { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import { useMutation } from 'react-query'
import { getAvatarUrl } from 'src/utils/utils'
import adminApi from 'src/apis/admin.api'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const Uploadmain: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const uploadImageMutaion = useMutation(adminApi.uploadImage)
  const onChange: UploadProps['onChange'] =async (info: any) => {
console.log(info)
        const formData = new FormData()
        formData.append('image', info.file.originFileObj || '')
        const uploadRes = await uploadImageMutaion.mutateAsync(formData)
        return {
          ...file,
          url: getAvatarUrl(uploadRes.data.data), // Sử dụng URL từ dữ liệu phản hồi
          status: 'done' // Đảm bảo trạng thái của tệp tin đã được cập nhật thành 'done'
        }

        return file
      }


    const uploadButton = (
      <button style={{ border: 0, background: 'none' }} type='button'>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
    )
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
    console.log(imageUrl)
    return (
      <>
        <Upload
          name='avatar'
          listType='picture-card'
          className='avatar-uploader'
          showUploadList={false}
          action='http://localhost:4000/admin/products/upload-image'
          customRequest={customRequest}
          beforeUpload={beforeUpload}
          onChange={onChange}
        >
          {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </>
    )
  }
}
export default Uploadmain
