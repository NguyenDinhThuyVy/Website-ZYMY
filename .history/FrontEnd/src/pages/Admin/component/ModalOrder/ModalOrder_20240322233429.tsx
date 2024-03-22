import React from 'react'
import { Modal } from 'antd'

interface Props {
  orderdata: any
  visible: boolean
  onClose: () => void
}

const ModalOrder: React.FC<Props> = ({ orderdata, visible, onClose }) => {
  // Lấy thông tin chi tiết của đơn hàng từ API hoặc từ một nguồn dữ liệu khác
  // const orderDetail = ...;
  console.log(orderdata)
  return (
    <Modal title={`Chi tiết đơn hàng: `} open={visible} onCancel={onClose} footer={null}>
      <div className='flex gap-5'>
        <div></div>
      </div>
    </Modal>
  )
}

export default ModalOrder
