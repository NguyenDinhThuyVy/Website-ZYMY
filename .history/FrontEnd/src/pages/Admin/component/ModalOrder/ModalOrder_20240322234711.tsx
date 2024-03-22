import React from 'react'
import { Image, Modal } from 'antd'
import { getAvatarUrl } from 'src/utils/utils'

interface Props {
  orderId: any
  orderdata: any
  visible: boolean
  onClose: () => void
}

const ModalOrder: React.FC<Props> = ({ orderdata, visible, onClose, orderId }) => {
  const orderDetail = orderdata.find((order: any) => order._id === orderId)
  const imageUrl = 'http://localhost:4000/images/' + orderDetail.product.image
  return (
    <Modal title={`Chi tiết đơn hàng: `} open={visible} onCancel={onClose} footer={null}>
      {orderDetail && (
        <div className='flex gap-5'>
          <div>
            <Image width={200} src={imageUrl} />
          </div>
          {/* Các thông tin khác */}
        </div>
      )}
    </Modal>
  )
}

export default ModalOrder
