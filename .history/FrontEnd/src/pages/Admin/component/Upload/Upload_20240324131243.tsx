import React, { useState } from 'react'
import { Upload } from 'antd'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const Uploadimgs: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // }
  ])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
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
  return (
    <ImgCrop rotationSlider>
      <Upload
        action='http://localhost:4000/admin/products/upload-images'
        listType='picture-card'
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
  )
}

export default Uploadimgs
