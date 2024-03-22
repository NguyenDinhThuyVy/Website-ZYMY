// address.controller.ts
import { Request, Response } from 'express'
import { STATUS } from '../constants/status'
import { PurchaseModel } from '../database/models/purchase.model'
import { ErrorHandler, responseSuccess } from '../utils/response'

const addShippingAddress = async (req: Request, res: Response) => {
  const purchaseId = req.params.id as string
  const { street, city, postalCode, phone, paymentMethod } = req.body

  try {
    const purchase: any = await PurchaseModel.findById(purchaseId)
    if (!purchase) {
      throw new ErrorHandler(STATUS.NOT_FOUND, 'Purchase not found')
    }

    const newAddress = {
      street,
      city,
      postalCode,
      phone,
      paymentMethod,
    }
    purchase.shippingAddress.push(newAddress)

    await purchase.save()

    return responseSuccess(res, {
      message: 'Đã thêm địa chỉ giao hàng mới thành công',
      data: purchase,
    })
  } catch (error) {
    console.error('Error adding shipping addresses:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const addressController = { addShippingAddress }

export default addressController
