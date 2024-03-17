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
      className='grid grid-cols-2 grid-flow-row w-full mt-10'
      // initialValues={initialValues}
    >
      <Form.Item label='Email' name='email'>
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Tên người dùng' name='name'>
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Số điện thoại' name='phone'>
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Địa chỉ' name='address'>
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Roles' name='roles'>
        <Select />
      </Form.Item>
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
      width={1000}
      open={open}
      title='Chỉnh sửa thông tin người dùng'
      okText='Create'
      cancelText='Cancel'
      okButtonProps={{
        autoFocus: true,
        style: {
          backgroundColor: '#c74f4f',
          // Add hover effect using CSS pseudo-class
          ':hover': {
            backgroundColor: '#993c3c' // Adjust hover color as desired
          }
        }
      }}
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

const FormAccountEdit: React.FC = () => {
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

export default FormAccountEdit
