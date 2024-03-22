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
        <table>
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Tổng tiền</th>
              <th>Mã Code</th>
              <th>Phương thức thanh toán</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Image width={150} src={imageUrl} />
              </td>
              <td>{orderDetail.product.name}</td>
              <td>{orderDetail.buy_count}</td>
              <td>{orderDetail.product.price * orderDetail.buy_count}</td>
              <td>{orderDetail.shippingAddress[0].postalCode}</td>
              <td>{orderDetail.shippingAddress[0].paymentMethod}</td>
            </tr>
          </tbody>
        </table>
      )}
    </Modal>
  )
}

export default ModalOrder
