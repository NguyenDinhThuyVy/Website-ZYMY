import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Modal, Radio, ConfigProvider,type FormInstance } from 'antd'

interface Values {
  title?: string
  description?: string
  modifier?: string
}

interface CollectionCreateFormProps {
  initialValues: Values
  onFormInstanceReady: (instance: FormInstance<Values>) => void
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({ initialValues, onFormInstanceReady }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    onFormInstanceReady(form)
  }, [])
  return (
    <Form layout='vertical' form={form} name='form_in_modal' initialValues={initialValues}>
      <Form.Item
        name='title'
        label='Title'
        rules={[{ required: true, message: 'Please input the title of collection!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name='description' label='Description'>
        <Input type='textarea' />
      </Form.Item>
      <Form.Item name='modifier' className='collection-create-form_last-form-item'>
        <Radio.Group>
          <Radio value='public'>Public</Radio>
          <Radio value='private'>Private</Radio>
        </Radio.Group>
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
      open={open}
      title='Create a new collection'
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

  <ConfigProvider
  theme={{
    components: {
      Button: {
        colorPrimary: '#00b96b',
        algorithm: true, // Enable algorithm
      },
      Input: {
        colorPrimary: '#eb2f96',
        algorithm: true, // Enable algorithm
      }
    },
  }}
>

  return (
    <>
      <Button type='primary' onClick={() => setOpen(true)} className='bg-red-200  w-32'>
        New Collection
      </Button>
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
