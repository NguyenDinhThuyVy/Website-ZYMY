export interface Order {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: number
  avatar?: string
  address?: string
  phone?: string
  createdAt: string
  updatedAt: string
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
