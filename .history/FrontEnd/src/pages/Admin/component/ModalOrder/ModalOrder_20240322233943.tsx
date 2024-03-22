import React from 'react'
import { Modal } from 'antd'

interface Props {
  orderId: any
  orderdata: any
  visible: boolean
  onClose: () => void
}

const ModalOrder: React.FC<Props> = ({ orderdata, visible, onClose, orderId }) => {
  const orderDetail = orderdata.find((order: any) => order.id === orderId)

  return (
    <Modal title={`Chi tiết đơn hàng: `} open={visible} onCancel={onClose} footer={null}>
      {orderDetail && (
        <div className='flex gap-5'>
          <div>{orderDetail.image}</div>
          {/* Các thông tin khác */}
        </div>
      )}
    </Modal>
  )
}

export default ModalOrder
