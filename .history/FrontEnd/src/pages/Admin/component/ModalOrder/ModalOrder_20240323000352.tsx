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
            <th className='px-4 py-2 text-center'>Ảnh</th>
            <th className='px-4 py-2 text-center'>Tên sản phẩm</th>
            <th className='px-4 py-2 text-center'>Số lượng</th>
            <th className='px-4 py-2 text-center'>Tổng tiền</th>
            <th className='px-4 py-2 text-center'>Mã Code</th>
            <th className='px-4 py-2 text-center'>Phương thức thanh toán</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='px-4 py-2 text-center'>
              <Image width={150} src={imageUrl} />
            </td>
            <td className='px-4 py-2 text-center'>{orderDetail.product.name}</td>
            <td className='px-4 py-2 text-center'>{orderDetail.buy_count}</td>
            <td className='px-4 py-2 text-center'>{orderDetail.product.price * orderDetail.buy_count}</td>
            <td className='px-4 py-2 text-center'>{orderDetail.shippingAddress[0].postalCode}</td>
            <td className='px-4 py-2 text-center'>{orderDetail.shippingAddress[0].paymentMethod}</td>
          </tr>
        </tbody>
      </table>
    </Modal>
  )
}

export default ModalOrder
