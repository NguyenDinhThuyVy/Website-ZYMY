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
    <Modal title={`Chi tiết đơn hàng: `} open={visible} onCancel={onClose} footer={null} width={1300}>
      {orderDetail && (
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Ảnh</th>
              <th className='px-4 py-2'>Tên sản phẩm</th>
              <th className='px-4 py-2'>Số lượng</th>
              <th className='px-4 py-2'>Tổng tiền</th>
              <th className='px-4 py-2'>Mã Code</th>
              <th className='px-4 py-2'>Phương thức thanh toán</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='px-4 py-2'>
                <Image width={150} src={imageUrl} />
              </td>
              <td className='px-4 py-2'>{orderDetail.product.name}</td>
              <td className='px-4 py-2'>{orderDetail.buy_count}</td>
              <td className='px-5 py-2'>{orderDetail.product.price * orderDetail.buy_count}</td>
              <td className='px-4 py-2'>{orderDetail.shippingAddress[0].postalCode}</td>
              <td className='px-4 py-2'>{orderDetail.shippingAddress[0].paymentMethod}</td>
            </tr>
          </tbody>
        </table>
      )}
    </Modal>
  )
}

export default ModalOrder
