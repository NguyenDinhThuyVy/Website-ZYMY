import React from 'react'
import { Modal } from 'antd'

interface Props {
  order: any
  visible: boolean
  onClose: () => void
}

const ModalOrder: React.FC<Props> = ({ order, visible, onClose }) => {
  // Lấy thông tin chi tiết của đơn hàng từ API hoặc từ một nguồn dữ liệu khác
  // const orderDetail = ...;

  return (
    <Modal title={`Chi tiết đơn hàng: `} open={visible} onCancel={onClose} footer={null}>
      <div className='flex'></div>
    </Modal>
  )
}

export default ModalOrder
