import { Product } from './product.type'
import { User } from './user.type'

export interface Order {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: number
  user: User[]
  product: Product[]
}
