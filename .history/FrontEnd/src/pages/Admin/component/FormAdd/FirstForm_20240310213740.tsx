import React, { useState, useEffect } from 'react'
import {
  Button,
  Form,
  Input,
  Modal,
  type FormInstance,
  ConfigProvider,
  DatePicker,
  TreeSelect,
  Cascader,
  Select,
  Mentions,
  InputNumber
} from 'antd'
const { RangePicker } = DatePicker

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
      style={{ minWidth: 1000 }}
      className='grid grid-rows-4 grid-flow-col gap-4'
    >
      <Form.Item label='Input' name='Input' rules={[{ required: true, message: 'Please input!' }]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='InputNumber' name='InputNumber' rules={[{ required: true, message: 'Please input!' }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='TextArea' name='TextArea' rules={[{ required: true, message: 'Please input!' }]}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item label='Mentions' name='Mentions' rules={[{ required: true, message: 'Please input!' }]}>
        <Mentions />
      </Form.Item>

      <Form.Item label='Select' name='Select' rules={[{ required: true, message: 'Please input!' }]}>
        <Select />
      </Form.Item>

      <Form.Item label='Cascader' name='Cascader' rules={[{ required: true, message: 'Please input!' }]}>
        <Cascader />
      </Form.Item>

      <Form.Item label='TreeSelect' name='TreeSelect' rules={[{ required: true, message: 'Please input!' }]}>
        <TreeSelect />
      </Form.Item>

      <Form.Item label='DatePicker' name='DatePicker' rules={[{ required: true, message: 'Please input!' }]}>
        <DatePicker />
      </Form.Item>

      <Form.Item label='RangePicker' name='RangePicker' rules={[{ required: true, message: 'Please input!' }]}>
        <RangePicker />
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
    <div className='w-full bg-slate-50'>
      <Modal
        style={{ width: '1000px', background: 'red' }}
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
    </div>
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
