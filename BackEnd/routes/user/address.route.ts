import { Router } from 'express'
import addressController from '../../controllers/address.controller'
import authMiddleware from '../../middleware/auth.middleware'
import helpersMiddleware from '../../middleware/helpers.middleware'
import { wrapAsync } from '../../utils/response'

export const userAddressRouter = Router()

userAddressRouter.post(
  '/:id',
  helpersMiddleware.entityValidator,
  authMiddleware.verifyAccessToken,
  wrapAsync(addressController.addShippingAddress)
)
