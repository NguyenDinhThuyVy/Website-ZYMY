import mongoose, { Schema } from 'mongoose'
import { STATUS_PURCHASE } from '../../constants/purchase'

const PurchaseSchema = new Schema(
  {
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'users' },
    product: { type: mongoose.SchemaTypes.ObjectId, ref: 'products' },
    buy_count: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    price_before_discount: { type: Number, default: 0 },
    status: { type: Number, default: STATUS_PURCHASE.WAIT_FOR_CONFIRMATION },
    shippingAddress: [
      {
        street: { type: String },
        city: { type: String },
        postalCode: { type: String },
        phone: { type: String },
        paymentMethod: { type: String, enum: ['cash', 'online'] },
      },
    ],
  },
  {
    timestamps: true,
  }
)
declare global {
  namespace Express {
    interface Request {
      purchase?: string
    }
  }
}
export const PurchaseModel = mongoose.model('purchases', PurchaseSchema)
