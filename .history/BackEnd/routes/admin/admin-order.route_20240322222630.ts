import { Router } from 'express'
import orderController from '../../controllers/order.controller'
import authMiddleware from '../../middleware/auth.middleware'
import helpersMiddleware from '../../middleware/helpers.middleware'
import { wrapAsync } from '../../utils/response'

const adminOrderRouter = Router()

// adminOrderRouter.get(
//   '/:id',
//   authMiddleware.middleWare,
//   orderController.getOrderById
// )

// adminOrderRouter.put(
//   '/update',
//   authMiddleware.middleWare,
//   orderController.updateOrder
// )

// adminOrderRouter.put(
//   '/update-status',
//   authMiddleware.middleWare,
//   orderController.updateAllStatusOrder
// )

// adminOrderRouter.put(
//   '/update-payment',
//   authMiddleware.middleWare,
//   orderController.updatePaymentOrder
// )

// adminOrderRouter.put(
//   '/update-status-payment',
//   authMiddleware.middleWare,
//   orderController.updateStatusPaymentOrder
// )

// adminOrderRouter.delete('/:id', orderController.deleteOrder)

// adminOrderRouter.post(
//   '/insert',
//   authMiddleware.middleWare,
//   orderController.insertOrder
// )
adminOrderRouter.get(
  '',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  wrapAsync(orderController.getAllOrders)
)
adminOrderRouter.put(
  '/:order_id/confirm',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('order_id'),
  // helpersMiddleware.idValidator,
  wrapAsync(orderController.updateOrderConfirm)
)
adminOrderRouter.put(
  '/:order_id/cancel',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('order_id'),
  // helpersMiddleware.idValidator,
  wrapAsync(orderController.updateOrderCancel)
)
export default adminOrderRouter
