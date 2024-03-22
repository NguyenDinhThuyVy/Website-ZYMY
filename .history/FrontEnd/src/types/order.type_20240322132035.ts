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
export interface Product {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  description: string
  category: {
    _id: string
    name: string
  }
  image: string
  createdAt: string
  updatedAt: string
}
