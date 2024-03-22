import React from 'react'
import { Image, Modal } from 'antd'
import { getAvatarUrl } from 'src/utils/utils'
import { Order } from 'src/types/order.type'

interface Props {
  orderId: any
  orderdata: any
  visible: boolean
  onClose: () => void
}

const ModalOrder: React.FC<Props> = ({ orderdata, visible, onClose, orderId }) => {
  const orderDetail = orderdata.find((order: Order) => order._id === orderId)
  const imageUrl = 'http://localhost:4000/images/' + orderDetail.product.image
  return (
    <Modal title={`Chi tiết đơn hàng: `} open={visible} onCancel={onClose} footer={null} width={1100}>
      {orderDetail && (
        <table className='table-auto w-full mt-5'>
          <thead>
            <tr>
              <th className='px-4 py-2 text-center'>Ảnh</th>
              <th className='px-4 py-2 text-center'>Tên sản phẩm</th>
              <th className='px-4 py-2 text-center'>Số lượng</th>
              <th className='px-4 py-2 text-center'>Tổng tiền</th>
              <th className='px-4 py-2 text-center'>Mã Code</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='px-4 py-2 text-center'>
                <Image width={120} src={imageUrl} style={{ borderRadius: '5px' }} />
              </td>
              <td className='px-4 py-2 '>{orderDetail.product.name}</td>
              <td className='px-4 py-2 text-center'>{orderDetail.buy_count}</td>
              <td className='px-4 py-2 text-center'>
                {' '}
                {`${(orderDetail.product.price * orderDetail.buy_count).toLocaleString()} VND`}
              </td>
              <td className='px-4 py-2 text-center'>{orderDetail.shippingAddress[0].postalCode}</td>
            </tr>
          </tbody>
        </table>
      )}
    </Modal>
  )
}

export default ModalOrder
