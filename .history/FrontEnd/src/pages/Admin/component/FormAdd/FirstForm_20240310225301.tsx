import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Modal, ConfigProvider, Select, InputNumber, type FormInstance } from 'antd'
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
interface Values {
  title?: string
  description?: string
  modifier?: string
}

interface CollectionCreateFormProps {
  initialValues: Values
  onFormInstanceReady: (instance: FormInstance<Values>) => void
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({ onFormInstanceReady }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    onFormInstanceReady(form)
  }, [])
  return (
    <Form
      {...formItemLayout}
      variant='filled'
      form={form}
      // className='grid grid-rows-5 grid-flow-col gap-2 w-full '
      // initialValues={initialValues}
    >
      <Form.Item label='Tên sản phẩm' name='name' rules={[{ required: true, message: 'Please input!' }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Giá' name='price' rules={[{ required: true, message: 'Please input!' }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Số lượng' name='quantity' rules={[{ required: true, message: 'Please input!' }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Mô tả sản phẩm' name='description' rules={[{ required: true, message: 'Please input!' }]}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item label='Danh mục' name='category' rules={[{ required: true, message: 'Please input!' }]}>
        <Select />
      </Form.Item>

      <div className='flex gap-10 w-full justify-between'>
        {' '}
        <Form.Item label='Ảnh chính' name='image' rules={[{ required: true, message: 'Please input!' }]}>
          <Uploadmain></Uploadmain>
        </Form.Item>
        <Form.Item label='Ảnh minh họa' name='images' rules={[{ required: true, message: 'Please input!' }]}>
          <Uploadimgs />
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
      onOk={async () => {
        try {
          const values = await formInstance?.validateFields()
          formInstance?.resetFields()
          onCreate(values)
        } catch (error) {
          console.log('Failed:', error)
        }
      }}
    >
      <CollectionCreateForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance)
        }}
      />
    </Modal>
  )
}

const FristForm: React.FC = () => {
  const [formValues, setFormValues] = useState<Values>()
  const [open, setOpen] = useState(false)

  const onCreate = (values: Values) => {
    console.log('Received values of form: ', values)
    setFormValues(values)
    setOpen(false)
  }

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
        <Button type='primary' onClick={() => setOpen(true)} className='w-32 bg-rose-300'>
          Add Product
        </Button>
      </ConfigProvider>

      <pre>{JSON.stringify(formValues, null, 2)}</pre>

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
