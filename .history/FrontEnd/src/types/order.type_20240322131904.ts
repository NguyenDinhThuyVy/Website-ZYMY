export interface Order {
  _id: string
  buy_count: number
  name?: string
  date_of_birth?: string // ISO 8610
  avatar?: string
  address?: string
  phone?: string
  createdAt: string
  updatedAt: string
}
