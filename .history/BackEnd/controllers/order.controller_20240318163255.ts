import { Request, Response } from 'express'
import { STATUS_PURCHASE } from '../constants/purchase'
import { handleImageProduct } from './product.controller'
import { cloneDeep } from 'lodash'
import { PurchaseModel } from '../database/models/purchase.model'
import { ErrorHandler, responseSuccess } from '../utils/response'
import { STATUS } from '../constants/status'

// async function getOrderByIdAccount(req: Request, res: Response): Promise<void> {
//   try {
//     const order = await orderService.getOrderByIdAccount(req.query)
//     res.status(200).json({
//       message: 'get all succeed',
//       data: order,
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: 'failed',
//     })
//   }
// }

// async function getOrderByAcountStatus(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   try {
//     const order = await orderService.getOrderByAcountStatus(req.query)
//     res.status(200).json({
//       message: 'get all succeed',
//       data: order,
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: 'failed',
//     })
//   }
// }

// async function insertOrder(req: Request, res: Response): Promise<void> {
//   try {
//     const order = await orderService.insertOrder(req.body)
//     res.status(200).json({
//       message: 'insert succeed',
//       data: order,
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: 'failed',
//     })
//   }
// }

// async function updateOrder(req: Request, res: Response): Promise<void> {
//   try {
//     const order = await orderService.updateOrder(req.body)
//     res.status(200).json({
//       message: 'update succeed',
//       data: order,
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: 'failed',
//     })
//   }
// }

// async function updatePaymentOrder(req: Request, res: Response): Promise<void> {
//   try {
//     const order = await orderService.updatePaymentOrder(req.body)
//     res.status(200).json({
//       message: 'update succeed',
//       data: order,
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: 'failed',
//     })
//   }
// }

// async function updateAllStatusOrder(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   try {
//     const order = await orderService.updateAllStatusOrder(req.body)
//     res.status(200).json({
//       message: 'update succeed',
//       data: order,
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: 'failed',
//     })
//   }
// }

// async function updateStatusPaymentOrder(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   try {
//     const order = await orderService.updateStatusPaymentOrder(req.body)
//     res.status(200).json({
//       message: 'update succeed',
//       data: order,
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: 'failed',
//     })
//   }
// }

// async function getOrderById(req: Request, res: Response): Promise<void> {
//   try {
//     const order = await orderService.getOrderById(req.params)
//     res.status(200).json({
//       message: 'get order by id succeed',
//       data: order,
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: 'failed',
//     })
//   }
// }

// async function deleteOrder(req: Request, res: Response): Promise<void> {
//   try {
//     const order = await orderService.deleteOrder(req.params)
//     res.status(200).json({
//       message: 'delete succeed',
//       data: order,
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: 'failed',
//     })
//   }
// }

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
