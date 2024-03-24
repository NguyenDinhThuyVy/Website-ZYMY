import React, { useState } from 'react'
import { Upload } from 'antd'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useMutation } from 'react-query'
import adminApi from 'src/apis/admin.api'
import { getAvatarUrl } from 'src/utils/utils'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
interface UploadimgsProps {
  onUpload: (data: string[]) => void
}
const Uploadimgs: React.FC<UploadimgsProps> = ({ onUpload }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // }
  ])
  const uploadedDataArray: string[] = []
  const uploadImageMutaion = useMutation(adminApi.uploadImage)
  const onChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    const updatedFileList: UploadFile<string>[] = await Promise.all(
      newFileList.map(async (file) => {
        const formData = new FormData()
        formData.append('image', file.originFileObj || '')
        const uploadRes = await uploadImageMutaion.mutateAsync(formData)
        uploadedDataArray.push(uploadRes.data.data)
        return {
          ...file,
          url: getAvatarUrl(uploadRes.data.data), // Sử dụng URL từ dữ liệu phản hồi
          status: 'done' // Đảm bảo trạng thái của tệp tin đã được cập nhật thành 'done'
        }
      })
    )
    setFileList(updatedFileList)
    onUpload(uploadedDataArray)
  }
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as FileType)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  const customRequest = async ({ file, onSuccess, onError }: any) => {
    const token = localStorage.getItem('profile')
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:4000/admin/products/upload-images', {
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
  // console.log(fileList)
  return (
    <ImgCrop rotationSlider>
      <Upload
        action='http://localhost:4000/admin/products/upload-images'
        listType='picture-card'
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        customRequest={customRequest}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
  )
}

export default Uploadimgs
