import { Router } from 'express'
import addressController from '../../controllers/address.controller'
import authMiddleware from '../../middleware/auth.middleware'
import helpersMiddleware from '../../middleware/helpers.middleware'
// import purchaseMiddleware from '../../middleware/purchase.middleware'
import { wrapAsync } from '../../utils/response'

export const userAddressRouter = Router()

userAddressRouter.post(
  '/:id',
  helpersMiddleware.entityValidator,
  // purchaseMiddleware.identifyPurchase,
  authMiddleware.verifyAccessToken,
  wrapAsync(addressController.addShippingAddress)
)
