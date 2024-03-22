import { Request, Response } from 'express'
import { STATUS_PURCHASE } from '../constants/purchase'
import { handleImageProduct } from './product.controller'
import { cloneDeep } from 'lodash'
import { PurchaseModel } from '../database/models/purchase.model'
import { ErrorHandler, responseSuccess } from '../utils/response'
import { STATUS } from '../constants/status'

const getAllOrders = async (req: Request, res: Response) => {
  const { status = STATUS_PURCHASE.ALL } = req.query
  let condition: any = {
    status: {
      $ne: STATUS_PURCHASE.ALL,
    },
  }
  if (Number(status) !== STATUS_PURCHASE.ALL) {
    condition.status = status
  }

  let orders: any = await PurchaseModel.find(condition)
    .populate({
      path: 'product',
      populate: {
        path: 'category',
      },
    })
    .sort({
      createdAt: -1,
    })
    .lean()
  // orders = orders.map((order) => {
  //   order.product = handleImageProduct(cloneDeep(order.product))
  //   return order
  // })
  const response = {
    message: 'Lấy đơn mua thành công',
    data: orders,
  }
  return responseSuccess(res, response)
}

const updateOrderConfirm = async (req: Request, res: Response) => {
  const form: Order = req.body
  let { status } = form

  // Đảm bảo rằng trạng thái được chuyển đến hợp lệ
  if (status !== 1 && status !== 2) {
    return res.status(400).json({ message: 'Trạng thái không hợp lệ' })
  }

  // Chuyển đổi giá trị status thành giá trị tương ứng
  status = status === 1 ? STATUS_PURCHASE.IN_PROGRESS : STATUS_PURCHASE.CANCEL

  try {
    const orderDB = await PurchaseModel.findByIdAndUpdate(
      req.params.order_id,
      { status },
      { new: true }
    ).lean()

    if (!orderDB) {
      throw new ErrorHandler(STATUS.BAD_REQUEST, 'Không tìm thấy đơn hàng')
    }

    const response = {
      message: 'Cập nhật đơn hàng thành công',
      data: orderDB,
    }
    return responseSuccess(res, response)
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error)
    return res
      .status(500)
      .json({ message: 'Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng' })
  }
}

const orderController = {
  getAllOrders,
  updateOrderConfirm,
}
export default orderController
