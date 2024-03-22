import { Request, Response } from 'express'

import { handleImageProduct } from './product.controller'
import { cloneDeep } from 'lodash'
import { PurchaseModel } from '../database/models/purchase.model'

import { STATUS_PURCHASE } from '../../constants/purchase'
import { STATUS } from '../../constants/status'
import { ErrorHandler, responseSuccess } from '../../utils/response'

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
  orders = orders.map((order) => {
    order.product = handleImageProduct(cloneDeep(order.product))
    return order
  })
  const response = {
    message: 'Lấy đơn mua thành công',
    data: orders,
  }
  return responseSuccess(res, response)
}

const updateOrderConfirm = async (req: Request, res: Response) => {
  const form: Order = req.body
  const { status } = form

  const orderDB = await PurchaseModel.findByIdAndUpdate(
    req.params.order_id,
    {
      status: STATUS_PURCHASE.IN_PROGRESS, // Cập nhật trạng thái đơn hàng thành STATUS_PURCHASE.IN_PROGRESS
    },
    { new: true }
  ).lean()

  if (orderDB) {
    const response = {
      message: 'Cập nhật đơn hàng thành công',
      data: orderDB,
    }
    return responseSuccess(res, response)
  } else {
    throw new ErrorHandler(STATUS.BAD_REQUEST, 'Không tìm thấy đơn hàng')
  }
}

const orderController = {
  getAllOrders,
  updateOrderConfirm,
}
export default orderController
